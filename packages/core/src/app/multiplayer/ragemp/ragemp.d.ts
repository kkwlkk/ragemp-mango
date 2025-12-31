// RageMP global type declarations for when @ragempcommunity/types-* are not available

declare global {
    interface Mp {
        events: {
            add(eventName: string, handler: (...args: any[]) => void): void;
            add(handlers: Record<string, (...args: any[]) => void>): void;
            call(eventName: string, ...args: any[]): void;
            remove(eventName: string, handler?: (...args: any[]) => void): void;
            callRemote(eventName: string, ...args: any[]): void;
            addProc(procName: string, handler: (...args: any[]) => any): void;
        };
        console: {
            logInfo(message: string, save?: boolean, saveAsync?: boolean): void;
            logWarning(message: string, save?: boolean, saveAsync?: boolean): void;
            logError(message: string, save?: boolean, saveAsync?: boolean): void;
            logFatal(message: string, save?: boolean, saveAsync?: boolean): void;
        };
        players: {
            local: PlayerMp;
            at(index: number): PlayerMp | undefined;
            exists(entity: PlayerMp): boolean;
            forEach(callback: (player: PlayerMp) => void): void;
            forEachInRange(position: Vector3Mp, range: number, callback: (player: PlayerMp) => void): void;
            toArray(): PlayerMp[];
            length: number;
            call(eventName: string, args?: any[]): void;
            callUnreliable(eventName: string, args?: any[]): void;
        };
        vehicles: {
            at(index: number): VehicleMp | undefined;
            exists(entity: VehicleMp): boolean;
            forEach(callback: (vehicle: VehicleMp) => void): void;
            new(model: number | string, position: Vector3Mp, options?: object): VehicleMp;
            toArray(): VehicleMp[];
            length: number;
        };
        browsers: BrowserPool;
        blips: {
            new(model: number, position: Vector3Mp, options?: object): BlipMp;
            at(index: number): BlipMp | undefined;
            exists(entity: BlipMp): boolean;
            forEach(callback: (blip: BlipMp) => void): void;
            toArray(): BlipMp[];
            length: number;
        };
        checkpoints: {
            new(type: number, position: Vector3Mp, radius: number, options?: object): CheckpointMp;
            at(index: number): CheckpointMp | undefined;
            exists(entity: CheckpointMp): boolean;
            forEach(callback: (checkpoint: CheckpointMp) => void): void;
            toArray(): CheckpointMp[];
            length: number;
        };
        colshapes: {
            newCircle(x: number, y: number, range: number, dimension?: number): ColshapeMp;
            newCuboid(x: number, y: number, z: number, width: number, depth: number, height: number, dimension?: number): ColshapeMp;
            newRectangle(x: number, y: number, width: number, height: number, dimension?: number): ColshapeMp;
            newSphere(x: number, y: number, z: number, range: number, dimension?: number): ColshapeMp;
            newTube(x: number, y: number, z: number, range: number, height: number, dimension?: number): ColshapeMp;
            at(index: number): ColshapeMp | undefined;
            exists(entity: ColshapeMp): boolean;
            forEach(callback: (colshape: ColshapeMp) => void): void;
            toArray(): ColshapeMp[];
            length: number;
        };
        markers: {
            new(type: number, position: Vector3Mp, scale: number, options?: object): MarkerMp;
            at(index: number): MarkerMp | undefined;
            exists(entity: MarkerMp): boolean;
            forEach(callback: (marker: MarkerMp) => void): void;
            toArray(): MarkerMp[];
            length: number;
        };
        peds: {
            new(model: number | string, position: Vector3Mp, options?: object): PedMp;
            at(index: number): PedMp | undefined;
            exists(entity: PedMp): boolean;
            forEach(callback: (ped: PedMp) => void): void;
            toArray(): PedMp[];
            length: number;
        };
        objects: {
            new(model: number | string, position: Vector3Mp, options?: object): ObjectMp;
            at(index: number): ObjectMp | undefined;
            exists(entity: ObjectMp): boolean;
            forEach(callback: (object: ObjectMp) => void): void;
            toArray(): ObjectMp[];
            length: number;
        };
        labels: {
            new(text: string, position: Vector3Mp, options?: object): TextLabelMp;
            at(index: number): TextLabelMp | undefined;
            exists(entity: TextLabelMp): boolean;
            forEach(callback: (label: TextLabelMp) => void): void;
            toArray(): TextLabelMp[];
            length: number;
        };
        Vector3: new (x: number, y: number, z: number) => Vector3Mp;
        game: any;
        gui: {
            cursor: {
                visible: boolean;
                show(freezeControls: boolean, state: boolean): void;
                position: [number, number];
            };
            chat: {
                push(message: string): void;
                show(state: boolean): void;
                activate(state: boolean): void;
            };
        };
        keys: {
            bind(keyCode: number, keyHold: boolean, handler: () => void): void;
            unbind(keyCode: number, keyHold: boolean, handler?: () => void): void;
            isDown(keyCode: number): boolean;
            isUp(keyCode: number): boolean;
        };
        storage: {
            data: Record<string, any>;
            sessionData: Record<string, any>;
            flush(): void;
        };
        discord: {
            update(detailedStatus: string, state: string): void;
        };
        raycasting: {
            testPointToPoint(start: Vector3Mp, end: Vector3Mp, ignoreEntity?: number, flags?: number): RaycastResult;
        };
        nametags: {
            enabled: boolean;
        };
        voiceChat: {
            muted: boolean;
        };
    }

    interface Vector3Mp {
        x: number;
        y: number;
        z: number;
        add(v: Vector3Mp): Vector3Mp;
        subtract(v: Vector3Mp): Vector3Mp;
        multiply(n: number): Vector3Mp;
        divide(n: number): Vector3Mp;
        length(): number;
        unit(): Vector3Mp;
        clone(): Vector3Mp;
        toArray(): [number, number, number];
    }

    interface EntityMp {
        id: number;
        type: string;
        position: Vector3Mp;
        dimension: number;
        model: number;
        alpha: number;
        destroy(): void;
        getVariable(key: string): any;
        setVariable(key: string, value: any): void;
    }

    interface PlayerMp extends EntityMp {
        name: string;
        heading: number;
        health: number;
        armour: number;
        weapon: number;
        vehicle: VehicleMp | null;
        seat: number;
        ip: string;
        ping: number;
        call(eventName: string, args?: any[]): void;
        callProc<T = any>(eventName: string, args?: any[]): Promise<T>;
        callUnreliable(eventName: string, args?: any[]): void;
        invoke(hash: string, ...args: any[]): void;
        notify(message: string): void;
        outputChatBox(message: string): void;
        spawn(position: Vector3Mp): void;
        giveWeapon(weapon: number | string, ammo: number): void;
        removeWeapon(weapon: number | string): void;
        removeAllWeapons(): void;
        kick(reason?: string): void;
        ban(reason?: string): void;
        putIntoVehicle(vehicle: VehicleMp, seat: number): void;
        removeFromVehicle(): void;
    }

    interface VehicleMp extends EntityMp {
        heading: number;
        engine: boolean;
        locked: boolean;
        numberPlate: string;
        spawn(position: Vector3Mp, heading: number): void;
        repair(): void;
        explode(): void;
        getOccupant(seat: number): PlayerMp | null;
        getOccupants(): PlayerMp[];
        setColor(primary: number, secondary: number): void;
        setColorRGB(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): void;
    }

    interface BrowserMp {
        id: number;
        url: string;
        active: boolean;
        execute(code: string): void;
        call(eventName: string, ...args: any[]): void;
        callProc<T = any>(procName: string, ...args: any[]): Promise<T>;
        reload(ignoreCache: boolean): void;
        destroy(): void;
        markAsChat(): void;
    }

    interface BrowserPool {
        'new'(url: string): BrowserMp;
        newHeadless(url: string, width: number, height: number, forceFlip?: boolean): BrowserMp;
        at(index: number): BrowserMp | undefined;
        exists(entity: BrowserMp): boolean;
        forEach(callback: (browser: BrowserMp) => void): void;
        toArray(): BrowserMp[];
        length: number;
    }

    interface BlipMp extends EntityMp {
        color: number;
        name: string;
        scale: number;
        shortRange: boolean;
    }

    interface CheckpointMp extends EntityMp {
        color: [number, number, number, number];
        radius: number;
        visible: boolean;
    }

    interface ColshapeMp extends EntityMp {
        shapeType: string;
        isPointWithin(point: Vector3Mp): boolean;
    }

    interface MarkerMp extends EntityMp {
        color: [number, number, number, number];
        direction: Vector3Mp;
        scale: number;
        visible: boolean;
    }

    interface PedMp extends EntityMp {
        controller: PlayerMp | null;
    }

    interface ObjectMp extends EntityMp {
        rotation: Vector3Mp;
    }

    interface TextLabelMp extends EntityMp {
        text: string;
        color: [number, number, number, number];
        drawDistance: number;
        los: boolean;
    }

    interface RaycastResult {
        entity: number;
        position: Vector3Mp;
        surfaceNormal: Vector3Mp;
    }

    const mp: Mp;
}

export {};
