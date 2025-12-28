import type { MangoRequest as $MangoRequest } from '@ragemp-mango/core/app';

export interface MangoRequest extends $MangoRequest {
    player?: PlayerMp;
}
