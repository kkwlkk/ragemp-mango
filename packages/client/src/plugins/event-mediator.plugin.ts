import { inject, injectable } from 'inversify';
import type { MangoPlugin } from '@ragemp-mango/core/app';
import { EVENT_SERVICE, LOGGER_SERVICE, type LoggerService } from '@ragemp-mango/core';
import { WEBVIEW_SERVICE } from '../constants';
import type { EventService } from '../interfaces';
import type { ClientWebViewService } from '../services';

@injectable()
export class EventMediatorPlugin implements MangoPlugin {
    @inject(EVENT_SERVICE) private readonly eventService: EventService;
    @inject(WEBVIEW_SERVICE) private readonly webViewService: ClientWebViewService;
    @inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    public beforeLoad() {
        const time = Date.now();

        this.eventService.onServer('SERVER::EMIT_WEBVIEW', (body) => {
            const webView = this.webViewService.get(body.id);
            if (webView) {
                webView.emit(body.eventName, body.payload);
            } else {
                mp.console.logWarning(`[EventMediator] WebView ${body.id} not found!`);
            }
        });

        this.webViewService.$onCreate((id, webView) => {
            webView.on('WEBVIEW::EMIT_SERVER', (...args: unknown[]) => {
                const data = args[0] as string;
                const body = JSON.parse(data) as { eventName: string; payload: unknown };
                this.eventService.emitServer(`SERVER::ON_WEBVIEW_${body.eventName}_${id}`, body.payload);
            });
        });

        this.loggerService.log(`~lw~Event mediator methods defined ~lk~(${Date.now() - time}ms)`);
    }
}
