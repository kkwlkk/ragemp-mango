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

        // Save reference to native call before we override it
        const nativeCall = Player.prototype.call;

        // Simple event emission to client (uses native call)
        Player.prototype.emit = function (eventName: string, body?: unknown) {
            nativeCall.call(this, eventName, [JSON.stringify(body)]);
        };

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

        // RPC call (expects response from client)
        Player.prototype.call = function (rpcName: string, body?: unknown, options?: RPCCallOptions) {
            return rpcService.callPlayer(this, rpcName, body, options);
        };

        Player.prototype.callWebView = function (id: string | number, rpcName: string, body?: unknown, options?: RPCCallOptions) {
            return rpcService.callWebView(this, id, rpcName, body, options);
        };

        this.loggerService.log(`~lw~Player prototype methods defined ~lk~(${Date.now() - time}ms)`);
    }
}
