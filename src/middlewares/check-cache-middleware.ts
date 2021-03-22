import { Request, Response, NextFunction } from 'express';
import { logger } from '@lib/logger';
import { Cache } from '@lib/cache';

const log = logger.child({ method: 'middlewares/check-cache' });

/**
 * Check if a parameter is available in the namespace of the cache.
 * @param parameter e.g. id.
 * @param cacheNamespace The namespace.
 */
export const checkCache = (parameter: string, cacheNamespace: string) => {
  return (request: Request, response: Response, next: NextFunction): void | Response => {
    log.debug(`checkCache middleware args: ${JSON.stringify({ parameter, cacheNamespace})}`);
    const queryId = request.params[parameter];

    if (!queryId) {
      log.error('Given query parameter not found. Please check your configuration of CacheMiddleware.');
      // continue without cache check.
      return next();
    }

    const cacheKey = `${cacheNamespace}${queryId}`;
    const cacheValue = Cache.getInstance().get(cacheKey);
  
    if (cacheValue) {
      log.info(`Returning cache key "${cacheKey}"`);
      return response.json(cacheValue);
    }
  
    return next();
  }
}
