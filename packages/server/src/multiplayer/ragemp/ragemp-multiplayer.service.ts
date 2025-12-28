import type { ServerEventEmmiter, ServerMultiplayerService } from '../../interfaces';
import { RageMPMultiplayerService } from '@ragemp-mango/core/app';
import { ServerRageMPEventEmmiter } from './ragemp-event-emmiter';

export class ServerRageMPMultiplayerService extends RageMPMultiplayerService implements ServerMultiplayerService {
    public override Events: ServerEventEmmiter;

    constructor() {
        super();
        this.Events = new ServerRageMPEventEmmiter();
    }

    public getPlayer() {
        // Return the mp.Player constructor for factory purposes
        return (mp as any).Player;
    }

    public setBlipFactory(factory: any): void {
        // RageMP doesn't have factory pattern like alt:V
        // We can extend the prototype instead
        if (factory && (mp as any).Blip) {
            Object.assign((mp as any).Blip.prototype, factory);
        }
    }

    public setMarkerFactory(factory: any): void {
        if (factory && (mp as any).Marker) {
            Object.assign((mp as any).Marker.prototype, factory);
        }
    }

    public setColShapeFactory(factory: any): void {
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

    public setPedFactory(factory: any): void {
        if (factory && (mp as any).Ped) {
            Object.assign((mp as any).Ped.prototype, factory);
        }
    }

    public setPlayerFactory(factory: any): void {
        if (factory && (mp as any).Player) {
            Object.assign((mp as any).Player.prototype, factory);
        }
    }

    public setVehicleFactory(factory: any): void {
        if (factory && (mp as any).Vehicle) {
            Object.assign((mp as any).Vehicle.prototype, factory);
        }
    }

    public setVirtualEntityGroupFactory(_factory: any): void {
        // RageMP doesn't have VirtualEntityGroup
        // Could log a warning or implement custom solution
    }

    public setVirtualEntityFactory(_factory: any): void {
        // RageMP doesn't have VirtualEntity
        // Could log a warning or implement custom solution
    }

    public setVoiceChannelFactory(_factory: any): void {
        // RageMP voice is handled differently
        // Could implement custom voice channel management
    }
}
