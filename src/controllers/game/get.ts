import { NextFunction, Request, Response } from 'express';
import { logger } from '@lib/logger';
import { findGame } from '@services/game-service';
import { AppError } from '@lib/app-error';

const log = logger.child({ method: 'controllers/game/get' });

/**
 * Endpoint to retrieve Game resource.
 * @param request
 * @param response
 */
 export async function getGame(request: Request, response: Response, next: NextFunction): Promise<Response|void> {
  const { id } = request.params;
  log.info(`GET Game: ${id}`);

  let resource;
  try {
    resource = await findGame(id);

    if (!resource) {
      throw new AppError('Resource not found', 404);
    }
  } catch (error) {
    return next(error);
  }

  return response.json(resource);
}