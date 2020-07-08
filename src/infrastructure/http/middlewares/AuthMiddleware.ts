import { NextFunction, Request, Response } from 'express';

import { TokenService } from '@infrastructure/services/TokenService';
import { AuthenticationError } from '@root/src/shared/errors/AuthenticationError';

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiPasswordUrlRegex = /^(\/api\/v1\/users\/(.+)(\/password|\/password\/)$)/;

  if (
    req.method === 'GET' || // All get are free
    (req.method === 'POST' && req.baseUrl === '/api/v1/login') || // Allow login
    (req.method === 'POST' && req.baseUrl === '/api/v1/users') || // Allow user creation
    (req.method === 'PUT' && apiPasswordUrlRegex.test(req.baseUrl)) || // Allow user password change
    (req.method === 'DELETE' && req.baseUrl === '/api/v1/state') // Allow reset
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
