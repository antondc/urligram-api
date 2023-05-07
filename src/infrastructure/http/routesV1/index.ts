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

const RouterV1 = express.Router({ mergeParams: true });

RouterV1.use('/:language([a-z]{2})?/xml', XmlRoute);
RouterV1.use('/:language([a-z]{2})?/state', StateRoute);
RouterV1.use('/:language([a-z]{2})?/login', LoginRoute);
RouterV1.use('/:language([a-z]{2})?/users', UsersRoute);
RouterV1.use('/:language([a-z]{2})?/bookmarks', BookmarksRoute);
RouterV1.use('/:language([a-z]{2})?/languages', LanguagesRoute);
RouterV1.use('/:language([a-z]{2})?/links', LinksRoute);
RouterV1.use('/:language([a-z]{2})?/lists', ListsRoute);
RouterV1.use('/:language([a-z]{2})?/tags', TagsRoute);
RouterV1.use('/:language([a-z]{2})?/files', FilesRoute);

export { RouterV1 };
