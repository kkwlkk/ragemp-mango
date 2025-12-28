import type { ScriptEventHandler } from '@ragemp-mango/core/app';
import type { ClientEventEmmiter } from '../../interfaces/event';
import { RageMPClientScriptEvent } from './ragemp-script-event-handler';

export class ClientRageMPEventEmmiter implements ClientEventEmmiter {
    private mapEventsShared: Record<string, string> = {
        // Map alt:V event names to RageMP equivalents
        'entityColShapeEnter': 'playerEnterColshape',
        'entityColShapeLeave': 'playerExitColshape',
        'keyUp': 'keyup',
        'keyDown': 'keydown',
        'playerVehicleEntered': 'playerEnterVehicle',
        'playerVehicleLeft': 'playerLeaveVehicle',
        'playerStartVehicleEnter': 'playerStartEnterVehicle',
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
        return new RageMPClientScriptEvent(mappedEventName, listener);
    }

    once(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        const mappedEventName = this.getEventName(eventName);
        const onceWrapper = (...args: any[]) => {
            mp.events.remove(mappedEventName, onceWrapper);
            listener(...args);
        };
        mp.events.add(mappedEventName, onceWrapper);
        return new RageMPClientScriptEvent(mappedEventName, onceWrapper);
    }

    off(eventName: string, listener: (...args: any[]) => void): void {
        mp.events.remove(eventName, listener);
    }

    emitServer(eventName: string, ...args: any[]): void {
        // In RageMP, use mp.events.callRemote to send events to server
        mp.events.callRemote(eventName, ...args);
    }

    onServer(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        // In RageMP, server events come through mp.events.add
        // Events from server are received the same way as local events
        const mappedEventName = this.getEventName(eventName);
        mp.events.add(mappedEventName, listener);
        return new RageMPClientScriptEvent(mappedEventName, listener);
    }

    onceServer(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        const mappedEventName = this.getEventName(eventName);
        const onceWrapper = (...args: any[]) => {
            mp.events.remove(mappedEventName, onceWrapper);
            listener(...args);
        };
        mp.events.add(mappedEventName, onceWrapper);
        return new RageMPClientScriptEvent(mappedEventName, onceWrapper);
    }

    offServer(eventName: string, listener: (...args: any[]) => void): void {
        mp.events.remove(eventName, listener);
    }
}
