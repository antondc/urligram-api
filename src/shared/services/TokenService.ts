import jwt from 'jsonwebtoken';

import { AuthenticationError } from '@root/src/shared/errors/AuthenticationError';
import { JWT_SECRET } from '@shared/constants/env';

export class TokenService {
  createToken(string: unknown) {
    const token = jwt.sign(JSON.stringify(string), JWT_SECRET);

    return token;
  }

  decodeToken<T>(string: string): T {
    if (!string) return null;

    try {
      const token = jwt.verify(string, JWT_SECRET);

      return token as unknown as T;
    } catch (error) {
      throw new AuthenticationError('401 Unauthorized', 401);
    }
  }
}
