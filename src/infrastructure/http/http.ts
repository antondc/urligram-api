import 'module-alias/register';
import express, { Request } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import UserController from './Controllers/UserController';

import config from '@root/config.test.json';

const app = express();

// Parsing - - - - - - - - - - - - - - - -
app.use(bodyParser.urlencoded({ extended: false })); // Parsing application/x-www-form-urlencoded:

app.use(bodyParser.json()); // Parsing body
app.use(express.json()); // Parsing JSON
app.use(express.urlencoded({ extended: false })); // Parsing req.body
app.use(cookieParser()); // Parsing cookies
// - - - - - - - - - - - - - - - - - - - -

app.use('/v1/user', UserController);

const server = http.createServer(app);

server.listen(config[process.env.NODE_ENV].PORT_SERVER);
