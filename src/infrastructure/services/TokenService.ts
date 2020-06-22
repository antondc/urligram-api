import jwt from 'jsonwebtoken';

import { SECRET } from '@shared/constants/env';

export class TokenService {
  createToken(string: string | Record<string, unknown>) {
    const token = jwt.sign(JSON.stringify(string), SECRET);

    return token;
  }

  verifyToken(string: string) {
    const token = jwt.verify(string, SECRET);

    return token;
  }
}
