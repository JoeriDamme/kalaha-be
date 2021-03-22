import { Response, Request } from 'express';
import config from 'config';
import { AppError } from '@lib/app-error';
import { logger } from '@lib/logger';
import httpContext from 'express-http-context';

const log = logger.child({ method: 'helpers/error-handling' });

/**
 * Error logging for Development mode.
 * @param error
 * @param response
 */
const sendErrorDev = (error: AppError, response: Response): Response<any, Record<string, any>> => {
  error.statusCode ? log.debug(error) : log.error(`${error.message} => ${JSON.stringify(error.stack)}`);

  // eslint-disable-next-line no-console
  console.error(error); // display error in console for Developer.
  return response.status(error.statusCode || 500).json({
    error,
    message: error.message,
    stack: error.stack,
    statusCode: error.statusCode,
  });
};

/**
 * Error handling for Production mode. Stacktraces and unknown errors will be hidden, but logged.
 * @param error
 * @param response
 */
const sendErrorProd = (error: AppError, response: Response): Response<any, Record<any, string>> => {
  if (error.isOperational) {
    // An operational error occured and has been handled. This can be shown to the client.
    log.debug(error);
    return response.status(error.statusCode).json({
      message: error.message,
      statusCode: error.statusCode,
    });
  }

  // The error has not been handled correctly. Show a 500 internal server error and log the original error.
  // 1) Log the error
  log.error(`${error.message} => ${JSON.stringify(error.stack)}`);

  // 2) Send generic message
  return response.status(500).json({
    message: 'Internal server error.',
    statusCode: 500,
    requestId: httpContext.get('requestId'),
  });
};

/**
 * Exported function to use in the application.
 */
export const sendError = (error: AppError, request: Request, response: Response): Response<any> => {
  if (config.util.getEnv('NODE_CONFIG_ENV') === 'dev') {
    return sendErrorDev(error, response);
  }

  return sendErrorProd(error, response);
};
