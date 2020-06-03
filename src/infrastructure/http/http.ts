import 'module-alias/register';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import UserController from '@infrastructure/http/routes/User';
import config from '@root/config.test.json';

const app = express();

/* - - - - - - - Parsing - - - - - - - - - */
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
/* - - - - - - - Parsing - - - - - - - - - */

app.use('/v1/user', UserController);

const server = http.createServer(app);

server.listen(config[process.env.NODE_ENV].PORT_SERVER);
