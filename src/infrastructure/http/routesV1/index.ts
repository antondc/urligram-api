import express from 'express';

import { LanguagesRoute } from '@infrastructure/http/routesV1/LanguagesRoute';
import { LinksRoute } from '@infrastructure/http/routesV1/LinksRoute';
import { LoginRoute } from '@infrastructure/http/routesV1/LoginRoute';
import { StateRoute } from '@infrastructure/http/routesV1/StateRoute';
import { UsersRoute } from '@infrastructure/http/routesV1/UsersRoute';

const RouterV1 = express.Router();

RouterV1.use('/state', StateRoute);
RouterV1.use('/login', LoginRoute);
RouterV1.use('/users', UsersRoute);
RouterV1.use('/languages', LanguagesRoute);
RouterV1.use('/links', LinksRoute);

export { RouterV1 };
