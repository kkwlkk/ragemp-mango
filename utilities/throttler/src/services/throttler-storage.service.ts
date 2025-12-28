import { Injectable, type OnAppShutdown } from '@ragemp-mango/core';
import type { ThrottlerStorageOptions } from '../interfaces';

@Injectable()
export class ThrottlerStorageService implements OnAppShutdown {
    public readonly storage: WeakMap<PlayerMp, Map<string, ThrottlerStorageOptions>> = new WeakMap();
    private timeoutIds: NodeJS.Timeout[] = [];

    private getExpirationTime(player: PlayerMp, key: string) {
        return Math.floor((this.storage.get(player)!.get(key)!.expiresAt - Date.now()) / 1000);
    }

    private setExpirationTime(player: PlayerMp, key: string, ttlMilliseconds: number) {
        const timeoutId = setTimeout(() => {
            this.storage.get(player)!.get(key)!.totalHits--;
            clearTimeout(timeoutId);
            this.timeoutIds = this.timeoutIds.filter((id) => id != timeoutId);
        }, ttlMilliseconds);
        this.timeoutIds.push(timeoutId);
    }

    public async increment(player: PlayerMp, key: string, ttl: number) {
        const ttlMilliseconds = ttl;

        if (!this.storage.get(player)) {
            this.storage.set(player, new Map());
        }

        if (!this.storage.get(player)!.get(key)) {
            this.storage.get(player)!.set(key, { totalHits: 0, expiresAt: Date.now() + ttlMilliseconds });
        }

        let timeToExpire = this.getExpirationTime(player, key);

        // Reset the timeToExpire once it has been expired.
        if (timeToExpire <= 0) {
            this.storage.get(player)!.get(key)!.expiresAt = Date.now() + ttlMilliseconds;
            timeToExpire = this.getExpirationTime(player, key);
        }

        this.storage.get(player)!.get(key)!.totalHits++;
        this.setExpirationTime(player, key, ttlMilliseconds);

        return {
            totalHits: this.storage.get(player)!.get(key)!.totalHits,
            timeToExpire,
        };
    }

    public onAppShutdown() {
        this.timeoutIds.forEach(clearTimeout);
    }
}
