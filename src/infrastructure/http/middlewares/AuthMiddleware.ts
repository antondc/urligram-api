import { NextFunction, Request, Response } from 'express';

import { TokenService } from '@infrastructure/services/TokenService';
import { AuthenticationError } from '@root/src/shared/errors/AuthenticationError';

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (
    (req.method === 'GET' && !req.baseUrl.includes('/me/')) || // All get are free except routes using "me"
    (req.method === 'POST' && req.baseUrl === '/api/v1/login') || // Allow login
    (req.method === 'POST' && req.baseUrl === '/api/v1/users') || // Allow user creation
    (req.method === 'DELETE' && req.baseUrl === '/api/v1/state') // Allow reset
  ) {
    return next();
  }

  const tokenService = new TokenService();
  const session = tokenService.decodeToken(req.cookies.sessionToken);

  if (!session) throw new AuthenticationError('401 Unauthorized', 401);

  return next();
};
