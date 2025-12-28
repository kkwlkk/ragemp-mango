import type {
    MultiplayerWebView,
    MultiplayerWebViewCreateOptionsDrawable,
    MultiplayerWebViewCreateOptionsOverlay,
    MultiplayerWebViewManager,
} from '../../interfaces/multiplayer';
import { RageMPWebView } from './ragemp-webview';

export class RageMPWebViewManager implements MultiplayerWebViewManager {
    private webViews: Map<number, RageMPWebView> = new Map();
    private idCounter: number = 0;

    public create(options: MultiplayerWebViewCreateOptionsDrawable): MultiplayerWebView;
    public create(options: MultiplayerWebViewCreateOptionsOverlay): MultiplayerWebView;
    public create(options: MultiplayerWebViewCreateOptionsOverlay | MultiplayerWebViewCreateOptionsDrawable): MultiplayerWebView {
        let raw: BrowserMp;

        if ('drawable' in options) {
            // RageMP doesn't support drawable/texture targets directly like alt:V
            // We'll create a regular browser and log a warning
            mp.console.logWarning('RageMP does not support drawable WebViews. Creating overlay browser instead.');
            raw = mp.browsers.new(options.url);
        } else {
            raw = mp.browsers.new(options.url);
            if (options.visible !== undefined) {
                raw.active = options.visible;
            }
        }

        const webView = new RageMPWebView(raw);
        const id = this.idCounter++;
        this.webViews.set(id, webView);

        return webView;
    }

    public getByID(id: number): MultiplayerWebView | null {
        // RageMP browsers are stored in mp.browsers pool
        // We need to find by ID or return from our cache
        const cached = this.webViews.get(id);
        if (cached) {
            return cached;
        }

        // Try to get from RageMP's browser pool
        const browser = mp.browsers.at(id);
        if (browser) {
            const webView = new RageMPWebView(browser);
            this.webViews.set(id, webView);
            return webView;
        }

        return null;
    }
}
