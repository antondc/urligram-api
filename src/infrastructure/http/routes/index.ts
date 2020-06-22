import express from 'express';
import { UsersRoute } from '@infrastructure/http/routes/UsersRoute';
import { StateRoute } from '@infrastructure/http/routes/StateRoute';
import { LoginRoute } from '@infrastructure/http/routes/LoginRoute';
import { LanguagesRoute } from '@infrastructure/http/routes/LanguagesRoute';

const RouterV1 = express.Router();

RouterV1.use('/state', StateRoute);
RouterV1.use('/login', LoginRoute);
RouterV1.use('/users', UsersRoute);
RouterV1.use('/languages', LanguagesRoute);

export { RouterV1 };
