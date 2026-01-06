import type { ScriptEventHandler } from '@ragemp-mango/core/app';
import type { MultiplayerPlayer } from '../multiplayer';

export interface EventService {
    on<E extends keyof MangoEvents.CustomServerEvent>(
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    on<T = unknown>(
        eventName: string,
        callback: (body: T) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends keyof MangoEvents.CustomServerEvent>(
        eventName: E,
        callback: (body: Parameters<MangoEvents.CustomServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    once<T = unknown>(
        eventName: string,
        callback: (body: T) => void | Promise<void>,
    ): ScriptEventHandler;
    emit<E extends keyof MangoEvents.CustomServerEvent>(eventName: E, body?: Parameters<MangoEvents.CustomServerEvent[E]>[0]): void;
    emit<T = unknown>(eventName: string, body?: T): void;
    onPlayer<E extends keyof MangoEvents.CustomPlayerToServerEvent, U extends PlayerMp>(
        eventName: E,
        callback: (player: U, body: Parameters<MangoEvents.CustomPlayerToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onPlayer<T = unknown, U extends PlayerMp = PlayerMp>(
        eventName: string,
        callback: (player: U, body: T) => void | Promise<void>,
    ): ScriptEventHandler;
    oncePlayer<E extends keyof MangoEvents.CustomPlayerToServerEvent, U extends PlayerMp>(
        eventName: E,
        callback: (player: U, body: Parameters<MangoEvents.CustomPlayerToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    oncePlayer<T = unknown, U extends PlayerMp = PlayerMp>(
        eventName: string,
        callback: (player: U, body: T) => void | Promise<void>,
    ): ScriptEventHandler;
    onRemote<E extends keyof MangoEvents.CustomPlayerToServerEvent, U extends PlayerMp>(
        eventName: E,
        callback: (player: U, body: Parameters<MangoEvents.CustomPlayerToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onRemote<T = unknown, U extends PlayerMp = PlayerMp>(
        eventName: string,
        callback: (player: U, body: T) => void | Promise<void>,
    ): ScriptEventHandler;
    onceRemote<E extends keyof MangoEvents.CustomPlayerToServerEvent, U extends PlayerMp>(
        eventName: E,
        callback: (player: U, body: Parameters<MangoEvents.CustomPlayerToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onceRemote<T = unknown, U extends PlayerMp = PlayerMp>(
        eventName: string,
        callback: (player: U, body: T) => void | Promise<void>,
    ): ScriptEventHandler;
    emitPlayers<E extends keyof MangoEvents.CustomServerToPlayerEvent, U extends MultiplayerPlayer>(
        player: U[],
        eventName: E,
        body?: Parameters<MangoEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitPlayers<T = unknown, U extends MultiplayerPlayer = MultiplayerPlayer>(
        player: U[],
        eventName: string,
        body?: T,
    ): void;
    emitPlayersUnreliable<E extends keyof MangoEvents.CustomServerToPlayerEvent, U extends MultiplayerPlayer>(
        player: U[],
        eventName: E,
        body?: Parameters<MangoEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitPlayersUnreliable<T = unknown, U extends MultiplayerPlayer = MultiplayerPlayer>(
        player: U[],
        eventName: string,
        body?: T,
    ): void;
    emitAllPlayers<E extends keyof MangoEvents.CustomServerToPlayerEvent>(
        eventName: E,
        body?: Parameters<MangoEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitAllPlayers<T = unknown>(eventName: string, body?: T): void;
    emitAllPlayersUnreliable<E extends keyof MangoEvents.CustomServerToPlayerEvent>(
        eventName: E,
        body?: Parameters<MangoEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitAllPlayersUnreliable<T = unknown>(eventName: string, body?: T): void;
    onWebView<E extends keyof MangoEvents.CustomWebViewToServerEvent, U extends PlayerMp>(
        id: string | number,
        eventName: E,
        callback: (player: U, body: Parameters<MangoEvents.CustomWebViewToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onWebView<T = unknown, U extends PlayerMp = PlayerMp>(
        id: string | number,
        eventName: string,
        callback: (player: U, body: T) => void | Promise<void>,
    ): ScriptEventHandler;
    onceWebView<E extends keyof MangoEvents.CustomWebViewToServerEvent, U extends PlayerMp>(
        id: string | number,
        eventName: E,
        callback: (player: U, body: Parameters<MangoEvents.CustomWebViewToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onceWebView<T = unknown, U extends PlayerMp = PlayerMp>(
        id: string | number,
        eventName: string,
        callback: (player: U, body: T) => void | Promise<void>,
    ): ScriptEventHandler;

    emitWebViews<E extends keyof MangoEvents.CustomServerToWebViewEvent, U extends MultiplayerPlayer>(
        player: U[],
        id: string | number,
        eventName: E,
        body?: Parameters<MangoEvents.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitWebViews<T = unknown, U extends MultiplayerPlayer = MultiplayerPlayer>(
        player: U[],
        id: string | number,
        eventName: string,
        body?: T,
    ): void;

    emitAllWebViews<E extends keyof MangoEvents.CustomServerToWebViewEvent>(
        id: string | number,
        eventName: E,
        body?: Parameters<MangoEvents.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitAllWebViews<T = unknown>(
        id: string | number,
        eventName: string,
        body?: T,
    ): void;

    emitAllWebViewsUnreliable<E extends keyof MangoEvents.CustomServerToWebViewEvent>(
        id: string | number,
        eventName: E,
        body?: Parameters<MangoEvents.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitAllWebViewsUnreliable<T = unknown>(
        id: string | number,
        eventName: string,
        body?: T,
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
