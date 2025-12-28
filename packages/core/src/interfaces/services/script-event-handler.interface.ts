/**
 * Represents a script event handler that can be destroyed
 */
export interface ScriptEventHandler {
    /**
     * Destroy the event handler, removing it from the event system
     */
    destroy(): void;

    /**
     * Whether the handler is still valid/active
     */
    readonly valid?: boolean;
}

/**
 * Represents an internal event handler
 */
export interface EventHandler {
    /**
     * Destroy the event handler
     */
    destroy(): void;
}
