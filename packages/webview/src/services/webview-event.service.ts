import type { EventService, ScriptEventHandler } from '../interfaces';

export class WebViewEventService implements EventService {
    private readonly $localHandlers: Map<string, Set<ScriptEventHandler>> = new Map();
    private readonly $remoteHandlers: Map<string, Set<ScriptEventHandler>> = new Map();

    public on<E extends string>(
        eventName: E,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const eventHandler: ScriptEventHandler = {
            destroy: () => {
                // @ts-ignore
                eventHandler.valid = false;
                const handlers = this.$localHandlers.get(eventName);
                handlers?.delete(eventHandler);
            },
            eventName,
            handler: callback,
            local: true,
            onlyOnce: false,
            remote: false,
            valid: true,
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
        const eventHandler = {
            destroy: () => {
                eventHandler.valid = false;
                const handlers = this.$localHandlers.get(eventName);
                handlers?.delete(eventHandler);
            },
            eventName,
            handler: callback,
            local: true,
            onlyOnce: true,
            remote: false,
            valid: true,
        };

        if (!this.$localHandlers.has(eventName)) {
            this.$localHandlers.set(eventName, new Set());
        }
        this.$localHandlers.get(eventName)!.add(eventHandler);

        return <ScriptEventHandler>eventHandler;
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
        const wrapper = (...args: any[]) => callback(args[0]);
        const eventHandler: ScriptEventHandler = {
            destroy: () => {
                // @ts-ignore
                eventHandler.valid = false;
                const handlers = this.$remoteHandlers.get(eventName);
                handlers?.delete(eventHandler);
                // In RageMP CEF, we use mp.trigger to communicate
                // Events are registered via window event listeners or mp.events
            },
            eventName,
            handler: wrapper,
            local: false,
            onlyOnce: false,
            remote: true,
            valid: true,
        };

        // RageMP CEF uses window-level event registration
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
        const wrapper = (...args: any[]) => {
            callback(args[0]);
            eventHandler.destroy();
        };
        const eventHandler: ScriptEventHandler = {
            destroy: () => {
                // @ts-ignore
                eventHandler.valid = false;
                const handlers = this.$remoteHandlers.get(eventName);
                handlers?.delete(eventHandler);
            },
            eventName,
            handler: wrapper,
            local: false,
            onlyOnce: true,
            remote: true,
            valid: true,
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
        // RageMP CEF uses mp.trigger to send events to client
        if (typeof (window as any).mp !== 'undefined') {
            (window as any).mp.trigger(eventName, body);
        }
    }

    public onServer<E extends string>(
        eventName: E,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        return this.onPlayer(<string>`WEBVIEW::ON_SERVER_${eventName}`, <any>callback);
    }

    public onceServer<E extends string>(
        eventName: E,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        return this.oncePlayer(<string>`WEBVIEW::ON_SERVER_${eventName}`, <any>callback);
    }

    public emitServer<E extends string>(eventName: E, body?: unknown) {
        // In RageMP, we emit to client which then forwards to server
        if (typeof (window as any).mp !== 'undefined') {
            (window as any).mp.trigger('WEBVIEW::EMIT_SERVER', {
                eventName,
                payload: body,
            });
        }
    }
}
