import { logger } from '@lib/logger';
import { AppError } from '@lib/app-error';
import { IGame } from '@interfaces/game-interface';
import { GameModel } from '@models/game-model';

const log = logger.child({ method: 'services/game-service' });

/**
 * Find one Game resource by Id.
 * @param id UUID.
 * @returns Game resource.
 */
 export async function findGame(id: string): Promise<IGame|null> {
  log.debug(`Get Game: ${id}`);
  return GameModel.findById(id);
}

/**
 * Create a Game resource.
 * @param data
 * @returns Game resource.
 */
 export async function createGame(data: IGame): Promise<IGame> {
  // save Game in database
  log.debug(`Create Game: ${JSON.stringify(data)}`);
  return GameModel.create(data);
}

/**
 * Update a Game resource by id.
 * @param id UUID.
 * @param data 
 * @returns Updated Game resource.
 */
 export async function updateGame(id: string, data: IGame): Promise<IGame> {
  const query = GameModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  const result = await query.exec();
  
  if (!result) {
    throw new AppError('Resource not found', 404);
  }

  return result;
}