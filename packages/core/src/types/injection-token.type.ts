import type { Newable } from './newable.type';

// Match inversify's ServiceIdentifier type for compatibility
export type InjectionToken<T = unknown> = string | symbol | Newable<T> | Function;
