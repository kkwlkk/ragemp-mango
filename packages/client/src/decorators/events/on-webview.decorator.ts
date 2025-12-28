import { OnWebView as $OnWebView } from '@ragemp-mango/core';

export function OnWebView<E extends keyof MangoEvents.CustomWebViewToClientEvent>(id: string | number, eventName?: E): MethodDecorator;
export function OnWebView<E extends string>(
    id: string | number,
    eventName?: Exclude<E, keyof MangoEvents.CustomWebViewToClientEvent>,
): MethodDecorator;
export function OnWebView<E extends string>(id: string | number, eventName?: Exclude<E, keyof MangoEvents.CustomWebViewToClientEvent>) {
    return $OnWebView(id, eventName);
}
