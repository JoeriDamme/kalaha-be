import Joi from 'joi';

const player = Joi.object().keys({
  name: Joi.string().min(1).max(64).required(),
});

export const gamePostSchema = Joi.object({
  players: Joi.array().min(2).max(2).items(player).required(),
});
