import type { ExecutionContext as $ExecutionContext } from '@ragemp-mango/core/app';
import type { MangoRequest } from './mango-request.interface';
import type { MangoResponse } from './mango-response.interface';

export interface ExecutionContext<TRequest extends MangoRequest = MangoRequest, TResponse extends MangoResponse = MangoResponse>
    extends $ExecutionContext<TRequest, TResponse> {}
