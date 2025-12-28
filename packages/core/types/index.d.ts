import type { RPCPayload } from '../src/app';

// RageMP Mango Framework type declarations

declare global {
    // Namespace for custom event declarations
    namespace MangoEvents {
        // Client-side events
        interface CustomClientEvent {}

        // Server-side events
        interface CustomServerEvent {}

        // WebView events
        interface CustomWebViewEvent {}

        // Player to Server events
        interface CustomPlayerToServerEvent {
            'RPC::CALL_SERVER': (body: RPCPayload) => Promise<void>;
        }

        // Server to Player events
        interface CustomServerToPlayerEvent {
            'SERVER::EMIT_WEBVIEW': (body: { payload: unknown; id: string | number; eventName: string }) => void;
            'RPC::CALL_CLIENT': (body: RPCPayload) => Promise<void>;
        }

        // WebView to Client events
        interface CustomWebViewToClientEvent {
            'RPC::CALL_CLIENT': (body: RPCPayload) => Promise<void>;
            'RPC::CALL_SERVER': (body: RPCPayload) => void;
            'WEBVIEW::EMIT_SERVER': (body: { eventName: string; payload: Record<string, unknown> }) => void;
        }

        // Client to WebView events
        interface CustomClientToWebViewEvent {
            'RPC::CALL_WEBVIEW': (body: RPCPayload) => Promise<void>;
        }

        // WebView to Server events
        interface CustomWebViewToServerEvent {}

        // Server to WebView events
        interface CustomServerToWebViewEvent {
            'RPC::CALL_WEBVIEW': (body: RPCPayload) => Promise<void>;
        }

        // WebView to WebView events
        interface CustomWebViewToWebViewEvent {}
    }

    // Namespace for custom RPC declarations
    namespace MangoRPC {
        // Client RPCs
        interface CustomClientRPC {}

        // Server RPCs
        interface CustomServerRPC {}

        // WebView RPCs
        interface CustomWebViewRPC {}

        // Client to Server RPCs
        interface CustomClientToServerRPC {}

        // Server to Client RPCs
        interface CustomServerToClientRPC {}

        // Client to WebView RPCs
        interface CustomClientToWebviewRPC {}

        // WebView to Client RPCs
        interface CustomWebViewToClientRPC {}

        // Server to WebView RPCs
        interface CustomServerToWebViewRPC {}

        // WebView to Server RPCs
        interface CustomWebViewToServerRPC {}
    }
}

export {};
