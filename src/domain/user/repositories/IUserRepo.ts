import { IUserBookmarkCreateRequest } from './interfaces/IUserBookmarkCreateRequest';
import { IUserBookmarkCreateResponse } from './interfaces/IUserBookmarkCreateResponse';
import { IUserBookmarkDeleteOneRequest } from './interfaces/IUserBookmarkDeleteOneRequest';
import { IUserBookmarkDeleteOneResponse } from './interfaces/IUserBookmarkDeleteOneResponse';
import { IUserBookmarkGetAllRequest } from './interfaces/IUserBookmarkGetAllRequest';
import { IUserBookmarkGetAllResponse } from './interfaces/IUserBookmarkGetAllResponse';
import { IUserBookmarkGetOneByBookmarkIdUserIdRequest } from './interfaces/IUserBookmarkGetOneByBookmarkIdUserIdRequest';
import { IUserBookmarkGetOneByBookmarkIdUserIdResponse } from './interfaces/IUserBookmarkGetOneByBookmarkIdUserIdResponse';
import { IUserBookmarkGetOneByLinkIdUserIdRequest } from './interfaces/IUserBookmarkGetOneByLinkIdUserIdRequest';
import { IUserBookmarkGetOneByLinkIdUserIdResponse } from './interfaces/IUserBookmarkGetOneByLinkIdUserIdResponse';
import { IUserBookmarkGetOneByUserIdPathDomainRequest } from './interfaces/IUserBookmarkGetOneByUserIdPathDomainRequest';
import { IUserBookmarkGetOneByUserIdPathDomainResponse } from './interfaces/IUserBookmarkGetOneByUserIdPathDomainResponse';
import { IUserBookmarkUpdateRequest } from './interfaces/IUserBookmarkUpdateRequest';
import { IUserBookmarkUpdateResponse } from './interfaces/IUserBookmarkUpdateResponse';
import { IUserCreateOneRequest } from './interfaces/IUserCreateOneRequest';
import { IUserCreateOneResponse } from './interfaces/IUserCreateOneResponse';
import { IUserDeleteOneRequest } from './interfaces/IUserDeleteOneRequest';
import { IUserDeleteOneResponse } from './interfaces/IUserDeleteOneResponse';
import { IUserFollowerGetAllRequest } from './interfaces/IUserFollowerGetAllRequest';
import { IUserFollowerGetAllResponse } from './interfaces/IUserFollowerGetAllResponse';
import { IUserFollowingCreateRequest } from './interfaces/IUserFollowingCreateRequest';
import { IUserFollowingCreateResponse } from './interfaces/IUserFollowingCreateResponse';
import { IUserFollowingDeleteRequest } from './interfaces/IUserFollowingDeleteRequest';
import { IUserFollowingDeleteResponse } from './interfaces/IUserFollowingDeleteResponse';
import { IUserFollowingGetAllRequest } from './interfaces/IUserFollowingGetAllRequest';
import { IUserFollowingGetAllResponse } from './interfaces/IUserFollowingGetAllResponse';
import { IUserFollowingGetOneRequest } from './interfaces/IUserFollowingGetOneRequest';
import { IUserFollowingGetOneResponse } from './interfaces/IUserFollowingGetOneResponse';
import { IUserGetAllRequest } from './interfaces/IUserGetAllRequest';
import { IUserGetAllResponse } from './interfaces/IUserGetAllResponse';
import { IUserGetOneRequest } from './interfaces/IUserGetOneRequest';
import { IUserGetOneResponse } from './interfaces/IUserGetOneResponse';
import { IUserListGetAllPublicRequest } from './interfaces/IUserListGetAllPublicRequest';
import { IUserListGetAllPublicResponse } from './interfaces/IUserListGetAllPublicResponse';
import { IUserLoginRequest } from './interfaces/IUserLoginRequest';
import { IUserLoginResponse } from './interfaces/IUserLoginResponse';
import { IUserLogSessionRequest } from './interfaces/IUserLogSessionRequest';
import { IUserLogSessionResponse } from './interfaces/IUserLogSessionResponse';
import { IUserPasswordUpdateRequest } from './interfaces/IUserPasswordUpdateRequest';
import { IUserPasswordUpdateResponse } from './interfaces/IUserPasswordUpdateResponse';
import { IUserTagsGetAllRequest } from './interfaces/IUserTagsGetAllRequest';
import { IUserTagsGetAllResponse } from './interfaces/IUserTagsGetAllResponse';
import { IUserUpdateOneRequest } from './interfaces/IUserUpdateOneRequest';
import { IUserUpdateOneResponse } from './interfaces/IUserUpdateOneResponse';

export interface IUserRepo {
  userGetOne: (userGetOneRequest: IUserGetOneRequest) => Promise<IUserGetOneResponse>;
  userGetAll: (uSerGetAllRequest: IUserGetAllRequest) => Promise<IUserGetAllResponse>;
  userCreateOne: (userCreateOneRequest: IUserCreateOneRequest) => Promise<IUserCreateOneResponse>;
  userUpdateOne: (userUpdateOneRequest: IUserUpdateOneRequest) => Promise<IUserUpdateOneResponse>;
  userDeleteOne: (userDeleteOneRequest: IUserDeleteOneRequest) => Promise<IUserDeleteOneResponse>;
  userLogin: (userLoginRequest: IUserLoginRequest) => Promise<IUserLoginResponse>;
  userLogSession: (userLogSessionRequest: IUserLogSessionRequest) => Promise<IUserLogSessionResponse>;
  userPasswordUpdate: (userPasswordUpdateRequest: IUserPasswordUpdateRequest) => Promise<IUserPasswordUpdateResponse>;
  userFollowingGetAll: (userFollowingGetAllRequest: IUserFollowingGetAllRequest) => Promise<IUserFollowingGetAllResponse>;
  userFollowingGetOne: (userFollowingGetOneRequest: IUserFollowingGetOneRequest) => Promise<IUserFollowingGetOneResponse>;
  userFollowingCreate: (userFollowingCreateRequest: IUserFollowingCreateRequest) => Promise<IUserFollowingCreateResponse>;
  userFollowingDelete: (userFollowingDeleteRequest: IUserFollowingDeleteRequest) => Promise<IUserFollowingDeleteResponse>;
  userFollowerGetAll: (userFollowerGetAll: IUserFollowerGetAllRequest) => Promise<IUserFollowerGetAllResponse>;
  userBookmarkGetAll: (userBookmarkGetAll: IUserBookmarkGetAllRequest) => Promise<IUserBookmarkGetAllResponse>;
  userBookmarkGetOneByBookmarkIdUserId: (
    userBookmarkGetOneByBookmarkIdUserId: IUserBookmarkGetOneByBookmarkIdUserIdRequest
  ) => Promise<IUserBookmarkGetOneByBookmarkIdUserIdResponse>;
  userBookmarkGetOneByLinkIdUserId: (
    userBookmarkGetOneByLinkIdUserId: IUserBookmarkGetOneByLinkIdUserIdRequest
  ) => Promise<IUserBookmarkGetOneByLinkIdUserIdResponse>;
  userBookmarkGetOneByUserIdPathDomain: (
    userBookmarkGetOneByUserIdPathDomain: IUserBookmarkGetOneByUserIdPathDomainRequest
  ) => Promise<IUserBookmarkGetOneByUserIdPathDomainResponse>;
  userBookmarkCreate: (userBookmarkCreate: IUserBookmarkCreateRequest) => Promise<IUserBookmarkCreateResponse>;
  userBookmarkUpdate: (userBookmarkUpdate: IUserBookmarkUpdateRequest) => Promise<IUserBookmarkUpdateResponse>;
  userBookmarkDeleteOne: (userBookmarkDeleteOne: IUserBookmarkDeleteOneRequest) => Promise<IUserBookmarkDeleteOneResponse>;
  userListGetAllPublic: (userListGetAllPublic: IUserListGetAllPublicRequest) => Promise<IUserListGetAllPublicResponse>;
  userTagsGetAll: (userTagsGetAll: IUserTagsGetAllRequest) => Promise<IUserTagsGetAllResponse>;
}
