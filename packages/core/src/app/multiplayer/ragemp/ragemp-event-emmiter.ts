import type { EventEmmiter, ScriptEventHandler } from '../../interfaces';
import { RageMPScriptEvent } from './ragemp-script-event-handler';

export class RageMPEventEmmiter implements EventEmmiter {
    emit(eventName: string, ...args: any[]): void {
        mp.events.call(eventName, ...args);
    }

    on(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        mp.events.add(eventName, listener);
        return new RageMPScriptEvent(eventName, listener);
    }

    once(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        const onceWrapper = (...args: any[]) => {
            mp.events.remove(eventName, onceWrapper);
            listener(...args);
        };
        mp.events.add(eventName, onceWrapper);
        return new RageMPScriptEvent(eventName, onceWrapper);
    }

    off(eventName: string, listener: (...args: any[]) => void): void {
        mp.events.remove(eventName, listener);
    }
}
