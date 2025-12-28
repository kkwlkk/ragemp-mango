import type { ScriptEventHandler } from '@ragemp-mango/core/app';
import type { MultiplayerPlayer, ServerEventEmmiter } from '../../interfaces';
import { RageMPServerScriptEvent } from './ragemp-script-event-handler';

export class ServerRageMPEventEmmiter implements ServerEventEmmiter {
    private mapEventsShared: Record<string, string> = {
        // Map alt:V event names to RageMP equivalents
        'entityColShapeEnter': 'playerEnterColshape',
        'entityColShapeLeave': 'playerExitColshape',
        'playerVehicleEntered': 'playerEnterVehicle',
        'playerVehicleLeft': 'playerExitVehicle',
        'playerStartVehicleEnter': 'playerStartEnterVehicle',
        'playerVehicleSeatChange': 'playerExitVehicle', // RageMP doesn't have seat change, closest is exit
    };

    constructor(private mapEvents: Record<string, string> = {}) {}

    private getEventName(eventName: string): string {
        return this.mapEventsShared[eventName] || this.mapEvents[eventName] || eventName;
    }

    emit(eventName: string, ...args: any[]): void {
        mp.events.call(eventName, ...args);
    }

    on(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        const mappedEventName = this.getEventName(eventName);
        mp.events.add(mappedEventName, listener);
        return new RageMPServerScriptEvent(mappedEventName, listener);
    }

    once(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        const mappedEventName = this.getEventName(eventName);
        const onceWrapper = (...args: any[]) => {
            mp.events.remove(mappedEventName, onceWrapper);
            listener(...args);
        };
        mp.events.add(mappedEventName, onceWrapper);
        return new RageMPServerScriptEvent(mappedEventName, onceWrapper);
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
        // In RageMP, client events come through the same mp.events.add
        // The first argument is typically the player who sent the event
        const mappedEventName = this.getEventName(eventName);
        mp.events.add(mappedEventName, listener);
        return new RageMPServerScriptEvent(mappedEventName, listener);
    }

    oncePlayer(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        const mappedEventName = this.getEventName(eventName);
        const onceWrapper = (...args: any[]) => {
            mp.events.remove(mappedEventName, onceWrapper);
            listener(...args);
        };
        mp.events.add(mappedEventName, onceWrapper);
        return new RageMPServerScriptEvent(mappedEventName, onceWrapper);
    }

    offPlayer(eventName: string, listener: (...args: any[]) => void): void {
        mp.events.remove(eventName, listener);
    }
}
