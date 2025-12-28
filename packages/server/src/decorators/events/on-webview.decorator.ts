import { OnWebView as $OnWebView } from '@ragemp-mango/core';

export function OnWebView<E extends keyof MangoEvents.CustomWebViewToServerEvent>(id: string | number, eventName?: E): MethodDecorator;
export function OnWebView<E extends string>(
    id: string | number,
    eventName?: Exclude<E, keyof MangoEvents.CustomWebViewToServerEvent>,
): MethodDecorator;
export function OnWebView<E extends string>(id: string | number, eventName?: Exclude<E, keyof MangoEvents.CustomWebViewToServerEvent>) {
    return $OnWebView(id, eventName);
}
