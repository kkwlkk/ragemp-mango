import type { RPCCallOptions, RPCResult } from '@ragemp-mango/core';

// RageMP Mango Framework server type declarations

declare global {
    interface PlayerMp {
        emitWebView<E extends keyof MangoEvents.CustomServerToPlayerEvent>(eventName: E | string, body?: unknown): void;
        emitWebView<E extends string>(
            id: string | number,
            eventName: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent> | string,
            body?: unknown,
        ): void;
        callRpc<E extends keyof MangoRPC.CustomServerToPlayerRpcEvent>(eventName: E, body?: unknown): void;
        callRpc<E extends string>(
            rpcName: Exclude<E, keyof MangoRPC.CustomServerToPlayerRpcEvent>,
            body?: unknown,
            options?: RPCCallOptions,
        ): Promise<RPCResult>;
        callWebViewRpc<E extends keyof MangoRPC.CustomServerToWebViewRPC>(
            id: string | number,
            rpcName: E,
            body?: unknown,
            options?: RPCCallOptions,
        ): Promise<RPCResult>;
        callWebViewRpc<E extends string>(
            id: string | number,
            rpcName: Exclude<E, keyof MangoRPC.CustomServerToWebViewRPC>,
            body?: unknown,
            options?: RPCCallOptions,
        ): Promise<RPCResult>;
    }

    namespace MangoRPC {
        interface CustomServerToPlayerRpcEvent {}
    }
}

export {};
