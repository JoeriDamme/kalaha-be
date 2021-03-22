import Joi from 'joi';
import { AppError } from '@lib/app-error';

/**
 * Validate data against Joi schema. Will throw an AppError in case of invalidation.
 * @param schema Joi schema. See https://hapi.dev/module/joi/#usage how to create a validation schema.
 * @param data Data for example from Express' request.body.
 * @throws AppError
 */
export function joiValidate(schema: Joi.ObjectSchema<any>, data: Record<string, any>): void|boolean {
  const validation = schema.validate(data);

  if (validation.error) {
    throw new AppError(`Invalid payload: ${validation.error.details[0].message}`, 400);
  }

  return true;
}
