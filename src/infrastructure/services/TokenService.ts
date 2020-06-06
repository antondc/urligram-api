import jwt from 'jsonwebtoken';
import config from '@root/config.test.json';

export class TokenService {
  createToken(string: string | {}) {
    const token = jwt.sign(JSON.stringify(string), config[process.env.NODE_ENV].PORT_SERVER);

    return token;
  }

  verifyToken(string: string) {
    const token = jwt.verify(string, config[process.env.NODE_ENV].PORT_SERVER);

    return token;
  }
}
