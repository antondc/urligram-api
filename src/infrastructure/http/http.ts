import 'module-alias/register';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { RouterV1 } from './routes';
import { AuthMiddleware } from '@infrastructure/http/middlewares/AuthMiddleware';
import { ErrorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware';
import { ENDPOINT_CLIENT, PORT_SERVER } from '@shared/constants/env';

const app = express();

/* - - - - - - - - - - - Cors - - - - - - - - - - - - - - */
app.use(cors({ credentials: true, origin: ENDPOINT_CLIENT }));
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
app.use('*', AuthMiddleware);
app.use('/api/v1/', RouterV1);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/* - - - - - - - - - - - Errors Handler - - - - - - - - - - - - - -*/
app.use('*', ErrorHandlerMiddleware);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/* - - - - - - - - - - - Server - - - - - - - - - - - - - -*/
const server = http.createServer(app);

server.listen(PORT_SERVER);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
