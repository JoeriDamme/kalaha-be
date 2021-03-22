import { middlewares } from '@middlewares/index';
import { Router } from 'express';
import config from 'config';
import { uuidSchema } from '@helpers/joi/schemas/uuid-schema';
import { getGame } from '@controllers/game/get';
import { patchGame } from '@controllers/game/patch';
import { postGame } from '@controllers/game/post';

export const gameRoutes = Router()
  .get('/:id', middlewares.validateUrlId(uuidSchema, 'id'), middlewares.checkCache('id', config.get<string>('cache.namespaces.game')), getGame)
  .patch('/:id', patchGame)
  .post('/', postGame);
