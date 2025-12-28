import type { Guard as $Guard } from '@ragemp-mango/core/app';
import type { MangoRequest } from './mango-request.interface';
import type { MangoResponse } from './mango-response.interface';

export interface Guard extends $Guard<MangoRequest, MangoResponse> {}
