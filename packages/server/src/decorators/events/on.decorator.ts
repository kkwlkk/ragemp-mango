import { On as $On } from '@ragemp-mango/core';

export function On<E extends keyof MangoEvents.CustomServerEvent>(eventName?: E): MethodDecorator;
export function On<E extends string>(eventName?: Exclude<E, keyof MangoEvents.CustomServerEvent>): MethodDecorator;
export function On<E extends string>(eventName?: Exclude<E, keyof MangoEvents.CustomServerEvent>) {
    return $On(eventName);
}
