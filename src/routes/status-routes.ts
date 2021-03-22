import { getStatus } from '@controllers/status/get';
import { Router } from 'express';

export const statusRoutes = Router()
  .get('/', getStatus);
