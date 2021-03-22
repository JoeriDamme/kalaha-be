import NodeCache from 'node-cache';
import { Logger } from 'winston';
import config from 'config';
import { logger } from '@lib/logger';

export class Cache {
  private static instance: Cache
  private cache: NodeCache;
  private log: Logger;

  private constructor(ttlSeconds: number, checkPeriod: number, log: Logger) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: checkPeriod,
    });
    this.log = log;
  }

  /**
   * Get value from cache.
   * @param key name of cache key.
   */
  get(key: string): any {
    const value = this.cache.get(key);
    this.log.debug(`Cache key "${key}" available: ${!!value}`);
    return value ? value : false;
  }

  /**
   * Store value in cache.
   * @param key name of cache key.
   * @param value value to store.
   */
  set(key: string, value: Record<string, any> | string | number): void {
    this.log.debug(`Cache key "${key}" set`);
    this.cache.set(key, value);
  }

  /**
   * Delete from cache.
   * @param key name of cache key
   */
  delete(key: string): void {
    this.cache.del(key);
  }

  /**
   * Flush the cache.
   */
  flush(): void {
    this.cache.flushAll();
  }

  /**
   * Get singleton instance from the caching module.
   */
  public static getInstance(): Cache {
    if (!Cache.instance) {
      const log = logger.child({ method: 'lib/cache' });
      Cache.instance = new Cache(config.get('cache.ttl'), config.get('cache.checkperiod'), log);
    }        
    return Cache.instance
  }
}
