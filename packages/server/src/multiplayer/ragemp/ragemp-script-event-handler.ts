import type { ScriptEventHandler } from '@ragemp-mango/core/app';

export class RageMPServerScriptEvent implements ScriptEventHandler {
    constructor(
        private eventName: string,
        private listener: (...args: any[]) => void,
    ) {}

    destroy(): void {
        mp.events.remove(this.eventName, this.listener);
    }
}
