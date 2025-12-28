import { BaseEventService, MULTIPLAYER_SERVICE, type ScriptEventHandler } from '@ragemp-mango/core/app';
import { inject, injectable } from 'inversify';
import { INTERNAL_EVENTS, WEBVIEW_LIST_SERVICE } from '../constants';
import type { WebViewListService } from './webview-list.service';
import type { ClientEventEmmiter, EventService } from '../interfaces';
import type { ClientMultiplayerService } from '../interfaces/multiplayer';

@injectable()
export class ClientEventService extends BaseEventService<MangoEvents.CustomClientEvent> implements EventService {
    @inject(WEBVIEW_LIST_SERVICE) private readonly $webViewListService: WebViewListService;
    private $rageEvents: ClientEventEmmiter;

    public constructor(@inject(MULTIPLAYER_SERVICE) multiplayerService: ClientMultiplayerService) {
        super(multiplayerService.Events);
        this.$rageEvents = multiplayerService.Events;
        this.$internalEventNames = new Set(Object.values(INTERNAL_EVENTS));
    }

    public onServer<E extends string>(
        eventName: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const wrapper = (...args: unknown[]) => callback(args[0]);
        const eventHandler = this.$rageEvents.onServer(eventName, wrapper);
        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public onceServer<E extends string>(
        eventName: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const wrapper = (...args: unknown[]) => callback(args[0]);
        const eventHandler = this.$rageEvents.onceServer(eventName, wrapper);
        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public emitServer<E extends string>(eventName: Exclude<E, keyof MangoEvents.CustomPlayerToServerEvent>, body?: unknown) {
        this.$rageEvents.emitServer(eventName, body);
    }

    public onWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof MangoEvents.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const webView = this.$webViewListService.tryGet(id);
        const wrapper = (...args: unknown[]) => callback(args[0]);

        const eventHandler: ScriptEventHandler = {
            destroy() {
                webView.off(eventName, wrapper);
            },
        };

        webView.on(eventName, wrapper);

        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public onceWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof MangoEvents.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const webView = this.$webViewListService.tryGet(id);
        const wrapper = (...args: any[]) => callback(args[0]);

        const eventHandler: ScriptEventHandler = {
            destroy() {
                webView.off(eventName, wrapper);
            },
        };

        webView.once(eventName, wrapper);

        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public emitWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof MangoEvents.CustomClientToWebViewEvent>,
        body?: unknown,
    ) {
        const webView = this.$webViewListService.tryGet(id);
        webView.emit(eventName, body);
    }

    // RageMP client-specific events
    public onRender(callback: () => void): ScriptEventHandler {
        return this.$rageEvents.on('render', callback);
    }

    public onBrowserDomReady(callback: (browser: BrowserMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('browserDomReady', callback);
    }

    public onBrowserLoadingFailed(callback: (browser: BrowserMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('browserLoadingFailed', callback);
    }

    public onPlayerChat(callback: (text: string) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerChat', callback);
    }

    public onPlayerCommand(callback: (command: string) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerCommand', callback);
    }

    public onPlayerDeath(callback: (killer?: PlayerMp, reason?: number) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerDeath', callback);
    }

    public onPlayerSpawn(callback: () => void): ScriptEventHandler {
        return this.$rageEvents.on('playerSpawn', callback);
    }

    public onPlayerEnterVehicle(callback: (vehicle: VehicleMp, seat: number) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerEnterVehicle', callback);
    }

    public onPlayerExitVehicle(callback: (vehicle: VehicleMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerExitVehicle', callback);
    }

    public onPlayerEnterColshape(callback: (colshape: ColshapeMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerEnterColshape', callback);
    }

    public onPlayerExitColshape(callback: (colshape: ColshapeMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerExitColshape', callback);
    }

    public onPlayerEnterCheckpoint(callback: (checkpoint: CheckpointMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerEnterCheckpoint', callback);
    }

    public onPlayerExitCheckpoint(callback: (checkpoint: CheckpointMp) => void): ScriptEventHandler {
        return this.$rageEvents.on('playerExitCheckpoint', callback);
    }
}
