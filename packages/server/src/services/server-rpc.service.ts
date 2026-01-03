import { inject, injectable } from 'inversify';
import {
    BaseRPCService,
    EventDestination,
    type RPCPayload,
    RPC_RESULT_TIMEOUT,
    RPC_RESULT_PLAYER_DISCONNECTED,
    RPC_RESULT_PLAYER_NOT_FOUND,
} from '@ragemp-mango/core/app';
import {
    EVENT_SERVICE,
    ErrorMessage,
    type RPCCallOptions,
    type RPCResult,
    type ScriptRPCHandler,
    generateRandomId,
} from '@ragemp-mango/core';
import type { MultiplayerPlayer, RPCService } from '../interfaces';
import type { ServerEventService } from './server-event.service';

@injectable()
export class ServerRPCService extends BaseRPCService<MangoRPC.CustomServerRPC> implements RPCService {
    @inject(EVENT_SERVICE) private readonly $eventService: ServerEventService;
    public readonly $clientHandlers = new Map<string, ScriptRPCHandler>();
    public readonly $webViewHandlers = new Map<string, ScriptRPCHandler>();

    public async callPlayer<E extends string, U extends PlayerMp & MultiplayerPlayer>(
        player: U,
        rpcName: Exclude<E, keyof MangoRPC.CustomServerToClientRPC>,
        body?: unknown,
        options: RPCCallOptions = { timeout: this.$TIMEOUT },
    ) {
        return this.$handleCall(player, rpcName, EventDestination.Client, options, body);
    }

    public onPlayerRequest<E extends string, U extends MultiplayerPlayer>(
        rpcName: Exclude<E, keyof MangoRPC.CustomClientToServerRPC>,
        handler: (sender: U, body: unknown) => unknown | Promise<unknown>,
    ) {
        if (this.$clientHandlers.has(rpcName)) {
            this.$loggerService.error('An error occurred while trying to register RPC.');
            throw new Error(ErrorMessage.RPCHandlerAlreadyExists);
        }

        const rpcHandler: ScriptRPCHandler = {
            destroy: () => {
                // @ts-ignore
                rpcHandler.valid = false;
                this.$clientHandlers.delete(rpcName);
            },
            rpcName,
            handler,
            valid: true,
        };

        this.$clientHandlers.set(rpcName, rpcHandler);

        return rpcHandler;
    }

    public async callWebView<E extends string, U extends PlayerMp & MultiplayerPlayer>(
        player: U,
        id: string | number,
        rpcName: Exclude<E, keyof MangoRPC.CustomServerToWebViewRPC>,
        body?: unknown,
        options: RPCCallOptions = { timeout: this.$TIMEOUT },
    ) {
        return this.$handleCall(player, rpcName, EventDestination.WebView, options, body, id);
    }

    public onWebViewRequest<E extends keyof MangoRPC.CustomWebViewToServerRPC, U extends MultiplayerPlayer>(
        id: string | number,
        rpcName: Exclude<E, keyof MangoRPC.CustomWebViewToServerRPC>,
        handler: (
            player: U,
            body: Parameters<MangoRPC.CustomWebViewToServerRPC[E]>[0],
        ) => ReturnType<MangoRPC.CustomWebViewToServerRPC[E]>,
    ) {
        const key = `${id}::${rpcName}`;
        if (this.$webViewHandlers.has(key)) {
            this.$loggerService.error('An error occurred while trying to register RPC.');
            throw new Error(ErrorMessage.RPCHandlerAlreadyExists);
        }

        const rpcHandler: ScriptRPCHandler = {
            destroy: () => {
                // @ts-ignore
                rpcHandler.valid = false;
                this.$webViewHandlers.delete(key);
            },
            rpcName,
            handler,
            valid: true,
        };

        this.$webViewHandlers.set(key, rpcHandler);

        return rpcHandler;
    }

    private async $handleCall<TResult>(
        player: PlayerMp & MultiplayerPlayer,
        rpcName: string,
        destination: EventDestination, // 'client' | 'webview',
        options?: Partial<RPCCallOptions>,
        body?: unknown,
        webViewId?: string | number,
    ) {
        return new Promise<RPCResult<TResult>>((resolve) => {
            if (!player.valid) {
                resolve(<RPCResult<TResult>>RPC_RESULT_PLAYER_NOT_FOUND);
                return;
            }

            const callId = generateRandomId();
            let timeoutId: NodeJS.Timeout;

            const disconnectHandler = this.$eventService.onPlayerDisconnect((context) => {
                if (context.player === player) {
                    clearTimeout(timeoutId);
                    disconnectHandler.destroy();
                    resolve(<RPCResult<TResult>>RPC_RESULT_PLAYER_DISCONNECTED);
                }
            });

            const onceHandle = (_player: PlayerMp, body: unknown) => {
                clearTimeout(timeoutId);
                disconnectHandler.destroy();
                resolve(<RPCResult<TResult>>body);
            };
            // Example: RPC::RETURN_FROM_SERVER_21ewrEq, RPC::RETURN_FROM_WEBVIEW_teEqd2
            const eventHandler =
                destination === EventDestination.WebView
                    ? this.$eventService.onceWebView(webViewId!, `RPC::RETURN_FROM_WEBVIEW_${callId}`, onceHandle)
                    : this.$eventService.oncePlayer(`RPC::RETURN_FROM_CLIENT_${callId}`, onceHandle);

            const payload: RPCPayload = {
                source: EventDestination.Server,
                destination,
                id: callId,
                rpcName,
                body,
            };
            // Example: RPC::CALL_SERVER, RPC::CALL_WEBVIEW
            destination === EventDestination.WebView
                ? player.emitWebView(webViewId!, 'RPC::CALL_WEBVIEW', payload)
                : player.emit('RPC::CALL_CLIENT', payload);

            timeoutId = setTimeout(() => {
                eventHandler.destroy();
                resolve(<RPCResult<TResult>>RPC_RESULT_TIMEOUT);
            }, options?.timeout ?? this.$TIMEOUT);
        });
    }
}
