import { Request, Response } from 'express';
import { logger } from '@lib/logger';

const log = logger.child({ method: 'controllers/status/get' });

/**
 * Endpoint that can be used for a health check.
 * @param request
 * @param response
 */
export async function getStatus(request: Request, response: Response): Promise<Response> {
  log.debug('Getting status');
  return response.json({ status: 'ok' });
}

