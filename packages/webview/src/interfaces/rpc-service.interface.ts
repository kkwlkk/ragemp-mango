import type { RPCCallOptions, RPCResult, ScriptRPCHandler } from '@ragemp-mango/core/interfaces';

export interface RPCService {
    call<E extends keyof MangoRPC.CustomWebViewRPC>(
        rpcName: E,
        body?: Parameters<MangoRPC.CustomWebViewRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<MangoRPC.CustomWebViewRPC[E]>>>;
    call<E extends string>(
        rpcName: Exclude<E, keyof MangoRPC.CustomWebViewRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onRequest<E extends keyof MangoRPC.CustomWebViewRPC>(
        rpcName: E,
        handler: (body: Parameters<MangoRPC.CustomWebViewRPC[E]>[0]) => ReturnType<MangoRPC.CustomWebViewRPC[E]>,
    ): ScriptRPCHandler;
    onRequest<E extends string>(
        rpcName: Exclude<E, keyof MangoRPC.CustomWebViewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callServer<E extends keyof MangoRPC.CustomWebViewToServerRPC>(
        rpcName: E,
        body?: Parameters<MangoRPC.CustomWebViewToServerRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<MangoRPC.CustomWebViewToServerRPC[E]>>>;
    callServer<E extends string>(
        rpcName: Exclude<E, keyof MangoRPC.CustomWebViewToServerRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onServerRequest<E extends keyof MangoRPC.CustomServerToWebViewRPC>(
        rpcName: E,
        handler: (body: Parameters<MangoRPC.CustomServerToWebViewRPC[E]>[0]) => ReturnType<MangoRPC.CustomServerToWebViewRPC[E]>,
    ): ScriptRPCHandler;
    onServerRequest<E extends string>(
        rpcName: Exclude<E, keyof MangoRPC.CustomServerToWebViewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callPlayer<E extends keyof MangoRPC.CustomWebViewToClientRPC>(
        rpcName: E,
        body?: Parameters<MangoRPC.CustomWebViewToClientRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<MangoRPC.CustomWebViewToClientRPC[E]>>>;
    callPlayer<E extends string>(
        rpcName: Exclude<E, keyof MangoRPC.CustomWebViewToClientRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onPlayerRequest<E extends keyof MangoRPC.CustomClientToWebviewRPC>(
        rpcName: E,
        handler: (body: Parameters<MangoRPC.CustomClientToWebviewRPC[E]>[0]) => ReturnType<MangoRPC.CustomClientToWebviewRPC[E]>,
    ): ScriptRPCHandler;
    onPlayerRequest<E extends string>(
        rpcName: Exclude<E, keyof MangoRPC.CustomClientToWebviewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
}
