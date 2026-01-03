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
        const serializedArgs = args.map(arg => JSON.stringify(arg));
        (player as any).call(eventName, serializedArgs);
    }

    emitAllPlayersRaw(eventName: string, ...args: any[]): void {
        const serializedArgs = args.map(arg => JSON.stringify(arg));
        mp.players.call(eventName, serializedArgs);
    }

    emitAllPlayersUnreliableRaw(eventName: string, ...args: any[]): void {
        const serializedArgs = args.map(arg => JSON.stringify(arg));
        mp.players.callUnreliable(eventName, serializedArgs);
    }

    emitUnreliableRaw(players: MultiplayerPlayer[], eventName: string, ...args: any[]): void {
        for (const player of players) {
            const serializedArgs = args.map(arg => JSON.stringify(arg));
            (player as any).callUnreliable(eventName, serializedArgs);
        }
    }

    onPlayer(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        if (NATIVE_SERVER_EVENTS.has(eventName as NativeServerEvent)) {
            return this.on(eventName, listener);
        }
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
        if (NATIVE_SERVER_EVENTS.has(eventName as NativeServerEvent)) {
            return this.once(eventName, listener);
        }
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
