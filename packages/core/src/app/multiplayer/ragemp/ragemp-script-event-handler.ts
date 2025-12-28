import type { ScriptEventHandler } from '../../interfaces';

export class RageMPScriptEvent implements ScriptEventHandler {
    constructor(
        private eventName: string,
        private listener: (...args: any[]) => void,
    ) {}

    destroy(): void {
        mp.events.remove(this.eventName, this.listener);
    }
}
