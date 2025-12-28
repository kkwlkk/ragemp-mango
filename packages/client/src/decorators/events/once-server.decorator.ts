import { createEventDecorator } from '@ragemp-mango/core';

export function OnceServer<E extends keyof MangoEvents.CustomServerToPlayerEvent>(eventName?: E): MethodDecorator;
export function OnceServer<E extends string>(eventName?: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>): MethodDecorator;
export function OnceServer<E extends string>(eventName?: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>) {
    return createEventDecorator('onceServer', eventName);
}
