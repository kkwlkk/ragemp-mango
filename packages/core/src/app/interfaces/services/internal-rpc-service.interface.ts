import type { RPCResult, RPCCallOptions, ScriptRPCHandler } from '../../../interfaces';

export interface InternalRPCService {
    $serverHandlers: Map<string, ScriptRPCHandler>;
    $webViewHandlers: Map<string, ScriptRPCHandler>;
    $clientHandlers: Map<string, ScriptRPCHandler>;
    // Client
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
    ): Promise<RPCResult<MangoRPC.CustomServerToClientRPC[E]>>;
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
    ): Promise<RPCResult<MangoRPC.CustomClientToWebviewRPC[E]>>;
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
    // Server
    call<E extends keyof MangoRPC.CustomServerRPC>(
        rpcName: E,
        body?: Parameters<MangoRPC.CustomServerRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<MangoRPC.CustomServerRPC[E]>>>;
    call<E extends string>(
        rpcName: Exclude<E, keyof MangoRPC.CustomServerRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult<unknown>>;
    onRequest<E extends keyof MangoRPC.CustomServerRPC>(
        rpcName: E,
        handler: (body: Parameters<MangoRPC.CustomServerRPC[E]>[0]) => ReturnType<MangoRPC.CustomServerRPC[E]>,
    ): ScriptRPCHandler;
    onRequest<E extends string>(
        rpcName: Exclude<E, keyof MangoRPC.CustomServerRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callPlayer<E extends keyof MangoRPC.CustomServerToClientRPC, U extends PlayerMp>(
        player: U,
        rpcName: E,
        body?: Parameters<MangoRPC.CustomServerToClientRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<MangoRPC.CustomServerToClientRPC[E]>>>;
    callPlayer<E extends string, U extends PlayerMp>(
        player: U,
        rpcName: Exclude<E, keyof MangoRPC.CustomServerToClientRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onPlayerRequest<E extends keyof MangoRPC.CustomClientToServerRPC, U extends PlayerMp>(
        rpcName: E,
        handler: (sender: U, body: Parameters<MangoRPC.CustomClientToServerRPC[E]>[0]) => ReturnType<MangoRPC.CustomClientToServerRPC[E]>,
    ): ScriptRPCHandler;
    onPlayerRequest<E extends string, U extends PlayerMp>(
        rpcName: Exclude<E, keyof MangoRPC.CustomClientToServerRPC>,
        handler: (sender: U, body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callWebView<E extends keyof MangoRPC.CustomServerToWebViewRPC, U extends PlayerMp>(
        player: U,
        id: string | number,
        rpcName: E,
        body?: Parameters<MangoRPC.CustomServerToWebViewRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<MangoRPC.CustomServerToWebViewRPC[E]>>>;
    callWebView<E extends string, U extends PlayerMp>(
        player: U,
        id: string | number,
        rpcName: Exclude<E, keyof MangoRPC.CustomServerToWebViewRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onWebViewRequest<E extends string, U extends PlayerMp>(
        id: string | number,
        rpcName: Exclude<E, keyof MangoRPC.CustomWebViewToServerRPC>,
        handler: (player: U, body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    onWebViewRequest<E extends keyof MangoRPC.CustomWebViewToServerRPC, U extends PlayerMp>(
        id: string | number,
        rpcName: E,
        handler: (
            player: U,
            body: Parameters<MangoRPC.CustomWebViewToServerRPC[E]>[0],
        ) => ReturnType<MangoRPC.CustomWebViewToServerRPC[E]>,
    ): ScriptRPCHandler;
}
