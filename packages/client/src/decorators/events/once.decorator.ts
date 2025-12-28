import { Once as $Once } from '@ragemp-mango/core';

export function Once<E extends keyof MangoEvents.CustomClientEvent>(eventName?: E): MethodDecorator;
export function Once<E extends string>(eventName?: Exclude<E, keyof MangoEvents.CustomClientEvent>): MethodDecorator;
export function Once<E extends string>(eventName?: Exclude<E, keyof MangoEvents.CustomClientEvent>) {
    return $Once(eventName);
}
