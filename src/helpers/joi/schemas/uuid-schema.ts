import Joi from 'joi';

export const uuidSchema = Joi.object({
  id: Joi.string().guid().required(),
});
