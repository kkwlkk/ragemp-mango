import type { ClientEventEmmiter } from '../../interfaces';
import type { ClientMultiplayerService, MultiplayerWebViewManager } from '../../interfaces/multiplayer';
import { RageMPMultiplayerService } from '@ragemp-mango/core/app';
import { ClientRageMPEventEmmiter } from './ragemp-event-emmiter';
import { RageMPWebViewManager } from './ragemp-webview-manager';

export class ClientRageMPMultiplayerService extends RageMPMultiplayerService implements ClientMultiplayerService {
    public override Events: ClientEventEmmiter;
    public WebView: MultiplayerWebViewManager;

    constructor() {
        super();
        this.Events = new ClientRageMPEventEmmiter();
        this.WebView = new RageMPWebViewManager();
    }

    public setAudioFactory(_factory: any): void {
        // RageMP doesn't have audio factory like alt:V
    }

    public setAudioFilterFactory(_factory: any): void {
        // RageMP doesn't have audio filter factory
    }

    public setAudioOutputAttachedFactory(_factory: any): void {
        // RageMP doesn't have audio output attached factory
    }

    public setAudioOutputFrontendFactory(_factory: any): void {
        // RageMP doesn't have audio output frontend factory
    }

    public setAudioOutputWorldFactory(_factory: any): void {
        // RageMP doesn't have audio output world factory
    }

    public setBlipFactory(factory: any): void {
        if (factory && (mp as any).Blip) {
            Object.assign((mp as any).Blip.prototype, factory);
        }
    }

    public setMarkerFactory(factory: any): void {
        if (factory && (mp as any).Marker) {
            Object.assign((mp as any).Marker.prototype, factory);
        }
    }

    public setColshapeFactory(factory: any): void {
        if (factory && (mp as any).Colshape) {
            Object.assign((mp as any).Colshape.prototype, factory);
        }
    }

    public setCheckpointFactory(factory: any): void {
        if (factory && (mp as any).Checkpoint) {
            Object.assign((mp as any).Checkpoint.prototype, factory);
        }
    }

    public setObjectFactory(factory: any): void {
        if (factory && (mp as any).Object) {
            Object.assign((mp as any).Object.prototype, factory);
        }
    }

    public setLocalObjectFactory(_factory: any): void {
        // RageMP doesn't have LocalObject like alt:V
    }

    public setPedFactory(factory: any): void {
        if (factory && (mp as any).Ped) {
            Object.assign((mp as any).Ped.prototype, factory);
        }
    }

    public setLocalPedFactory(_factory: any): void {
        // RageMP doesn't have LocalPed like alt:V
    }

    public setLocalPlayerFactory(_factory: any): void {
        // RageMP doesn't have LocalPlayer factory - use mp.players.local
    }

    public setLocalVehicleFactory(_factory: any): void {
        // RageMP doesn't have LocalVehicle like alt:V
    }

    public setPlayerFactory(factory: any): void {
        if (factory && (mp as any).Player) {
            Object.assign((mp as any).Player.prototype, factory);
        }
    }

    public setRmlDocumentFactory(_factory: any): void {
        // RageMP doesn't have RmlDocument like alt:V
    }

    public setTextLabelFactory(factory: any): void {
        if (factory && (mp as any).TextLabel) {
            Object.assign((mp as any).TextLabel.prototype, factory);
        }
    }

    public setVehicleFactory(factory: any): void {
        if (factory && (mp as any).Vehicle) {
            Object.assign((mp as any).Vehicle.prototype, factory);
        }
    }

    public setVirtualEntityGroupFactory(_factory: any): void {
        // RageMP doesn't have VirtualEntityGroup
    }

    public setVirtualEntityFactory(_factory: any): void {
        // RageMP doesn't have VirtualEntity
    }

    public setWebSocketClientFactory(_factory: any): void {
        // RageMP doesn't have WebSocketClient factory
    }

    public setWebViewFactory(factory: any): void {
        if (factory && (mp as any).Browser) {
            Object.assign((mp as any).Browser.prototype, factory);
        }
    }
}
