import type { ScriptEventHandler } from '@ragemp-mango/core/app';
import type { ClientEventEmmiter } from '../../interfaces/event';
import { RageMPClientScriptEvent } from './ragemp-script-event-handler';

export class ClientRageMPEventEmmiter implements ClientEventEmmiter {
    private mapEventsShared: Record<string, string> = {
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
        const serializedArgs = args.map(arg => JSON.stringify(arg));
        mp.events.callRemote(eventName, ...serializedArgs);
    }

    onServer(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        const mappedEventName = this.getEventName(eventName);
        const wrapper = (...args: any[]) => {
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
            listener(...parsedArgs);
        };
        mp.events.add(mappedEventName, wrapper);
        return new RageMPClientScriptEvent(mappedEventName, wrapper);
    }

    onceServer(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        const mappedEventName = this.getEventName(eventName);
        const onceWrapper = (...args: any[]) => {
            mp.events.remove(mappedEventName, onceWrapper);
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
            listener(...parsedArgs);
        };
        mp.events.add(mappedEventName, onceWrapper);
        return new RageMPClientScriptEvent(mappedEventName, onceWrapper);
    }

    offServer(eventName: string, listener: (...args: any[]) => void): void {
        mp.events.remove(eventName, listener);
    }
}
