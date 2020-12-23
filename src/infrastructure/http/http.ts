import 'module-alias/register';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import logger from 'morgan';

import { AuthMiddleware } from '@infrastructure/http/middlewares/AuthMiddleware';
import { ErrorHandlerMiddleware } from '@infrastructure/http/middlewares/ErrorHandlerMiddleware';
import { RouterV1 } from '@infrastructure/http/routesV1';
import { ENDPOINT_CLIENTS, PORT_SERVER } from '@shared/constants/env';
import { NetWorkError } from '@shared/errors/NetworkError';
import { removeTrailingSlash } from '@tools/helpers/string/removeTrailingSlash';

const app = express();

/* - - - - - - - - - - - Cors - - - - - - - - - - - - - - */
const corsTestOrigin = (origin, callback) => {
  if (ENDPOINT_CLIENTS.indexOf(removeTrailingSlash(origin)) !== -1 || !origin) {
    callback(null, true);
  } else {
    callback(new NetWorkError('Not allowed by CORS', 403));
  }
};

app.use(
  cors({
    credentials: true,
    origin: corsTestOrigin,
  })
);
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
