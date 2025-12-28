import type { ExecutionContext } from '@ragemp-mango/server';

export type Resolvable<T extends number | string | boolean> = T | ((context: ExecutionContext) => T | Promise<T>);

export interface ThrottlerMethodOrControllerOptions {
    limit?: Resolvable<number>;
    ttl?: Resolvable<number>;
}
