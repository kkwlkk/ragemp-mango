import { BaseEventService, MULTIPLAYER_SERVICE } from '@ragemp-mango/core/app';
import { inject, injectable } from 'inversify';
import { INTERNAL_EVENTS } from '../constants';
import type { EventService, ServerEventEmmiter, ServerMultiplayerService } from '../interfaces';
import type { ScriptEventHandler } from '@ragemp-mango/core';

@injectable()
export class ServerEventService extends BaseEventService<MangoEvents.CustomServerEvent> implements EventService {
    private $rageEvents: ServerEventEmmiter;
    public constructor(@inject(MULTIPLAYER_SERVICE) multiplayerService: ServerMultiplayerService) {
        super(multiplayerService.Events);
        this.$rageEvents = multiplayerService.Events;
        this.$internalEventNames = new Set(Object.values(INTERNAL_EVENTS));
    }

    public onPlayer<E extends string, U extends PlayerMp>(
        eventName: Exclude<E, keyof MangoEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        const wrapper = (player: U, ...args: unknown[]) => callback(player, args[0]);
        const eventHandler = this.$rageEvents.onPlayer(eventName, wrapper);
        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public oncePlayer<E extends string, U extends PlayerMp>(
        eventName: Exclude<E, keyof MangoEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        const wrapper = (player: U, ...args: unknown[]) => callback(player, args[0]!);
        const eventHandler = this.$rageEvents.oncePlayer(eventName, wrapper);
        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public onRemote<E extends string, U extends PlayerMp>(
        eventName: Exclude<E, keyof MangoEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        return this.onPlayer(eventName, callback);
    }

    public onceRemote<E extends string, U extends PlayerMp>(
        eventName: Exclude<E, keyof MangoEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        return this.oncePlayer(eventName, callback);
    }

    public emitPlayers<E extends string, U extends PlayerMp>(
        players: U[],
        eventName: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void {
        const serializedBody = JSON.stringify(body);
        for (const player of players) {
            player.call(eventName, [serializedBody]);
        }
    }

    public emitPlayersUnreliable<E extends string, U extends PlayerMp>(
        players: U[],
        eventName: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void {
        const serializedBody = JSON.stringify(body);
        for (const player of players) {
            player.callUnreliable(eventName, [serializedBody]);
        }
    }

    public emitAllPlayers<E extends string>(eventName: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>, body?: unknown): void {
        mp.players.call(eventName, [JSON.stringify(body)]);
    }

    public emitAllPlayersUnreliable<E extends string>(eventName: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>, body?: unknown): void {
        mp.players.callUnreliable(eventName, [JSON.stringify(body)]);
    }

    public onWebView<E extends string, U extends PlayerMp>(
        id: string | number,
        eventName: Exclude<E, keyof MangoEvents.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        return this.onPlayer(<string>`SERVER::ON_WEBVIEW_${eventName}_${id}`, <any>callback);
    }

    public onceWebView<E extends string, U extends PlayerMp>(
        id: string | number,
        eventName: Exclude<E, keyof MangoEvents.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        return this.oncePlayer(<string>`SERVER::ON_WEBVIEW_${eventName}_${id}`, <any>callback);
    }

    public emitWebViews<E extends string, U extends PlayerMp>(
        players: U[],
        id: string | number,
        eventName: Exclude<E, keyof MangoEvents.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void {
        const payload = {
            id,
            eventName,
            payload: body,
        };
        console.log(`[ServerEventService] Payload: ${JSON.stringify(payload)}`);
        // Data must be JSON stringified because RAGE:MP doesn't properly serialize complex objects
        const serializedBody = JSON.stringify(payload);
        for (const player of players) {
            const rawPlayer = (player as any).$raw || (player as any)._player || (player as any).player || player;

            try {
                rawPlayer.call('SERVER::EMIT_WEBVIEW', [serializedBody]);
            } catch (err) {
            }
        }
    }

    public emitAllWebViews<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof MangoEvents.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void {
        (<EventService>this).emitAllPlayers('SERVER::EMIT_WEBVIEW', {
            id,
            eventName,
            payload: body,
        });
    }

    public emitAllWebViewsUnreliable<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof MangoEvents.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void {
        (<EventService>this).emitAllPlayersUnreliable('SERVER::EMIT_WEBVIEW', {
            id,
            eventName,
            payload: body,
        });
    }

    // RageMP server events
    public onPlayerJoin(callback: (player: PlayerMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerJoin', callback);
    }

    public onPlayerQuit(callback: (player: PlayerMp, exitType: string, reason: string) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerQuit', callback);
    }

    public onPlayerReady(callback: (player: PlayerMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerReady', callback);
    }

    public onPlayerDeath(callback: (player: PlayerMp, reason: number, killer?: PlayerMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerDeath', callback);
    }

    public onPlayerSpawn(callback: (player: PlayerMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerSpawn', callback);
    }

    public onPlayerChat(callback: (player: PlayerMp, text: string) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerChat', callback);
    }

    public onPlayerCommand(callback: (player: PlayerMp, command: string) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerCommand', callback);
    }

    public onPlayerEnterVehicle(callback: (player: PlayerMp, vehicle: VehicleMp, seat: number) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerEnterVehicle', callback);
    }

    public onPlayerExitVehicle(callback: (player: PlayerMp, vehicle: VehicleMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerExitVehicle', callback);
    }

    public onPlayerStartEnterVehicle(callback: (player: PlayerMp, vehicle: VehicleMp, seat: number) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerStartEnterVehicle', callback);
    }

    public onPlayerStartExitVehicle(callback: (player: PlayerMp, vehicle: VehicleMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerStartExitVehicle', callback);
    }

    public onPlayerWeaponChange(callback: (player: PlayerMp, oldWeapon: number, newWeapon: number) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerWeaponChange', callback);
    }

    public onPlayerDamage(callback: (player: PlayerMp, healthLoss: number, armorLoss: number) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerDamage', callback);
    }

    public onVehicleDeath(callback: (vehicle: VehicleMp, hash: number, killer?: PlayerMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('vehicleDeath', callback);
    }

    public onVehicleDamage(callback: (vehicle: VehicleMp, bodyHealthLoss: number, engineHealthLoss: number) => void): ScriptEventHandler {
        return this.$rageEvents.on('vehicleDamage', callback);
    }

    public onPlayerEnterColshape(callback: (player: PlayerMp, colshape: ColshapeMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerEnterColshape', callback);
    }

    public onPlayerExitColshape(callback: (player: PlayerMp, colshape: ColshapeMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerExitColshape', callback);
    }

    public onPlayerEnterCheckpoint(callback: (player: PlayerMp, checkpoint: CheckpointMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerEnterCheckpoint', callback);
    }

    public onPlayerExitCheckpoint(callback: (player: PlayerMp, checkpoint: CheckpointMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerExitCheckpoint', callback);
    }

    // Aliases for backward compatibility
    public onPlayerConnect(callback: (player: PlayerMp) => void): ScriptEventHandler {
        return this.onPlayerJoin(callback);
    }

    public onPlayerDisconnect(callback: (context: { player: PlayerMp; exitType: string; reason: string }) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerQuit', (player: PlayerMp, exitType: string, reason: string) => {
            callback({ player, exitType, reason });
        });
    }
}
