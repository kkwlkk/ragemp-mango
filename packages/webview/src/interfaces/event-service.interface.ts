import type { ScriptEventHandler } from './script-event-handler.interface';

export interface EventService {
    on<E extends keyof MangoEvents.CustomWebViewEvent>(
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomWebViewEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof MangoEvents.CustomWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends keyof MangoEvents.CustomWebViewEvent>(
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomWebViewEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof MangoEvents.CustomWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emit<E extends keyof MangoEvents.CustomWebViewEvent>(eventName: E, body?: Parameters<MangoEvents.CustomWebViewEvent[E]>[0]): void;
    emit<E extends string>(eventName: Exclude<E, keyof MangoEvents.CustomWebViewEvent>, body?: unknown): void;
    onPlayer<E extends keyof MangoEvents.CustomClientToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<MangoEvents.CustomClientToWebViewEvent[E]>[0],
        ) => void | Promise<void>,
    ): ScriptEventHandler;
    onPlayer<E extends string>(
        eventName: Exclude<E, keyof MangoEvents.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    oncePlayer<E extends keyof MangoEvents.CustomClientToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<MangoEvents.CustomClientToWebViewEvent[E]>[0],
        ) => void | Promise<void>,
    ): ScriptEventHandler;
    oncePlayer<E extends string>(
        eventName: Exclude<E, keyof MangoEvents.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emitPlayer<E extends keyof MangoEvents.CustomWebViewToClientEvent>(
        eventName: E,
        body?: Parameters<MangoEvents.CustomWebViewToClientEvent[E]>[0],
    ): void;
    emitPlayer<E extends string>(eventName: Exclude<E, keyof MangoEvents.CustomWebViewToClientEvent>, body?: unknown): void;
    onServer<E extends keyof MangoEvents.CustomServerToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<MangoEvents.CustomServerToWebViewEvent[E]>[0],
        ) => void | Promise<void>,
    ): ScriptEventHandler;
    onServer<E extends string>(
        eventName: Exclude<E, keyof MangoEvents.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    onceServer<E extends keyof MangoEvents.CustomServerToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<MangoEvents.CustomServerToWebViewEvent[E]>[0],
        ) => void | Promise<void>,
    ): ScriptEventHandler;
    onceServer<E extends string>(
        eventName: Exclude<E, keyof MangoEvents.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emitServer<E extends keyof MangoEvents.CustomWebViewToServerEvent>(
        eventName: E,
        body?: Parameters<MangoEvents.CustomWebViewToServerEvent[E]>[0],
    ): void;
    emitServer<E extends string>(eventName: Exclude<E, keyof MangoEvents.CustomWebViewToServerEvent>, body?: unknown): void;
}
