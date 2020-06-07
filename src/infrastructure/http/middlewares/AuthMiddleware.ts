import { Request, Response, NextFunction } from 'express';
import { TokenService } from '@infrastructure/services/TokenService';
import { AuthenticationError } from '@root/src/shared/errors/AuthenticationError';

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'GET' || req.baseUrl === '/v1/login' || req.baseUrl === '/v1/reset-content') {
    return next();
  }

  try {
    const tokenService = new TokenService();
    tokenService.verifyToken(req.cookies.sessionToken);

    return next();
  } catch (err) {
    throw new AuthenticationError('Unauthorized', 401, err);
  }
};
