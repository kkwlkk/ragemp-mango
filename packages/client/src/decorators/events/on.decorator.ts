import { On as $On } from '@ragemp-mango/core';

export function On<E extends keyof MangoEvents.CustomClientEvent>(eventName?: E): MethodDecorator;
export function On<E extends string>(eventName?: Exclude<E, keyof MangoEvents.CustomClientEvent>): MethodDecorator;
export function On<E extends string>(eventName?: Exclude<E, keyof MangoEvents.CustomClientEvent>) {
    return $On(eventName);
}
