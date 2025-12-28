import { OnWebViewRequest as $OnWebViewRequest } from '@ragemp-mango/core';

export function OnWebViewRequest<E extends keyof MangoRPC.CustomWebViewToServerRPC>(id: string | number, rpcName?: E): MethodDecorator;
export function OnWebViewRequest<E extends string>(
    id: string | number,
    rpcName?: Exclude<E, keyof MangoRPC.CustomWebViewToServerRPC>,
): MethodDecorator;
export function OnWebViewRequest<E extends string>(id: string | number, rpcName?: Exclude<E, keyof MangoRPC.CustomWebViewToServerRPC>) {
    return $OnWebViewRequest(id, rpcName);
}
