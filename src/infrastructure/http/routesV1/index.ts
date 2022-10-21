import express from 'express';

import { BookmarksRoute } from '@infrastructure/http/routesV1/BookmarksRoute';
import { FilesRoute } from '@infrastructure/http/routesV1/FilesRoute';
import { LanguagesRoute } from '@infrastructure/http/routesV1/LanguagesRoute';
import { LinksRoute } from '@infrastructure/http/routesV1/LinksRoute';
import { ListsRoute } from '@infrastructure/http/routesV1/ListsRoute';
import { LoginRoute } from '@infrastructure/http/routesV1/LoginRoute';
import { StateRoute } from '@infrastructure/http/routesV1/StateRoute';
import { TagsRoute } from '@infrastructure/http/routesV1/TagsRoute';
import { UsersRoute } from '@infrastructure/http/routesV1/UsersRoute';
import { XmlRoute } from './XMLRoute';

const RouterV1 = express.Router();

RouterV1.use('/:language([a-z]{2})?/xml', XmlRoute);
RouterV1.use('/state', StateRoute);
RouterV1.use('/login', LoginRoute);
RouterV1.use('/users', UsersRoute);
RouterV1.use('/bookmarks', BookmarksRoute);
RouterV1.use('/languages', LanguagesRoute);
RouterV1.use('/links', LinksRoute);
RouterV1.use('/lists', ListsRoute);
RouterV1.use('/tags', TagsRoute);
RouterV1.use('/files', FilesRoute);

export { RouterV1 };
