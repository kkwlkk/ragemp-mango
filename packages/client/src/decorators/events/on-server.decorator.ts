import { createEventDecorator } from '@ragemp-mango/core';

export function OnServer<E extends keyof MangoEvents.CustomServerToPlayerEvent>(eventName?: E): MethodDecorator;
export function OnServer<E extends string>(eventName?: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>): MethodDecorator;
export function OnServer<E extends string>(eventName?: Exclude<E, keyof MangoEvents.CustomServerToPlayerEvent>) {
    return createEventDecorator('onServer', eventName);
}
