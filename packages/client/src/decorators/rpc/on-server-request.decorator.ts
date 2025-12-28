import { createRPCDecorator } from '@ragemp-mango/core';

export function OnServerRequest<E extends keyof MangoRPC.CustomServerToClientRPC>(rpcName?: E): MethodDecorator;
export function OnServerRequest<E extends string>(rpcName?: Exclude<E, keyof MangoRPC.CustomServerToClientRPC>): MethodDecorator;
export function OnServerRequest<E extends string>(rpcName?: Exclude<E, keyof MangoRPC.CustomServerToClientRPC>) {
    return createRPCDecorator('onServerRequest', rpcName);
}
