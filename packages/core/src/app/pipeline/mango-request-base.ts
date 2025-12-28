import { injectable } from 'inversify';
import type { MangoRequest } from '../interfaces';

@injectable()
export class MangoRequestBase<TData = unknown> implements MangoRequest {
    public $body: TData;
    public $player?: PlayerMp;

    public get body() {
        return this.$body;
    }

    public get player() {
        return this.$player;
    }
}
