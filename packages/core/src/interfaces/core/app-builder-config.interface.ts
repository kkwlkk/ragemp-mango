import type { Container } from "inversify";
import type { AppEnviroment, MangoPlugin, MultiplayerService } from "../../app";
import type { Newable } from "../../types";

export interface AppBuilderConfig {
    enviroment: AppEnviroment;
    internalAppContainer: Container;
    multiplayerService: MultiplayerService;
    plugins: Newable<MangoPlugin>[];
}