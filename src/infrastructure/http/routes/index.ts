import express from 'express';
import { HealthCheckRoute } from '@infrastructure/http/routes/HealthCheckRoute';
import { UsersRoute } from '@infrastructure/http/routes/UsersRoute';
import { ResetContentRoute } from '@infrastructure/http/routes/ResetContentRoute';
import { LoginRoute } from '@infrastructure/http/routes/LoginRoute';
import { LanguagesRoute } from '@infrastructure/http/routes/LanguagesRoute';

const RouterV1 = express.Router();

RouterV1.get('/', (req, res) => {
  return res.json('System up').end();
});

RouterV1.use('/health-check', HealthCheckRoute);
RouterV1.use('/login', LoginRoute);
RouterV1.use('/users', UsersRoute);
RouterV1.use('/reset-content', ResetContentRoute);
RouterV1.use('/languages', LanguagesRoute);

export { RouterV1 };
