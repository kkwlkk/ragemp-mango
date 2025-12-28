export interface InternalWebViewService {
    $onCreate(listener: (id: string | number, webView: BrowserMp) => void): void;
}
