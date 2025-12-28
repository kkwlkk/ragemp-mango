import { OnWebViewRequest as $OnWebViewRequest } from '@ragemp-mango/core';

export function OnWebViewRequest<E extends keyof MangoRPC.CustomWebViewToClientRPC>(id: string | number, rpcName?: E): MethodDecorator;
export function OnWebViewRequest<E extends string>(
    id: string | number,
    rpcName?: Exclude<E, keyof MangoRPC.CustomWebViewToClientRPC>,
): MethodDecorator;
export function OnWebViewRequest<E extends string>(id: string | number, rpcName?: Exclude<E, keyof MangoRPC.CustomWebViewToClientRPC>) {
    return $OnWebViewRequest(id, rpcName);
}
