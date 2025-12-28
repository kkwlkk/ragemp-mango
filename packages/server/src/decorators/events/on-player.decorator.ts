import { createEventDecorator } from '@ragemp-mango/core';

export function OnPlayer<E extends keyof MangoEvents.CustomPlayerToServerEvent>(eventName?: E): MethodDecorator;
export function OnPlayer<E extends string>(eventName?: Exclude<E, keyof MangoEvents.CustomPlayerToServerEvent>): MethodDecorator;
export function OnPlayer<E extends string>(eventName?: Exclude<E, keyof MangoEvents.CustomPlayerToServerEvent>) {
    return createEventDecorator('onPlayer', eventName);
}
