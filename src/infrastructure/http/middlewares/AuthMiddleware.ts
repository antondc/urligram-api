import { Request, Response, NextFunction } from 'express';
import { TokenService } from '@infrastructure/services/TokenService';
import { AuthenticationError } from '@root/src/shared/errors/AuthenticationError';

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.method === 'GET' ||
    (req.method === 'POST' && req.baseUrl === '/api/v1/login') ||
    (req.method === 'POST' && req.baseUrl === '/api/v1/users')
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
