import type { ScriptEventHandler } from '@ragemp-mango/core/app';
import type { MultiplayerPlayer, ServerEventEmmiter } from '../../interfaces';
import { RageMPServerScriptEvent } from './ragemp-script-event-handler';

type NativeServerEvent = keyof IServerEvents;
const NATIVE_SERVER_EVENTS = new Set<NativeServerEvent>([
    'entityCreated',
    'entityDestroyed',
    'entityModelChange',
    'incomingConnection',
    'packagesLoaded',
    'playerChat',
    'playerCommand',
    'playerDamage',
    'playerDeath',
    'playerEnterCheckpoint',
    'playerEnterColshape',
    'playerEnterVehicle',
    'playerExitCheckpoint',
    'playerExitColshape',
    'playerExitVehicle',
    'playerJoin',
    'playerQuit',
    'playerReachWaypoint',
    'playerReady',
    'playerSpawn',
    'playerStartEnterVehicle',
    'playerStartExitVehicle',
    'playerStreamIn',
    'playerStreamOut',
    'playerWeaponChange',
    'serverShutdown',
    'trailerAttached',
    'vehicleDamage',
    'vehicleDeath',
    'vehicleHornToggle',
    'vehicleSirenToggle',
]);

export class ServerRageMPEventEmmiter implements ServerEventEmmiter {

    emit(eventName: string, ...args: any[]): void {
        mp.events.call(eventName, ...args);
    }

    on(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        mp.events.add(eventName, listener);
        return new RageMPServerScriptEvent(eventName, listener);
    }

    once(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        const onceWrapper = (...args: any[]) => {
            mp.events.remove(eventName, onceWrapper);
            listener(...args);
        };
        mp.events.add(eventName, onceWrapper);
        return new RageMPServerScriptEvent(eventName, onceWrapper);
    }

    off(eventName: string, listener: (...args: any[]) => void): void {
        mp.events.remove(eventName, listener);
    }

    emitPlayer(player: MultiplayerPlayer, eventName: string, ...args: any[]): void {
        // In RageMP, player.call() is used to emit events to clients
        (player as any).call(eventName, args);
    }

    emitAllPlayersRaw(eventName: string, ...args: any[]): void {
        // In RageMP, use mp.players.call() to emit to all players
        mp.players.call(eventName, args);
    }

    emitAllPlayersUnreliableRaw(eventName: string, ...args: any[]): void {
        // RageMP has callUnreliable for unreliable events
        mp.players.callUnreliable(eventName, args);
    }

    emitUnreliableRaw(players: MultiplayerPlayer[], eventName: string, ...args: any[]): void {
        for (const player of players) {
            (player as any).callUnreliable(eventName, args);
        }
    }

    onPlayer(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        // Native RAGEMP events should be registered with 'on' type
        // They are triggered by the game engine, not by client-to-server communication
        if (NATIVE_SERVER_EVENTS.has(eventName as NativeServerEvent)) {
            return this.on(eventName, listener);
        }
        // Custom client-to-server events - data is JSON stringified from client
        const wrapper = (player: PlayerMp, ...args: any[]) => {
            const parsedArgs = args.map(arg => {
                if (typeof arg === 'string') {
                    try {
                        return JSON.parse(arg);
                    } catch {
                        return arg;
                    }
                }
                return arg;
            });
            listener(player, ...parsedArgs);
        };
        mp.events.add(eventName, wrapper);
        return new RageMPServerScriptEvent(eventName, wrapper);
    }

    oncePlayer(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        // Native RAGEMP events should be registered with 'once' type
        if (NATIVE_SERVER_EVENTS.has(eventName as NativeServerEvent)) {
            return this.once(eventName, listener);
        }
        // Custom client-to-server events - data is JSON stringified from client
        const onceWrapper = (player: PlayerMp, ...args: any[]) => {
            mp.events.remove(eventName, onceWrapper);
            const parsedArgs = args.map(arg => {
                if (typeof arg === 'string') {
                    try {
                        return JSON.parse(arg);
                    } catch {
                        return arg;
                    }
                }
                return arg;
            });
            listener(player, ...parsedArgs);
        };
        mp.events.add(eventName, onceWrapper);
        return new RageMPServerScriptEvent(eventName, onceWrapper);
    }

    offPlayer(eventName: string, listener: (...args: any[]) => void): void {
        mp.events.remove(eventName, listener);
    }
}
