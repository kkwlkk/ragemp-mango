import { OnceWebView as $OnceWebView } from '@ragemp-mango/core';

export function OnceWebView<E extends keyof MangoEvents.CustomWebViewToClientEvent>(id: string | number, eventName?: E): MethodDecorator;
export function OnceWebView<E extends string>(
    id: string | number,
    eventName?: Exclude<E, keyof MangoEvents.CustomWebViewToClientEvent>,
): MethodDecorator;
export function OnceWebView<E extends string>(id: string | number, eventName?: Exclude<E, keyof MangoEvents.CustomWebViewToClientEvent>) {
    return $OnceWebView(id, eventName);
}
