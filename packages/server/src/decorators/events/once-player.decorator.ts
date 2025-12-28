import { createEventDecorator } from '@ragemp-mango/core';

export function OncePlayer<E extends keyof MangoEvents.CustomPlayerToServerEvent>(eventName?: E): MethodDecorator;
export function OncePlayer<E extends string>(eventName?: Exclude<E, keyof MangoEvents.CustomPlayerToServerEvent>): MethodDecorator;
export function OncePlayer<E extends string>(eventName?: Exclude<E, keyof MangoEvents.CustomPlayerToServerEvent>) {
    return createEventDecorator('oncePlayer', eventName);
}
