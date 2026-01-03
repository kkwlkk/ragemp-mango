import type { ScriptEventHandler } from '@ragemp-mango/core/app';
import type { MultiplayerPlayer } from '../multiplayer';

export interface EventService {
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
    emit<E extends keyof MangoEvents.CustomServerEvent>(eventName: E, body?: Parameters<MangoEvents.CustomServerEvent[E]>[0]): void;
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
    emitPlayers<E extends keyof MangoEvents.CustomServerToPlayerEvent, U extends MultiplayerPlayer>(
        player: U[],
        eventName: E,
        body?: Parameters<MangoEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitPlayers<E extends string, U extends MultiplayerPlayer>(
        player: U[],
        eventName: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void;
    emitPlayersUnreliable<E extends keyof MangoEvents.CustomServerToPlayerEvent, U extends MultiplayerPlayer>(
        player: U[],
        eventName: E,
        body?: Parameters<MangoEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitPlayersUnreliable<E extends string, U extends MultiplayerPlayer>(
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

    emitWebViews<E extends keyof MangoEvents.CustomServerToWebViewEvent, U extends MultiplayerPlayer>(
        player: U[],
        id: string | number,
        eventName: E | string,
        body?: Parameters<MangoEvents.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitWebViews<E extends string, U extends MultiplayerPlayer>(
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

    // RageMP specific events
    onPlayerJoin(callback: (player: PlayerMp) => void): ScriptEventHandler;
    onPlayerQuit(callback: (player: PlayerMp, exitType: string, reason: string) => void): ScriptEventHandler;
    onPlayerReady(callback: (player: PlayerMp) => void): ScriptEventHandler;
    onPlayerDeath(callback: (player: PlayerMp, reason: number, killer?: PlayerMp) => void): ScriptEventHandler;
    onPlayerSpawn(callback: (player: PlayerMp) => void): ScriptEventHandler;
    onPlayerChat(callback: (player: PlayerMp, text: string) => void): ScriptEventHandler;
    onPlayerCommand(callback: (player: PlayerMp, command: string) => void): ScriptEventHandler;
    onPlayerEnterVehicle(callback: (player: PlayerMp, vehicle: VehicleMp, seat: number) => void): ScriptEventHandler;
    onPlayerExitVehicle(callback: (player: PlayerMp, vehicle: VehicleMp) => void): ScriptEventHandler;
    onPlayerStartEnterVehicle(callback: (player: PlayerMp, vehicle: VehicleMp, seat: number) => void): ScriptEventHandler;
    onPlayerStartExitVehicle(callback: (player: PlayerMp, vehicle: VehicleMp) => void): ScriptEventHandler;
    onPlayerWeaponChange(callback: (player: PlayerMp, oldWeapon: number, newWeapon: number) => void): ScriptEventHandler;
    onPlayerDamage(callback: (player: PlayerMp, healthLoss: number, armorLoss: number) => void): ScriptEventHandler;
    onVehicleDeath(callback: (vehicle: VehicleMp, hash: number, killer?: PlayerMp) => void): ScriptEventHandler;
    onVehicleDamage(callback: (vehicle: VehicleMp, bodyHealthLoss: number, engineHealthLoss: number) => void): ScriptEventHandler;
    onPlayerEnterColshape(callback: (player: PlayerMp, colshape: ColshapeMp) => void): ScriptEventHandler;
    onPlayerExitColshape(callback: (player: PlayerMp, colshape: ColshapeMp) => void): ScriptEventHandler;
    onPlayerEnterCheckpoint(callback: (player: PlayerMp, checkpoint: CheckpointMp) => void): ScriptEventHandler;
    onPlayerExitCheckpoint(callback: (player: PlayerMp, checkpoint: CheckpointMp) => void): ScriptEventHandler;

    // Aliases for backward compatibility
    onPlayerConnect(callback: (player: PlayerMp) => void): ScriptEventHandler;
    onPlayerDisconnect(callback: (context: { player: PlayerMp; exitType: string; reason: string }) => void): ScriptEventHandler;
}
