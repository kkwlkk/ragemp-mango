import type { EventEmmiter, ScriptEventHandler } from '../../interfaces';
import { RageMPScriptEvent } from './ragemp-script-event-handler';

export class RageMPEventEmmiter implements EventEmmiter {
    private mapEventsShared: Record<string, string> = {
        // Map alt:V event names to RageMP equivalents
        'entityColShapeEnter': 'playerEnterColshape',
        'entityColShapeLeave': 'playerExitColshape',
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
        return new RageMPScriptEvent(mappedEventName, listener);
    }

    once(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        const mappedEventName = this.getEventName(eventName);
        const onceWrapper = (...args: any[]) => {
            mp.events.remove(mappedEventName, onceWrapper);
            listener(...args);
        };
        mp.events.add(mappedEventName, onceWrapper);
        return new RageMPScriptEvent(mappedEventName, onceWrapper);
    }

    off(eventName: string, listener: (...args: any[]) => void): void {
        mp.events.remove(eventName, listener);
    }
}
