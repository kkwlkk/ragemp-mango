import type { RPCCallOptions, RPCResult, ScriptRPCHandler } from '@ragemp-mango/core';
import type { MultiplayerPlayer } from '../multiplayer';

export interface RPCService {
    /**
     * @internal
     */
    readonly $clientHandlers: Map<string, ScriptRPCHandler>;
    /**
     * @internal
     */
    readonly $webViewHandlers: Map<string, ScriptRPCHandler>;

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
    callPlayer<E extends keyof MangoRPC.CustomServerToClientRPC, U extends MultiplayerPlayer>(
        player: U,
        rpcName: E,
        body?: Parameters<MangoRPC.CustomServerToClientRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<MangoRPC.CustomServerToClientRPC[E]>>>;
    callPlayer<E extends string, U extends MultiplayerPlayer>(
        player: U,
        rpcName: Exclude<E, keyof MangoRPC.CustomServerToClientRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onPlayerRequest<E extends keyof MangoRPC.CustomClientToServerRPC, U extends MultiplayerPlayer>(
        rpcName: E,
        handler: (sender: U, body: Parameters<MangoRPC.CustomClientToServerRPC[E]>[0]) => ReturnType<MangoRPC.CustomClientToServerRPC[E]>,
    ): ScriptRPCHandler;
    onPlayerRequest<E extends string, U extends MultiplayerPlayer>(
        rpcName: Exclude<E, keyof MangoRPC.CustomClientToServerRPC>,
        handler: (sender: U, body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callWebView<E extends keyof MangoRPC.CustomServerToWebViewRPC, U extends MultiplayerPlayer>(
        player: U,
        id: string | number,
        rpcName: E,
        body?: Parameters<MangoRPC.CustomServerToWebViewRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<MangoRPC.CustomServerToWebViewRPC[E]>>>;
    callWebView<E extends string, U extends MultiplayerPlayer>(
        player: U,
        id: string | number,
        rpcName: Exclude<E, keyof MangoRPC.CustomServerToWebViewRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onWebViewRequest<E extends string, U extends MultiplayerPlayer>(
        id: string | number,
        rpcName: Exclude<E, keyof MangoRPC.CustomWebViewToServerRPC>,
        handler: (player: U, body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    onWebViewRequest<E extends keyof MangoRPC.CustomWebViewToServerRPC, U extends MultiplayerPlayer>(
        id: string | number,
        rpcName: E,
        handler: (
            player: U,
            body: Parameters<MangoRPC.CustomWebViewToServerRPC[E]>[0],
        ) => ReturnType<MangoRPC.CustomWebViewToServerRPC[E]>,
    ): ScriptRPCHandler;
}
