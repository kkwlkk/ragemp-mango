import { Container, inject, injectable } from 'inversify';
import type { RPCService, ServerMultiplayerService } from '../interfaces';
import { LOGGER_SERVICE, RPC_SERVICE, type LoggerService, type RPCCallOptions } from '@ragemp-mango/core';
import { GLOBAL_APP_CONTAINER, MULTIPLAYER_SERVICE, type MangoPlugin } from '@ragemp-mango/core/app';

@injectable()
export class PlayerPrototypePlugin implements MangoPlugin {
    @inject(GLOBAL_APP_CONTAINER) private readonly globalAppContainer: Container;
    @inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
    @inject(MULTIPLAYER_SERVICE) private readonly multiplayerService: ServerMultiplayerService;

    public beforeLoad() {
        const time = Date.now();
        const Player = this.multiplayerService.getPlayer();

        // Save reference to native player.call() for safety (in case it gets overridden elsewhere).
        const nativeCall = Player.prototype.call;

        /**
         * player.emit() - One-way event from server to client (fire-and-forget).
         * Wrapper around native player.call() with automatic JSON serialization.
         * Client listens with: eventService.onServer(eventName, callback)
         */
        Player.prototype.emit = function (eventName: string, body?: unknown) {
            nativeCall.call(this, eventName, [JSON.stringify(body)]);
        };

        /**
         * player.emitWebView() - One-way event from server to a WebView on the client.
         * Routed through the client's event mediator to the target WebView.
         * WebView listens with: eventService.onServer(eventName, callback)
         */
        Player.prototype.emitWebView = function (id: string | number, eventName: string, body?: unknown) {
            this.callUnreliable('SERVER::EMIT_WEBVIEW', [
                JSON.stringify({
                    id,
                    eventName,
                    payload: body,
                }),
            ]);
        };

        const rpcService = this.globalAppContainer.get<RPCService>(RPC_SERVICE);

        /**
         * player.callRpc() - RPC call to client that expects a response.
         * Client handles with: rpcService.onServerRequest(rpcName, handler)
         * @returns Promise<RPCResult> - resolves with the client's response
         */
        Player.prototype.callRpc = function (rpcName: string, body?: unknown, options?: RPCCallOptions) {
            return rpcService.callPlayer(this, rpcName, body, options);
        };

        /**
         * player.callWebViewRpc() - RPC call to a WebView that expects a response.
         * WebView handles with: rpcService.onServerRequest(rpcName, handler)
         * @returns Promise<RPCResult> - resolves with the WebView's response
         */
        Player.prototype.callWebViewRpc = function (id: string | number, rpcName: string, body?: unknown, options?: RPCCallOptions) {
            return rpcService.callWebView(this, id, rpcName, body, options);
        };

        this.loggerService.log(`~lw~Player prototype methods defined ~lk~(${Date.now() - time}ms)`);
    }
}
