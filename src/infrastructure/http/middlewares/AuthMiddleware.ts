import { NextFunction, Request, Response } from 'express';

import { AuthenticationError } from '@root/src/shared/errors/AuthenticationError';
import { TokenService } from '@shared/services/TokenService';

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const regexTestMe = /\b(\/me)\b/i; // Test if route has «/me» string
  const urlIncludesMe = regexTestMe.test(req.baseUrl);

  // All routes need authentication, except:
  if (
    (req.method === 'GET' && !urlIncludesMe) || // All get except routes using "me"
    (req.method === 'POST' && req.baseUrl === '/api/v1/login') || // Allow login
    (req.method === 'DELETE' && req.baseUrl === '/api/v1/login') || // Allow logout for users with corrupted cookies
    (req.method === 'PUT' && req.baseUrl === '/api/v1/login') || // Allow forgot password request
    (req.method === 'PATCH' && req.baseUrl === '/api/v1/login') || // Allow reset password request
    (req.method === 'POST' && req.baseUrl === '/api/v1/users') || // Allow user creation
    (req.method === 'POST' && req.baseUrl === '/api/v1/users/sign-up-confirmation') // Allow user creation confirmation
  ) {
    return next();
  }

  const tokenService = new TokenService();
  const sessionToken = req.cookies.sessionToken;
  const sessionData = req.cookies.sessionData;
  const sessionTokenDecoded = tokenService.decodeToken(sessionToken);
  const sessionTokenDecodedStringified = JSON.stringify(sessionTokenDecoded);
  const sessionDataMatches = sessionData === sessionTokenDecodedStringified;

  if (!sessionTokenDecoded || !sessionData || !sessionDataMatches) throw new AuthenticationError('401 Unauthorized', 401);

  if (sessionToken && sessionData && sessionDataMatches) return next();
};
