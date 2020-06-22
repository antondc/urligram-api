import express from 'express';
import { UsersRoute } from '@infrastructure/http/routesV1/UsersRoute';
import { StateRoute } from '@infrastructure/http/routesV1/StateRoute';
import { LoginRoute } from '@infrastructure/http/routesV1/LoginRoute';
import { LanguagesRoute } from '@infrastructure/http/routesV1/LanguagesRoute';

const RouterV1 = express.Router();

RouterV1.use('/state', StateRoute);
RouterV1.use('/login', LoginRoute);
RouterV1.use('/users', UsersRoute);
RouterV1.use('/languages', LanguagesRoute);

export { RouterV1 };
