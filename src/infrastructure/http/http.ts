import 'module-alias/register';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import HealthCheck from '@root/src/infrastructure/http/controllers/HealthCheckController';
import User from '@root/src/infrastructure/http/controllers/CreateUserController';
import ResetContent from '@root/src/infrastructure/http/controllers/ResetContentController';
import config from '@root/config.test.json';
import logger from 'morgan';
import cors from 'cors';

const app = express();

/* - - - - - - - - - - - Cors - - - - - - - - - - - - - - */
app.use(cors({ credentials: true, origin: process.env.URL_CLIENT }));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/

/* - - - - - - - - - - - Static - - - - - - - - - - - - - */
// Serving static files
app.use(express.static('media/docs'));
app.use(express.static('media/images'));
app.use('/media', express.static('media'));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/

/* - - - - - - - - - - - Parsers - - - - - - - - - - - - -*/
// Parsing application/x-www-form-urlencoded:
app.use(bodyParser.urlencoded({ extended: false }));
// Parsing body
app.use(bodyParser.json());
// Parsing JSON
app.use(express.json());
// Parsing req.body
app.use(express.urlencoded({ extended: false }));
// Parsing cookies
app.use(cookieParser());
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/* - - - - - - - - - - - Loggers - - - - - - - - - - - - - */
app.use(logger('dev'));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/* - - - - - - - - - - - Routes - - - - - - - - - - - - - -*/
app.use('/v1/health-check', HealthCheck);
app.use('/v1/user', User);
app.use('/v1/reset-content', ResetContent);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/* - - - - - - - - - - - Errors - - - - - - - - - - - - - -*/
app.use(function (err: any, req: any, res: any, next: any) {
  if (err.name === 'UnauthorizedError') {
    return res.redirect(303, '/login');
  }

  next(err);
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/* - - - - - - - - - - - Server - - - - - - - - - - - - - -*/
const server = http.createServer(app);

server.listen(config[process.env.NODE_ENV].PORT_SERVER);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
