import { OnceWebView as $OnceWebView } from '@ragemp-mango/core';

export function OnceWebView<E extends keyof MangoEvents.CustomWebViewToServerEvent>(id: string | number, eventName?: E): MethodDecorator;
export function OnceWebView<E extends string>(
    id: string | number,
    eventName?: Exclude<E, keyof MangoEvents.CustomWebViewToServerEvent>,
): MethodDecorator;
export function OnceWebView<E extends string>(id: string | number, eventName?: Exclude<E, keyof MangoEvents.CustomWebViewToServerEvent>) {
    return $OnceWebView(id, eventName);
}
