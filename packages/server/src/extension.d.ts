import type { RPCCallOptions, RPCResult } from '@ragemp-mango/core';

// RageMP Mango Framework server type declarations

declare global {
    interface PlayerMp {
        /**
         * Sends a one-way event from server to this client (fire-and-forget).
         * Use this for notifications where you don't need a response.
         * Client listens with: `eventService.onServer(eventName, callback)`
         * @example
         * player.emit("client.auth.loginSuccess", { token: "abc123" });
         */
        emit<E extends keyof MangoEvents.CustomServerToPlayerEvent>(eventName: E, body?: Parameters<MangoEvents.CustomServerToPlayerEvent[E]>[0]): void;
        emit<E extends string>(eventName: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>, body?: unknown): void;

        /**
         * Sends a one-way event from server to a WebView on this client.
         * WebView listens with: `eventService.onServer(eventName, callback)`
         * @example
         * player.emitWebView("main-ui", "ui.notification", { message: "Hello!" });
         */
        emitWebView<E extends keyof MangoEvents.CustomServerToPlayerEvent>(eventName: E | string, body?: unknown): void;
        emitWebView<E extends string>(
            id: string | number,
            eventName: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent> | string,
            body?: unknown,
        ): void;

        /**
         * Calls an RPC on the client and waits for a response.
         * Client handles with: `rpcService.onServerRequest(rpcName, handler)`
         * @returns Promise that resolves with the client's response
         * @example
         * const result = await player.callRpc("getPlayerInventory");
         */
        callRpc<E extends keyof MangoRPC.CustomServerToClientRPC>(
            rpcName: E,
            body?: Parameters<MangoRPC.CustomServerToClientRPC[E]>[0],
            options?: RPCCallOptions,
        ): Promise<RPCResult<ReturnType<MangoRPC.CustomServerToClientRPC[E]>>>;
        callRpc<E extends string>(
            rpcName: Exclude<E, keyof MangoRPC.CustomServerToClientRPC>,
            body?: unknown,
            options?: RPCCallOptions,
        ): Promise<RPCResult>;

        /**
         * Calls an RPC on a WebView and waits for a response.
         * WebView handles with: `rpcService.onServerRequest(rpcName, handler)`
         * @returns Promise that resolves with the WebView's response
         * @example
         * const result = await player.callWebViewRpc("main-ui", "getFormData");
         */
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
