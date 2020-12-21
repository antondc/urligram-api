import jwt from 'jsonwebtoken';

import { SECRET } from '@shared/constants/env';

export class TokenService {
  createToken(string: unknown) {
    const token = jwt.sign(JSON.stringify(string), SECRET);

    return token;
  }

  decodeToken(string: string) {
    if (!string) return null;

    const token = jwt.verify(string, SECRET);

    return token;
  }
}
