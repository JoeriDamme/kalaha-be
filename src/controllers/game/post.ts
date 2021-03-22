import { NextFunction, Request, Response } from 'express';
import { logger } from '@lib/logger';
import { joiValidate } from '@helpers/joi/joi-validator';
import { gamePostSchema } from '@helpers/joi/schemas/game-post-schema';
import { createGame } from '@services/game-service';
import { Cache } from '@lib/cache';
import config from 'config';

const log = logger.child({ method: 'controllers/game/post' });

/**
 * Endpoint to create Game resource.
 * @param request
 * @param response
 */
 export async function postGame(request: Request, response: Response, next: NextFunction): Promise<Response|void> {
  log.info(`POST Game ${JSON.stringify(request.body)}`);
  const body = request.body;
  let result;
  try {
    joiValidate(gamePostSchema, body);
    result = await createGame(body);
  } catch (error) {
    return next(error);
  }

  // update cache
  Cache.getInstance().set(`${config.get<string>('cache.namespaces.game')}${result.get('id')}`, result);

  return response.json(result);
}