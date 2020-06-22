import { NextFunction, Request, Response } from 'express';

import { TokenService } from '@infrastructure/services/TokenService';
import { AuthenticationError } from '@root/src/shared/errors/AuthenticationError';

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.method === 'GET' || // All get are free
    (req.method === 'POST' && req.baseUrl === '/api/v1/login') || // Allow login
    (req.method === 'POST' && req.baseUrl === '/api/v1/users') // Allow user creation
  ) {
    return next();
  }

  try {
    const tokenService = new TokenService();
    tokenService.verifyToken(req.cookies.sessionToken);

    return next();
  } catch (err) {
    throw new AuthenticationError('401 Unauthorized', 401, err);
  }
};
