import { TokenService } from '@infrastructure/services/TokenService';

export const FilterAllRequestsController = (req, res, next) => {
  if (req.method === 'GET' || req.baseUrl === '/v1/login' || req.baseUrl === '/v1/reset-content') {
    return next();
  }

  try {
    const tokenService = new TokenService();
    tokenService.verifyToken(req.cookies.sessionToken);

    return next();
  } catch (err) {
    res.clearCookie('sessionToken', { path: '/' }).status(401).send('401 UNAUTHORIZED').end();
  }
};
