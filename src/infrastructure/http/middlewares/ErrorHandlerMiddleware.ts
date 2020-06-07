import { BaseError } from '@root/src/shared/errors/BaseError';
import { NetWorkError } from '@root/src/shared/errors/NetworkError';
import { RequestError } from '@root/src/shared/errors/RequestError';
import { AuthenticationError } from '@root/src/shared/errors/AuthenticationError';
import config from '@root/config.test.json';

export const ErrorHandlerMiddleware = (err, req, res, next) => {
  const isCustomError = err instanceof BaseError || err instanceof NetWorkError || err instanceof RequestError;
  const isAuthenticationError = err instanceof AuthenticationError;
  const logging = config[process.env.NODE_ENV].LOGGING;

  if (err && isAuthenticationError)
    return res
      .clearCookie('sessionToken', { path: '/' })
      .status(err.statusCode)
      .send(logging ? err : err.message)
      .end();

  if (err && isCustomError) return res.status(err.statusCode).send(isCustomError);
  if (err && logging) return res.status(err.statusCode || 500).send(err);
  if (err) return res.status(500).send('500 Internal Server Error');

  return next();
};
