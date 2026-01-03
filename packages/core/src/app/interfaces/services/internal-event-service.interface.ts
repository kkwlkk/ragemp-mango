import type { ScriptEventHandler, EventHandler } from '../../../interfaces';

export interface InternalEventService {
    readonly $localHandlers: Set<ScriptEventHandler>;
    readonly $internalHandlers: Set<EventHandler>;
    readonly $remoteHandlers: Set<ScriptEventHandler>;
    // Client
    on<E extends keyof MangoEvents.CustomClientEvent>(
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomClientEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof MangoEvents.CustomClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends keyof MangoEvents.CustomClientEvent>(
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomClientEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof MangoEvents.CustomClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emit<E extends keyof MangoEvents.CustomClientEvent>(eventName: E, body?: MangoEvents.CustomClientEvent[E]): void;
    emit<E extends string>(eventName: Exclude<E, keyof MangoEvents.CustomClientEvent>, body?: unknown): void;
    onServer<E extends keyof MangoEvents.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomServerToPlayerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onServer<E extends string>(
        eventName: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    onceServer<E extends keyof MangoEvents.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomServerToPlayerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onceServer<E extends string>(
        eventName: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emitServer<E extends keyof MangoEvents.CustomPlayerToServerEvent>(
        eventName: E,
        body?: Parameters<MangoEvents.CustomPlayerToServerEvent[E]>[0],
    ): void;
    emitServer<E extends string>(eventName: Exclude<E, keyof MangoEvents.CustomPlayerToServerEvent>, body?: unknown): void;
    onWebView<E extends keyof MangoEvents.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomWebViewToClientEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof MangoEvents.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    onceWebView<E extends keyof MangoEvents.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomWebViewToClientEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onceWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof MangoEvents.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emitWebView<E extends keyof MangoEvents.CustomClientToWebViewEvent>(
        id: string | number,
        eventName: E | string,
        body?: Parameters<MangoEvents.CustomClientToWebViewEvent[E]>[0],
    ): void;
    emitWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof MangoEvents.CustomClientToWebViewEvent> | string,
        body?: unknown,
    ): void;
    // Server
    on<E extends keyof MangoEvents.CustomServerEvent>(
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof MangoEvents.CustomServerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends keyof MangoEvents.CustomServerEvent>(
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof MangoEvents.CustomServerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emit<E extends keyof MangoEvents.CustomServerEvent>(eventName: E, body?: MangoEvents.CustomServerEvent[E]): void;
    emit<E extends string>(eventName: Exclude<E, keyof MangoEvents.CustomServerEvent>, body?: any): void;
    onPlayer<E extends keyof MangoEvents.CustomPlayerToServerEvent, U extends PlayerMp>(
        eventName: E,
        callback: (player: U, body: Parameters<MangoEvents.CustomPlayerToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onPlayer<E extends string, U extends PlayerMp>(
        eventName: Exclude<E, keyof MangoEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    oncePlayer<E extends keyof MangoEvents.CustomPlayerToServerEvent, U extends PlayerMp>(
        eventName: E,
        callback: (player: U, body: Parameters<MangoEvents.CustomPlayerToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    oncePlayer<E extends string, U extends PlayerMp>(
        eventName: Exclude<E, keyof MangoEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    onRemote<E extends keyof MangoEvents.CustomPlayerToServerEvent, U extends PlayerMp>(
        eventName: E,
        callback: (player: U, body: Parameters<MangoEvents.CustomPlayerToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onRemote<E extends string, U extends PlayerMp>(
        eventName: Exclude<E, keyof MangoEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    onceRemote<E extends keyof MangoEvents.CustomPlayerToServerEvent, U extends PlayerMp>(
        eventName: E,
        callback: (player: U, body: Parameters<MangoEvents.CustomPlayerToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onceRemote<E extends string, U extends PlayerMp>(
        eventName: Exclude<E, keyof MangoEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emitPlayers<E extends keyof MangoEvents.CustomServerToPlayerEvent, U extends PlayerMp>(
        player: U[],
        eventName: E,
        body?: Parameters<MangoEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitPlayers<E extends string, U extends PlayerMp>(
        player: U[],
        eventName: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void;
    emitPlayersUnreliable<E extends keyof MangoEvents.CustomServerToPlayerEvent, U extends PlayerMp>(
        player: U[],
        eventName: E,
        body?: Parameters<MangoEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitPlayersUnreliable<E extends string, U extends PlayerMp>(
        player: U[],
        eventName: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void;
    emitAllPlayers<E extends keyof MangoEvents.CustomServerToPlayerEvent>(
        eventName: E,
        body?: Parameters<MangoEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitAllPlayers<E extends string>(eventName: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>, body?: unknown): void;
    emitAllPlayersUnreliable<E extends keyof MangoEvents.CustomServerToPlayerEvent>(
        eventName: E,
        body?: Parameters<MangoEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitAllPlayersUnreliable<E extends string>(eventName: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>, body?: unknown): void;
    onWebView<E extends keyof MangoEvents.CustomWebViewToServerEvent, U extends PlayerMp>(
        id: string | number,
        eventName: E,
        callback: (player: U, body: Parameters<MangoEvents.CustomWebViewToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onWebView<E extends string, U extends PlayerMp>(
        id: string | number,
        eventName: Exclude<E, keyof MangoEvents.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    onceWebView<E extends keyof MangoEvents.CustomWebViewToServerEvent, U extends PlayerMp>(
        id: string | number,
        eventName: E,
        callback: (player: U, body: Parameters<MangoEvents.CustomWebViewToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onceWebView<E extends string, U extends PlayerMp>(
        id: string | number,
        eventName: Exclude<E, keyof MangoEvents.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;

    emitWebViews<E extends keyof MangoEvents.CustomServerToWebViewEvent, U extends PlayerMp>(
        player: U[],
        id: string | number,
        eventName: E | string,
        body?: Parameters<MangoEvents.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitWebViews<E extends string, U extends PlayerMp>(
        player: U[],
        id: string | number,
        eventName: Exclude<E, keyof MangoEvents.CustomServerToWebViewEvent> | string,
        body?: unknown,
    ): void;

    emitAllWebViews<E extends keyof MangoEvents.CustomServerToWebViewEvent>(
        id: string | number,
        eventName: E,
        body?: Parameters<MangoEvents.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitAllWebViews<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof MangoEvents.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void;

    emitAllWebViewsUnreliable<E extends keyof MangoEvents.CustomServerToWebViewEvent>(
        id: string | number,
        eventName: E,
        body?: Parameters<MangoEvents.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitAllWebViewsUnreliable<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof MangoEvents.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void;
    // Internal
    $onInternal(eventName: string, handler: (body: unknown) => void | Promise<void>): EventHandler;
    $onceInternal(eventName: string, handler: (body: unknown) => void | Promise<void>): EventHandler;
}
