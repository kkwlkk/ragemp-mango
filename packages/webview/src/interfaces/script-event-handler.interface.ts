export interface ScriptEventHandler {
    destroy(): void;
    readonly valid: boolean;
    readonly handler: (...args: unknown[]) => void | Promise<void>;
    readonly local: boolean;
    readonly remote: boolean;
    readonly onlyOnce: boolean;
    readonly eventName?: string;
}
