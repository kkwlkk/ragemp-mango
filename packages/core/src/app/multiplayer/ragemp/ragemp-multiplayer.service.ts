import type { EventEmmiter, MultiplayerService, MultiplayerTimers } from '../../interfaces';
import { RageMPEventEmmiter } from './ragemp-event-emmiter';
import { RageMPTimers } from './ragemp-timers';
import { isObject } from '../../../utils';

export class RageMPMultiplayerService implements MultiplayerService {
    readonly Timers: MultiplayerTimers;
    readonly Events: EventEmmiter;

    constructor() {
        this.Events = new RageMPEventEmmiter();
        this.Timers = new RageMPTimers();
    }

    parseInternalArgs<U = unknown, T = unknown>(
        ...args: any
    ): {
        player?: U;
        body?: T;
    } {
        const player = (isObject(args[0]) ? args[0] : undefined) as U;

        return {
            player,
            body: args,
        };
    }

    log(arg: any, ...args: any[]): void {
        const message = [arg, ...args].map(a =>
            typeof a === 'object' ? JSON.stringify(a) : String(a)
        ).join(' ');
        mp.console.logInfo(message);
    }

    logError(arg: any, ...args: any[]): void {
        const message = [arg, ...args].map(a =>
            typeof a === 'object' ? JSON.stringify(a) : String(a)
        ).join(' ');
        mp.console.logError(message);
    }

    logWarning(arg: any, ...args: any[]): void {
        const message = [arg, ...args].map(a =>
            typeof a === 'object' ? JSON.stringify(a) : String(a)
        ).join(' ');
        mp.console.logWarning(message);
    }

    logDebug(arg: any, ...args: any[]): void {
        // RageMP doesn't have a dedicated debug log, use info
        const message = [arg, ...args].map(a =>
            typeof a === 'object' ? JSON.stringify(a) : String(a)
        ).join(' ');
        mp.console.logInfo(`[DEBUG] ${message}`);
    }
}
