import { inject, injectable } from 'inversify';
import { MANGO_LOG_PREFIX, MULTIPLAYER_SERVICE } from '@ragemp-mango/core/app';
import type { LoggerService } from '@ragemp-mango/core';
import type { ServerMultiplayerService } from '../interfaces';
import { ConsoleColors } from './console-colors';

@injectable()
export class ServerLoggerService implements LoggerService {
    @inject(MULTIPLAYER_SERVICE) multiplayerService: ServerMultiplayerService;
    public log(...args: unknown[]): void {
        this.multiplayerService.log(
            `${ConsoleColors.white}[${ConsoleColors.yellow}${MANGO_LOG_PREFIX}Server${ConsoleColors.white}][${ConsoleColors.lightBlue}Log${ConsoleColors.white}]${ConsoleColors.reset}`,
            ...args,
        );
    }

    public warn(...args: unknown[]): void {
        this.multiplayerService.logWarning(
            `${ConsoleColors.white}[${ConsoleColors.yellow}${MANGO_LOG_PREFIX}Server${ConsoleColors.white}][${ConsoleColors.orange}Warn${ConsoleColors.white}]${ConsoleColors.reset}`,
            ...args,
        );
    }

    public error(...args: unknown[]): void {
        this.multiplayerService.logError(
            `${ConsoleColors.white}[${ConsoleColors.yellow}${MANGO_LOG_PREFIX}Server${ConsoleColors.white}][${ConsoleColors.red}Error${ConsoleColors.white}]${ConsoleColors.reset}`,
            ...args,
        );
    }

    public debug(...args: unknown[]): void {
        this.multiplayerService.logDebug(
            `${ConsoleColors.white}[${ConsoleColors.yellow}${MANGO_LOG_PREFIX}Server${ConsoleColors.white}][${ConsoleColors.lightCyan}Debug${ConsoleColors.white}]${ConsoleColors.reset}`,
            ...args,
        );
    }
}
