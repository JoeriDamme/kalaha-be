import { NextFunction, Request, Response } from 'express';
import { logger } from '@lib/logger';
import { updateGame } from '@services/game-service';
import { Cache } from '@lib/cache';
import config from 'config';

const log = logger.child({ method: 'controllers/game/patch' });

/**
 * Endpoint to update Game resource.
 * @param request
 * @param response
 */
 export async function patchGame(request: Request, response: Response, next: NextFunction): Promise<Response|void> {
  const { id } = request.params;
  log.info(`PATCH Game: ${id}`);

  let resource;

  try {
    resource = await updateGame(id, request.body);
  } catch (error) {
    return next(error);
  }

  Cache.getInstance().set(`${config.get<string>('cache.namespaces.game')}${resource.get('id')}`, resource);

  return response.json(resource);
}
