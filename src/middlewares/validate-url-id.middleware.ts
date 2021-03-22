import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { joiValidate } from '@helpers/joi/joi-validator';
import { logger } from '@lib/logger';

const log = logger.child({ method: 'middlewares/validateUrlId' });

/**
 * Validate a parameter in the URL. Usefull for REST APIs.
 * e.g. The GET endpoint http://localhost/resource/4ae00cff-c8b7-4115-8b10-71da662053ec has an Id, 4ae00cff-c8b7-4115-8b10-71da662053ec.
 * This middleware will check if 4ae00cff-c8b7-4115-8b10-71da662053ec is a valid value against a Joi schema.
 * @param schema Joi schema.
 * @param idName The property that is defined in the Joi schema.
 */
export const validateUrlId = (schema: Joi.ObjectSchema, idName: string) => {
  return (request: Request, response: Response, next: NextFunction): void => {
    const parameterValue = request.params.id;
    const value = {
      [idName]: parameterValue
    }
    log.debug(`parameter to check: ${JSON.stringify(value)}`);

    try {
      joiValidate(schema, value);
    } catch (error) {
      return next(error);
    }
  
    return next();
  }
}
