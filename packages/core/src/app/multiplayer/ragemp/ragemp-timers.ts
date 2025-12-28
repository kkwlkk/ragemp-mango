import type { MultiplayerTimer, MultiplayerTimers } from '../../interfaces';
import { RageMPTimer } from './ragemp-timer';

export class RageMPTimers implements MultiplayerTimers {
    private timerIncrementer: number = 0;
    private timers = new Map<number, MultiplayerTimer>();
    private everyTickHandlers = new Map<number, { callback: Function; bound: Function }>();
    private isEveryTickRunning = false;
    private everyTickMainHandler: (() => void) | null = null;

    public get all(): MultiplayerTimer[] {
        return [...this.timers.values()];
    }

    public get warningThreshold(): number {
        // RageMP doesn't have this feature
        return 0;
    }

    public set warningThreshold(_value: number) {
        // RageMP doesn't have this feature
    }

    public get sourceLocationFrameSkipCount(): number {
        // RageMP doesn't have this feature
        return 0;
    }

    public set sourceLocationFrameSkipCount(_value: number) {
        // RageMP doesn't have this feature
    }

    getByID(id: number): MultiplayerTimer | null {
        const timer = this.timers.get(id);
        return timer ?? null;
    }

    private createTimer(
        createTimer: (...args: any[]) => number,
        clear: (id: number) => void,
        callback: Function,
        interval: number | undefined,
        once: boolean,
        ...args: unknown[]
    ) {
        const callbackBind = callback.bind(this, ...(Array.isArray(args) ? args : []));
        const timerId = typeof interval === 'number' ? createTimer(callbackBind, interval) : createTimer(callbackBind);
        const id = this.timerIncrementer++;

        const rageMPTimer = new RageMPTimer(id, interval ?? 0, once, callbackBind, () => {
            clear(timerId);
            this.timers.delete(id);
        });
        this.timers.set(id, rageMPTimer);
        return rageMPTimer;
    }

    setInterval(callback: Function, time: number, ...args: unknown[]) {
        return this.createTimer(
            (cb: Function, interval: number) => setInterval(cb as () => void, interval) as unknown as number,
            (id: number) => clearInterval(id),
            callback,
            time,
            false,
            ...args
        );
    }

    setTimeout(callback: Function, time: number, ...args: unknown[]) {
        const id = this.timerIncrementer++;
        const callbackBind = callback.bind(this, ...(Array.isArray(args) ? args : []));

        const timerId = setTimeout(() => {
            callbackBind();
            this.timers.delete(id);
        }, time) as unknown as number;

        const rageMPTimer = new RageMPTimer(id, time, true, callbackBind, () => {
            clearTimeout(timerId);
            this.timers.delete(id);
        });
        this.timers.set(id, rageMPTimer);
        return rageMPTimer;
    }

    everyTick(callback: Function, ...args: unknown[]) {
        const id = this.timerIncrementer++;
        const callbackBind = callback.bind(this, ...(Array.isArray(args) ? args : []));

        this.everyTickHandlers.set(id, { callback, bound: callbackBind });

        // Check if we're on client-side (render event exists) or server-side
        const isClientSide = typeof mp !== 'undefined' && typeof (mp as any).browsers !== 'undefined';

        // Start the tick loop if not already running
        if (!this.isEveryTickRunning) {
            this.isEveryTickRunning = true;

            if (isClientSide) {
                // Client-side: use render event for frame-accurate ticking
                this.everyTickMainHandler = () => {
                    for (const [, handler] of this.everyTickHandlers) {
                        try {
                            handler.bound();
                        } catch (e) {
                            mp.console.logError(`Error in everyTick handler: ${e}`);
                        }
                    }
                };
                mp.events.add('render', this.everyTickMainHandler);
            } else {
                // Server-side: use setInterval with minimal delay as approximation
                const intervalHandler = () => {
                    for (const [, handler] of this.everyTickHandlers) {
                        try {
                            handler.bound();
                        } catch (e) {
                            mp.console.logError(`Error in everyTick handler: ${e}`);
                        }
                    }
                };
                (this as any)._everyTickInterval = setInterval(intervalHandler, 0);
            }
        }

        const rageMPTimer = new RageMPTimer(id, 0, false, callbackBind, () => {
            this.everyTickHandlers.delete(id);
            this.timers.delete(id);

            // Stop the tick loop if no more handlers
            if (this.everyTickHandlers.size === 0) {
                if (isClientSide && this.everyTickMainHandler) {
                    mp.events.remove('render', this.everyTickMainHandler);
                    this.everyTickMainHandler = null;
                } else if ((this as any)._everyTickInterval) {
                    clearInterval((this as any)._everyTickInterval);
                    (this as any)._everyTickInterval = null;
                }
                this.isEveryTickRunning = false;
            }
        });
        this.timers.set(id, rageMPTimer);
        return rageMPTimer;
    }

    nextTick(callback: Function, ...args: unknown[]) {
        const id = this.timerIncrementer++;
        const callbackBind = callback.bind(this, ...(Array.isArray(args) ? args : []));

        // Check if we're on client-side (render event exists) or server-side
        const isClientSide = typeof mp !== 'undefined' && typeof (mp as any).browsers !== 'undefined';

        let timerId: any;

        if (isClientSide) {
            // Client-side: use render event for next frame
            const handler = () => {
                try {
                    callbackBind();
                } finally {
                    mp.events.remove('render', handler);
                    this.timers.delete(id);
                }
            };
            mp.events.add('render', handler);

            const rageMPTimer = new RageMPTimer(id, 0, true, callbackBind, () => {
                mp.events.remove('render', handler);
                this.timers.delete(id);
            });
            this.timers.set(id, rageMPTimer);
            return rageMPTimer;
        } else {
            // Server-side: use setImmediate or setTimeout(0) for next tick
            timerId = setTimeout(() => {
                try {
                    callbackBind();
                } finally {
                    this.timers.delete(id);
                }
            }, 0);

            const rageMPTimer = new RageMPTimer(id, 0, true, callbackBind, () => {
                clearTimeout(timerId);
                this.timers.delete(id);
            });
            this.timers.set(id, rageMPTimer);
            return rageMPTimer;
        }
    }

    time(_name?: string) {
        // RageMP doesn't have console.time equivalent
        // Could implement custom timing if needed
    }

    timeEnd(_name?: string) {
        // RageMP doesn't have console.timeEnd equivalent
    }
}
