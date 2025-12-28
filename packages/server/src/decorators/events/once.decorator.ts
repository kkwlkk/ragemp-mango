import { Once as $Once } from '@ragemp-mango/core';

export function Once<E extends keyof MangoEvents.CustomServerEvent>(eventName?: E): MethodDecorator;
export function Once<E extends string>(eventName?: Exclude<E, keyof MangoEvents.CustomServerEvent>): MethodDecorator;
export function Once<E extends string>(eventName?: Exclude<E, keyof MangoEvents.CustomServerEvent>) {
    return $Once(eventName);
}
