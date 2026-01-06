import type { ScriptEventHandler } from '@ragemp-mango/core/app';

export interface EventService {
    on<E extends keyof MangoEvents.CustomClientEvent>(
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomClientEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    on<T = unknown>(
        eventName: string,
        callback: (body: T) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends keyof MangoEvents.CustomClientEvent>(
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomClientEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    once<T = unknown>(
        eventName: string,
        callback: (body: T) => void | Promise<void>,
    ): ScriptEventHandler;
    emit<E extends keyof MangoEvents.CustomClientEvent>(eventName: E, body?: Parameters<MangoEvents.CustomClientEvent[E]>[0]): void;
    emit<T = unknown>(eventName: string, body?: T): void;
    onServer<E extends keyof MangoEvents.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomServerToPlayerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onServer<T = unknown>(
        eventName: string,
        callback: (body: T) => void | Promise<void>,
    ): ScriptEventHandler;
    onceServer<E extends keyof MangoEvents.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomServerToPlayerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onceServer<T = unknown>(
        eventName: string,
        callback: (body: T) => void | Promise<void>,
    ): ScriptEventHandler;
    emitServer<E extends keyof MangoEvents.CustomPlayerToServerEvent>(
        eventName: E,
        body?: Parameters<MangoEvents.CustomPlayerToServerEvent[E]>[0],
    ): void;
    emitServer<T = unknown>(eventName: string, body?: T): void;
    onWebView<E extends keyof MangoEvents.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomWebViewToClientEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onWebView<T = unknown>(
        id: string | number,
        eventName: string,
        callback: (body: T) => void | Promise<void>,
    ): ScriptEventHandler;
    onceWebView<E extends keyof MangoEvents.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomWebViewToClientEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onceWebView<T = unknown>(
        id: string | number,
        eventName: string,
        callback: (body: T) => void | Promise<void>,
    ): ScriptEventHandler;
    emitWebView<E extends keyof MangoEvents.CustomClientToWebViewEvent>(
        id: string | number,
        eventName: E,
        body?: Parameters<MangoEvents.CustomClientToWebViewEvent[E]>[0],
    ): void;
    emitWebView<T = unknown>(
        id: string | number,
        eventName: string,
        body?: T,
    ): void;

    // RageMP client-specific events
    onRender(callback: () => void): ScriptEventHandler;
    onBrowserDomReady(callback: (browser: BrowserMp) => void): ScriptEventHandler;
    onBrowserLoadingFailed(callback: (browser: BrowserMp) => void): ScriptEventHandler;
    onPlayerChat(callback: (text: string) => void): ScriptEventHandler;
    onPlayerCommand(callback: (command: string) => void): ScriptEventHandler;
    onPlayerDeath(callback: (killer?: PlayerMp, reason?: number) => void): ScriptEventHandler;
    onPlayerSpawn(callback: () => void): ScriptEventHandler;
    onPlayerEnterVehicle(callback: (vehicle: VehicleMp, seat: number) => void): ScriptEventHandler;
    onPlayerExitVehicle(callback: (vehicle: VehicleMp) => void): ScriptEventHandler;
    onPlayerEnterColshape(callback: (colshape: ColshapeMp) => void): ScriptEventHandler;
    onPlayerExitColshape(callback: (colshape: ColshapeMp) => void): ScriptEventHandler;
    onPlayerEnterCheckpoint(callback: (checkpoint: CheckpointMp) => void): ScriptEventHandler;
    onPlayerExitCheckpoint(callback: (checkpoint: CheckpointMp) => void): ScriptEventHandler;
}
