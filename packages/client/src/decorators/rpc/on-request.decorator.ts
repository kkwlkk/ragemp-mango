import { OnRequest as $OnRequest } from '@ragemp-mango/core';

export function OnRequest<E extends keyof MangoRPC.CustomClientRPC>(rpcName?: E): MethodDecorator;
export function OnRequest<E extends string>(rpcName?: Exclude<E, keyof MangoRPC.CustomClientRPC>): MethodDecorator;
export function OnRequest<E extends string>(rpcName?: Exclude<E, keyof MangoRPC.CustomClientRPC>) {
    return $OnRequest(rpcName);
}
