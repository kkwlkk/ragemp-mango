import { createRPCDecorator } from '@ragemp-mango/core';

export function OnPlayerRequest<E extends keyof MangoRPC.CustomClientToServerRPC>(rpcName?: E): MethodDecorator;
export function OnPlayerRequest<E extends string>(rpcName?: Exclude<E, keyof MangoRPC.CustomClientToServerRPC>): MethodDecorator;
export function OnPlayerRequest<E extends string>(rpcName?: Exclude<E, keyof MangoRPC.CustomClientToServerRPC>) {
    return createRPCDecorator('onPlayerRequest', rpcName);
}
