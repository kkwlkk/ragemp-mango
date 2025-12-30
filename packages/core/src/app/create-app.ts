import { Container } from 'inversify';
import { MULTIPLAYER_SERVICE, PLUGINS } from './constants';
import type { Newable } from '../types';
import type { MangoPlugin, MultiplayerService } from './interfaces';
import type { AppEnviroment } from './enums';
import type { AppBuilder } from './app-builder';
import type { AppBuilderConfig } from '../interfaces/core/app-builder-config.interface';

export async function createAppBuilder<T extends AppBuilder>({
    enviroment,
    plugins,
    appBuilderInherit,
    multiplayerService,
}: {
    enviroment: AppEnviroment;
    plugins: Newable<MangoPlugin>[];
    appBuilderInherit: new (config: AppBuilderConfig) => T;
    multiplayerService?: MultiplayerService;
}): Promise<T> {
    const internalAppContainer = new Container();

    if (multiplayerService) internalAppContainer.bind(MULTIPLAYER_SERVICE).toConstantValue(multiplayerService);
    internalAppContainer.bind(PLUGINS).toConstantValue(plugins);

    return new appBuilderInherit({
        enviroment,
        internalAppContainer,
        multiplayerService: multiplayerService!,
        plugins,
    });
}