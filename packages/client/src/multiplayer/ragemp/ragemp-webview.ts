import type { MultiplayerWebView } from '../../interfaces/multiplayer';

export class RageMPWebView implements MultiplayerWebView {
    private eventListeners: Map<string, Set<(...args: unknown[]) => void>> = new Map();

    constructor(private $raw: BrowserMp) {}

    public get valid(): boolean {
        // RageMP browsers don't have a 'valid' property, check if it exists
        return this.$raw !== null && this.$raw !== undefined;
    }

    public destroy(): void {
        this.$raw.destroy();
    }

    public get url(): string {
        return this.$raw.url;
    }

    public set url(value: string) {
        this.$raw.url = value;
    }

    public get visible(): boolean {
        return this.$raw.active;
    }

    public set visible(value: boolean) {
        this.$raw.active = value;
    }

    emit(eventName: string, ...args: unknown[]): void {
        // In RageMP, use browser.call() to send events to CEF
        this.$raw.call(eventName, ...args);
    }

    emitRaw(eventName: string, ...args: unknown[]): void {
        this.$raw.call(eventName, ...args);
    }

    reload(ignoreCache: boolean): void {
        this.$raw.reload(ignoreCache);
    }

    on(eventName: string, listener: (...args: unknown[]) => void): void {
        // In RageMP, we need to listen through mp.events for browser events
        // We'll create a wrapper that filters by browser instance
        if (!this.eventListeners.has(eventName)) {
            this.eventListeners.set(eventName, new Set());
        }
        this.eventListeners.get(eventName)!.add(listener);

        // Add a global event listener if this is the first for this event
        const listeners = this.eventListeners.get(eventName)!;
        if (listeners.size === 1) {
            mp.events.add(eventName, (...args: unknown[]) => {
                for (const l of listeners) {
                    l(...args);
                }
            });
        }
    }

    once(eventName: string, listener: (...args: unknown[]) => void): void {
        const onceWrapper = (...args: unknown[]) => {
            this.off(eventName, onceWrapper);
            listener(...args);
        };
        this.on(eventName, onceWrapper);
    }

    off(eventName: string, listener: (...args: unknown[]) => void): void {
        const listeners = this.eventListeners.get(eventName);
        if (listeners) {
            listeners.delete(listener);
        }
    }

    public get raw(): BrowserMp {
        return this.$raw;
    }
}
