import type { EventService, ScriptEventHandler } from '../interfaces';

export class WebViewEventService implements EventService {
    private readonly $localHandlers: Map<string, Set<ScriptEventHandler>> = new Map();
    private readonly $remoteHandlers: Map<string, Set<ScriptEventHandler>> = new Map();

    public on<E extends string>(
        eventName: E,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        let _valid = true;
        const eventHandler: ScriptEventHandler = {
            destroy: () => {
                _valid = false;
                const handlers = this.$localHandlers.get(eventName);
                handlers?.delete(eventHandler);
            },
            get valid() {
                return _valid;
            },
            handler: callback,
            local: true,
            onlyOnce: false,
            remote: false,
            eventName,
        };

        if (!this.$localHandlers.has(eventName)) {
            this.$localHandlers.set(eventName, new Set());
        }
        this.$localHandlers.get(eventName)!.add(eventHandler);

        return eventHandler;
    }

    public once<E extends string>(
        eventName: E,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        let _valid = true;
        const eventHandler: ScriptEventHandler = {
            destroy: () => {
                _valid = false;
                const handlers = this.$localHandlers.get(eventName);
                handlers?.delete(eventHandler);
            },
            get valid() {
                return _valid;
            },
            handler: callback,
            local: true,
            onlyOnce: true,
            remote: false,
            eventName,
        };

        if (!this.$localHandlers.has(eventName)) {
            this.$localHandlers.set(eventName, new Set());
        }
        this.$localHandlers.get(eventName)!.add(eventHandler);

        return eventHandler;
    }

    public emit<E extends string>(eventName: E, body?: unknown) {
        const listeners = this.$localHandlers.get(eventName);
        listeners?.forEach((scriptEventHandler) => {
            scriptEventHandler.handler(body);
            if (!scriptEventHandler.onlyOnce) return;
            scriptEventHandler.destroy();
        });
    }

    public onPlayer<E extends string>(
        eventName: E,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const wrapper = (...args: unknown[]) => {
            let data = args[0];
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data);
                } catch {
                }
            }
            callback(data);
        };
        let _valid = true;
        const eventHandler: ScriptEventHandler = {
            destroy: () => {
                _valid = false;
                const handlers = this.$remoteHandlers.get(eventName);
                handlers?.delete(eventHandler);
            },
            get valid() {
                return _valid;
            },
            handler: wrapper,
            local: false,
            onlyOnce: false,
            remote: true,
            eventName,
        };

        if (typeof (window as any).mp !== 'undefined') {
            (window as any).mp.events.add(eventName, wrapper);
        }

        if (!this.$remoteHandlers.has(eventName)) {
            this.$remoteHandlers.set(eventName, new Set());
        }
        this.$remoteHandlers.get(eventName)!.add(eventHandler);

        return eventHandler;
    }

    public oncePlayer<E extends string>(
        eventName: E,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        let _valid = true;
        const wrapper = (...args: unknown[]) => {
            let data = args[0];
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data);
                } catch {
                }
            }
            callback(data);
            eventHandler.destroy();
        };
        const eventHandler: ScriptEventHandler = {
            destroy: () => {
                _valid = false;
                const handlers = this.$remoteHandlers.get(eventName);
                handlers?.delete(eventHandler);
            },
            get valid() {
                return _valid;
            },
            eventName,
            handler: wrapper,
            local: false,
            onlyOnce: true,
            remote: true,
        };

        if (typeof (window as any).mp !== 'undefined') {
            (window as any).mp.events.add(eventName, wrapper);
        }

        if (!this.$remoteHandlers.has(eventName)) {
            this.$remoteHandlers.set(eventName, new Set());
        }
        this.$remoteHandlers.get(eventName)!.add(eventHandler);

        return eventHandler;
    }

    public emitPlayer<E extends string>(eventName: E, body?: unknown) {
        if (typeof (window as any).mp !== 'undefined') {
            (window as any).mp.trigger(eventName, body);
        }
    }

    public onServer<E extends string>(
        eventName: E,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        return this.onPlayer(`WEBVIEW::ON_SERVER_${eventName}`, callback);
    }

    public onceServer<E extends string>(
        eventName: E,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        return this.oncePlayer(`WEBVIEW::ON_SERVER_${eventName}`, callback);
    }

    public emitServer<E extends string>(eventName: E, body?: unknown) {
        if (typeof (window as any).mp !== 'undefined') {
            (window as any).mp.trigger('WEBVIEW::EMIT_SERVER', JSON.stringify({
                eventName,
                payload: body,
            }));
        }
    }
}
