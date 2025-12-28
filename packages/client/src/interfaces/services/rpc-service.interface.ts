import type { RPCCallOptions, RPCResult, ScriptRPCHandler } from '@ragemp-mango/core';

export interface RPCService {
    /**
     * @internal
     */
    readonly $serverHandlers: Map<string, ScriptRPCHandler>;
    /**
     * @internal
     */
    readonly $webViewHandlers: Map<string, ScriptRPCHandler>;

    call<E extends keyof MangoRPC.CustomClientRPC>(
        rpcName: E,
        body?: Parameters<MangoRPC.CustomClientRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<MangoRPC.CustomClientRPC[E]>>>;
    call<E extends string>(
        rpcName: Exclude<E, keyof MangoRPC.CustomClientRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult<unknown>>;
    onRequest<E extends keyof MangoRPC.CustomClientRPC>(
        rpcName: E,
        handler: (body: Parameters<MangoRPC.CustomClientRPC[E]>[0]) => ReturnType<MangoRPC.CustomClientRPC[E]>,
    ): ScriptRPCHandler;
    onRequest<E extends string>(
        rpcName: Exclude<E, keyof MangoRPC.CustomClientRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callServer<E extends keyof MangoRPC.CustomClientToServerRPC>(
        rpcName: E,
        body?: Parameters<MangoRPC.CustomClientToServerRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<MangoRPC.CustomClientToServerRPC[E]>>>;
    callServer<E extends string>(
        rpcName: Exclude<E, keyof MangoRPC.CustomClientToServerRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onServerRequest<E extends keyof MangoRPC.CustomServerToClientRPC>(
        rpcName: E,
        handler: (body: Parameters<MangoRPC.CustomServerToClientRPC[E]>[0]) => ReturnType<MangoRPC.CustomServerToClientRPC[E]>,
    ): ScriptRPCHandler;
    onServerRequest<E extends string>(
        rpcName: Exclude<E, keyof MangoRPC.CustomServerToClientRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callWebView<E extends keyof MangoRPC.CustomClientToWebviewRPC>(
        id: string | number,
        rpcName: E,
        body?: Parameters<MangoRPC.CustomClientToWebviewRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<MangoRPC.CustomClientToWebviewRPC[E]>>>;
    callWebView<E extends string>(
        id: string | number,
        rpcName: Exclude<E, keyof MangoRPC.CustomClientToWebviewRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onWebViewRequest<E extends keyof MangoRPC.CustomWebViewToClientRPC>(
        id: string | number,
        rpcName: E,
        handler: (body: Parameters<MangoRPC.CustomWebViewToClientRPC[E]>[0]) => ReturnType<MangoRPC.CustomWebViewToClientRPC[E]>,
    ): ScriptRPCHandler;
    onWebViewRequest<E extends string>(
        id: string | number,
        rpcName: Exclude<E, keyof MangoRPC.CustomWebViewToClientRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
}
