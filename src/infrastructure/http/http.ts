import 'module-alias/register';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
// import fs from 'fs';
import http from 'http';
// import https from 'https';
import logger from 'morgan';

// import path from 'path';
import { AuthMiddleware } from '@infrastructure/http/middlewares/AuthMiddleware';
import { ErrorHandlerMiddleware } from '@infrastructure/http/middlewares/ErrorHandlerMiddleware';
import { RouterV1 } from '@infrastructure/http/routesV1';
import { /* DEVELOPMENT,*/ ENDPOINT_CLIENTS, PORT_SERVER } from '@shared/constants/env';

const app = express();

/* - - - - - - - - - - - Cors - - - - - - - - - - - - - - */
app.use(cors({ credentials: true, origin: ENDPOINT_CLIENTS }));
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

/* - - - - - - - - - - - SSL options - - - - - - - - - - - - - - */
// const certOptions = {
//   key: fs.readFileSync(path.resolve(process.cwd(), 'src', 'infrastructure', 'http', 'ssl', 'private.key')),
//   cert: fs.readFileSync(path.resolve(process.cwd(), 'src', 'infrastructure', 'http', 'ssl', 'private.crt')),
// };
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/

/* - - - - - - - - - - - Server - - - - - - - - - - - - - -*/
const server = /*DEVELOPMENT ? https.createServer(certOptions, app) : */ http.createServer(app);

server.listen(PORT_SERVER);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
