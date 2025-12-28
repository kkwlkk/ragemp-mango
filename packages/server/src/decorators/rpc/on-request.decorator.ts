import { OnRequest as $OnRequest } from '@ragemp-mango/core';

export function OnRequest<E extends keyof MangoRPC.CustomServerRPC>(rpcName?: E): MethodDecorator;
export function OnRequest<E extends string>(rpcName?: Exclude<E, keyof MangoRPC.CustomServerRPC>): MethodDecorator;
export function OnRequest<E extends string>(rpcName?: Exclude<E, keyof MangoRPC.CustomServerRPC>) {
    return $OnRequest(rpcName);
}
