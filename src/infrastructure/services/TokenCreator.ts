import jwt from 'jsonwebtoken';
import config from '@root/config.test.json';

export class TokenCreator {
  createToken(string: string | {}) {
    const token = jwt.sign(JSON.stringify(string), config[process.env.NODE_ENV].PORT_SERVER);

    return token;
  }
}
