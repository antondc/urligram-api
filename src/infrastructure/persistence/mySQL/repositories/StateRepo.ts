import fs from 'fs';
import path from 'path';

import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { NetWorkError } from '@root/src/shared/errors/NetworkError';
import { RESTORE_DATA, RESTORE_MODELS, RESTORE_PROCEDURES } from '@shared/constants/env';

export class StateRepo {
  // Operation tables
  private dropAllTables: string;
  private debugMessages: string;

  // Models
  private language: string;
  private glossary: string;
  private domain: string;
  private link: string;
  private user: string;
  private bookmark: string;
  private list: string;
  private bookmarkList: string;
  private listBookmarkUser: string;
  private tag: string;
  private bookmarkTag: string;
  private userLink: string;
  private userList: string;
  private userLogins: string;
  private userUser: string;

  // Procedures
  private debuggerProcedure: string;
  private languageGetOneProcedure: string;
  private languageGetAllProcedure: string;
  private userGetAllProcedure: string;
  private userGetByIdsProcedure: string;
  private userGetCredentialsProcedure: string;
  private userGetOneProcedure: string;
  private userCreateOneProcedure: string;
  private userCreateConfirmationProcedure: string;
  private userForgotPasswordProcedure: string;
  private userUpdateOneProcedure: string;
  private userDeleteOneProcedure: string;
  private userLoginProcedure: string;
  private userLogSessionProcedure: string;
  private userResetPasswordProcedure: string;
  private userFollowingGetAllProcedure: string;
  private userFollowingGetOneProcedure: string;
  private userFollowingCreateProcedure: string;
  private userFollowingDeleteProcedure: string;
  private userFollowerGetAllProcedure: string;
  private userBookmarkGetAllProcedure: string;
  private userBookmarkGetOneByBookmarkIdUserIdProcedure: string;
  private userBookmarkGetOneByLinkIdUserIdProcedure: string;
  private userBookmarkGetOneByUserIdPathDomainProcedure: string;
  private userBookmarkCreateProcedure: string;
  private userBookmarkUpdateProcedure: string;
  private userBookmarkDeleteOneProcedure: string;
  private userListGetAllPublicProcedure: string;
  private userTagsGetAllProcedure: string;
  private userRecommendedProcedure: string;
  private bookmarkGetOneProcedure: string;
  private bookmarkGetAllPublicProcedure: string;
  private bookmarkGetAllByLinkIdProcedure: string;
  private bookmarkTagGetAllProcedure: string;
  private bookmarkListGetAllProcedure: string;
  private linkGetOneProcedure: string;
  private linkGetAllProcedure: string;
  private linkUpsertOneProcedure: string;
  private linkVoteOneProcedure: string;
  private linkListGetAllPublicProcedure: string;
  private linkTagGetAllProcedure: string;
  private listGetOneByIdProcedure: string;
  private listGetAllProcedure: string;
  private listCreateOneProcedure: string;
  private listUpdateOneProcedure: string;
  private listDeleteOneProcedure: string;
  private linkGetVotesProcedure: string;
  private listBookmarkGetOneProcedure: string;
  private listBookmarkGetAllProcedure: string;
  private listBookmarkCreateOneProcedure: string;
  private listBookmarkDeleteOneProcedure: string;
  private listUserGetOneByListNameProcedure: string;
  private listUserGetOneByListIdProcedure: string;
  private listUserGetAllProcedure: string;
  private listUserCreateOneProcedure: string;
  private listUserUpdateOneProcedure: string;
  private listUserDeleteOneProcedure: string;
  private listTagsGetAllProcedure: string;
  private listSimilarGetAllProcedure: string;
  private listBookmarkUserUpsertOne: string;
  private tagGetAllProcedure: string;
  private tagListGetAllPublicProcedure: string;
  private tagBookmarkGetAllPublicProcedure: string;
  private tagUserGetAllPublicProcedure: string;

  // Data
  private domainData: string;
  private languageData: string;
  private glossaryData: string;
  private linkData: string;
  private userData: string;
  private bookmarkData: string;
  private listData: string;
  private bookmarkListData: string;
  private tagData: string;
  private bookmarkTagData: string;
  private userLinkData: string;
  private userListData: string;
  private userLoginData: string;
  private userUserData: string;

  constructor() {
    // Operational tables
    this.dropAllTables = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/dropAllTables.sql')).toString();
    this.debugMessages = fs.readFileSync(path.resolve(__dirname, '../sql/models/debugMessages.sql')).toString();

    // Models
    this.language = fs.readFileSync(path.resolve(__dirname, '../sql/models/language.sql')).toString();
    this.glossary = fs.readFileSync(path.resolve(__dirname, '../sql/models/glossary.sql')).toString();
    this.domain = fs.readFileSync(path.resolve(__dirname, '../sql/models/domain.sql')).toString();
    this.link = fs.readFileSync(path.resolve(__dirname, '../sql/models/link.sql')).toString();
    this.user = fs.readFileSync(path.resolve(__dirname, '../sql/models/user.sql')).toString();
    this.bookmark = fs.readFileSync(path.resolve(__dirname, '../sql/models/bookmark.sql')).toString();
    this.list = fs.readFileSync(path.resolve(__dirname, '../sql/models/list.sql')).toString();
    this.bookmarkList = fs.readFileSync(path.resolve(__dirname, '../sql/models/bookmarkList.sql')).toString();
    this.listBookmarkUser = fs.readFileSync(path.resolve(__dirname, '../sql/models/listBookmarkUser.sql')).toString();
    this.tag = fs.readFileSync(path.resolve(__dirname, '../sql/models/tag.sql')).toString();
    this.bookmarkTag = fs.readFileSync(path.resolve(__dirname, '../sql/models/bookmarkTag.sql')).toString();
    this.userLink = fs.readFileSync(path.resolve(__dirname, '../sql/models/userLink.sql')).toString();
    this.userList = fs.readFileSync(path.resolve(__dirname, '../sql/models/userList.sql')).toString();
    this.userLogins = fs.readFileSync(path.resolve(__dirname, '../sql/models/userLog.sql')).toString();
    this.userUser = fs.readFileSync(path.resolve(__dirname, '../sql/models/userUser.sql')).toString();

    // Stored procedures
    this.debuggerProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/debugger.sql')).toString();
    this.languageGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/languageGetOne.sql')).toString();
    this.languageGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/languageGetAll.sql')).toString();
    this.userGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userGetAll.sql')).toString();
    this.userGetByIdsProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userGetByIds.sql')).toString();
    this.userGetCredentialsProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userGetCredentials.sql')).toString();
    this.userGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userGetOne.sql')).toString();
    this.userCreateOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userCreateOne.sql')).toString();
    this.userCreateConfirmationProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userCreateConfirmation.sql')).toString();
    this.userForgotPasswordProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userForgotPassword.sql')).toString();
    this.userUpdateOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userUpdateOne.sql')).toString();
    this.userDeleteOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userDeleteOne.sql')).toString();
    this.userLoginProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userLogin.sql')).toString();
    this.userLogSessionProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userLogSession.sql')).toString();
    this.userResetPasswordProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userResetPassword.sql')).toString();
    this.userFollowingGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userFollowingGetAll.sql')).toString();
    this.userFollowingGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userFollowingGetOne.sql')).toString();
    this.userFollowingCreateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userFollowingCreate.sql')).toString();
    this.userFollowingDeleteProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userFollowingDelete.sql')).toString();
    this.userFollowerGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userFollowerGetAll.sql')).toString();
    this.userBookmarkGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userBookmarkGetAll.sql')).toString();
    this.userBookmarkGetOneByBookmarkIdUserIdProcedure = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userBookmarkGetOneByBookmarkIdUserId.sql'))
      .toString();
    this.userBookmarkGetOneByLinkIdUserIdProcedure = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userBookmarkGetOneByLinkIdUserId.sql'))
      .toString();
    this.userBookmarkGetOneByUserIdPathDomainProcedure = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userBookmarkGetOneByUserIdPathDomain.sql'))
      .toString();
    this.userBookmarkCreateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userBookmarkCreate.sql')).toString();
    this.userBookmarkUpdateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userBookmarkUpdate.sql')).toString();
    this.userBookmarkDeleteOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userBookmarkDeleteOne.sql')).toString();
    this.userListGetAllPublicProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userListGetAllPublic.sql')).toString();
    this.userTagsGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userTagsGetAll.sql')).toString();
    this.userRecommendedProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userRecommended.sql')).toString();
    this.bookmarkGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/bookmarkGetOne.sql')).toString();
    this.bookmarkGetAllPublicProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/bookmarkGetAllPublic.sql')).toString();
    this.bookmarkGetAllByLinkIdProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/bookmarkGetAllByLinkId.sql')).toString();
    this.bookmarkTagGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/bookmarkTagGetAll.sql')).toString();
    this.bookmarkListGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/bookmarkListGetAll.sql')).toString();
    this.linkGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkGetOne.sql')).toString();
    this.linkGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkGetAll.sql')).toString();
    this.linkUpsertOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkUpsertOne.sql')).toString();
    this.linkVoteOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkVoteOne.sql')).toString();
    this.linkListGetAllPublicProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkListGetAllPublic.sql')).toString();
    this.linkTagGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkTagGetAll.sql')).toString();
    this.listGetOneByIdProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listGetOneById.sql')).toString();
    this.listGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listGetAll.sql')).toString();
    this.listCreateOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listCreateOne.sql')).toString();
    this.listUpdateOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listUpdateOne.sql')).toString();
    this.listDeleteOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listDeleteOne.sql')).toString();
    this.linkGetVotesProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkGetVotes.sql')).toString();
    this.listBookmarkGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listBookmarkGetOne.sql')).toString();
    this.listBookmarkGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listBookmarkGetAll.sql')).toString();
    this.listBookmarkCreateOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listBookmarkCreateOne.sql')).toString();
    this.listBookmarkDeleteOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listBookmarkDeleteOne.sql')).toString();
    this.listUserGetOneByListNameProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listUserGetOneByListName.sql')).toString();
    this.listUserGetOneByListIdProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listUserGetOneByListId.sql')).toString();
    this.listUserGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listUserGetAll.sql')).toString();
    this.listUserCreateOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listUserCreateOne.sql')).toString();
    this.listUserUpdateOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listUserUpdateOne.sql')).toString();
    this.listUserDeleteOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listUserDeleteOne.sql')).toString();
    this.listTagsGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listTagsGetAll.sql')).toString();
    this.listSimilarGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listSimilarGetAll.sql')).toString();
    this.listBookmarkUserUpsertOne = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listBookmarkUserUpsertOne.sql')).toString();
    this.tagGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/tagGetAll.sql')).toString();
    this.tagListGetAllPublicProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/tagListGetAllPublic.sql')).toString();
    this.tagBookmarkGetAllPublicProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/tagBookmarkGetAllPublic.sql')).toString();
    this.tagUserGetAllPublicProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/tagUserGetAllPublic.sql')).toString();

    //  Data
    this.domainData = fs.readFileSync(path.resolve(__dirname, '../sql/data/domain.sql')).toString();
    this.languageData = fs.readFileSync(path.resolve(__dirname, '../sql/data/language.sql')).toString();
    this.glossaryData = fs.readFileSync(path.resolve(__dirname, '../sql/data/glossary.sql')).toString();
    this.linkData = fs.readFileSync(path.resolve(__dirname, '../sql/data/link.sql')).toString();
    this.userData = fs.readFileSync(path.resolve(__dirname, '../sql/data/user.sql')).toString();
    this.bookmarkData = fs.readFileSync(path.resolve(__dirname, '../sql/data/bookmark.sql')).toString();
    this.listData = fs.readFileSync(path.resolve(__dirname, '../sql/data/list.sql')).toString();
    this.bookmarkListData = fs.readFileSync(path.resolve(__dirname, '../sql/data/bookmarkList.sql')).toString();
    this.tagData = fs.readFileSync(path.resolve(__dirname, '../sql/data/tag.sql')).toString();
    this.bookmarkTagData = fs.readFileSync(path.resolve(__dirname, '../sql/data/bookmarkTag.sql')).toString();
    this.userUserData = fs.readFileSync(path.resolve(__dirname, '../sql/data/userUser.sql')).toString();
    this.userLinkData = fs.readFileSync(path.resolve(__dirname, '../sql/data/userLink.sql')).toString();
    this.userListData = fs.readFileSync(path.resolve(__dirname, '../sql/data/userList.sql')).toString();
    this.userLoginData = fs.readFileSync(path.resolve(__dirname, '../sql/data/userLog.sql')).toString();
  }

  public async resetContent() {
    const mySQL = new MySQL({ multipleStatements: true });

    try {
      return {
        // Drop all tables
        ...(!!RESTORE_MODELS && (await mySQL.query(this.dropAllTables))),
        ...(!!RESTORE_MODELS && (await mySQL.query(`CALL drop_all_tables()`))),

        // Create tables
        ...(!!RESTORE_MODELS && (await mySQL.query(this.debugMessages))),
        ...(!!RESTORE_MODELS && (await mySQL.query(this.language))),
        ...(!!RESTORE_MODELS && (await mySQL.query(this.glossary))),
        ...(!!RESTORE_MODELS && (await mySQL.query(this.domain))),
        ...(!!RESTORE_MODELS && (await mySQL.query(this.link))),
        ...(!!RESTORE_MODELS && (await mySQL.query(this.user))),
        ...(!!RESTORE_MODELS && (await mySQL.query(this.bookmark))),
        ...(!!RESTORE_MODELS && (await mySQL.query(this.list))),
        ...(!!RESTORE_MODELS && (await mySQL.query(this.bookmarkList))),
        ...(!!RESTORE_MODELS && (await mySQL.query(this.listBookmarkUser))),
        ...(!!RESTORE_MODELS && (await mySQL.query(this.tag))),
        ...(!!RESTORE_MODELS && (await mySQL.query(this.bookmarkTag))),
        ...(!!RESTORE_MODELS && (await mySQL.query(this.userLink))),
        ...(!!RESTORE_MODELS && (await mySQL.query(this.userList))),
        ...(!!RESTORE_MODELS && (await mySQL.query(this.userLogins))),
        ...(!!RESTORE_MODELS && (await mySQL.query(this.userUser))),

        // Create procedures
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.debuggerProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.languageGetOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.languageGetAllProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userGetAllProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userGetByIdsProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userGetCredentialsProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userGetOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userCreateOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userCreateConfirmationProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userForgotPasswordProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userUpdateOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userDeleteOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userLoginProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userLogSessionProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userResetPasswordProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userFollowingGetAllProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userFollowingGetOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userFollowingCreateProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userFollowingDeleteProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userFollowerGetAllProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userBookmarkGetAllProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userBookmarkGetOneByBookmarkIdUserIdProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userBookmarkGetOneByLinkIdUserIdProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userBookmarkGetOneByUserIdPathDomainProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userBookmarkCreateProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userBookmarkUpdateProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userBookmarkDeleteOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userListGetAllPublicProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userTagsGetAllProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.userRecommendedProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.bookmarkGetOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.bookmarkGetAllPublicProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.bookmarkGetAllByLinkIdProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.bookmarkTagGetAllProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.bookmarkListGetAllProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.linkGetOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.linkGetAllProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.linkUpsertOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.linkVoteOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.linkListGetAllPublicProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.linkTagGetAllProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listGetOneByIdProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listGetAllProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listCreateOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listUpdateOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listDeleteOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.linkGetVotesProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listBookmarkGetOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listBookmarkGetAllProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listBookmarkCreateOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listBookmarkDeleteOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listUserGetOneByListNameProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listUserGetOneByListIdProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listUserGetAllProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listUserCreateOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listUserUpdateOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listUserDeleteOneProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listTagsGetAllProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listSimilarGetAllProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.listBookmarkUserUpsertOne))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.tagGetAllProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.tagListGetAllPublicProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.tagBookmarkGetAllPublicProcedure))),
        ...(!!RESTORE_PROCEDURES && (await mySQL.query(this.tagUserGetAllPublicProcedure))),

        // Insert data
        ...(!!RESTORE_DATA && (await mySQL.query(this.domainData))),
        ...(!!RESTORE_DATA && (await mySQL.query(this.languageData))), // As languages are isolated we can modify them without affecting the rest of the DB
        ...(!!RESTORE_DATA && (await mySQL.query(this.glossaryData))), // As languages are isolated we can modify them without affecting the rest of the DB
        ...(!!RESTORE_DATA && (await mySQL.query(this.linkData))),
        ...(!!RESTORE_DATA && (await mySQL.query(this.userData))),
        ...(!!RESTORE_DATA && (await mySQL.query(this.bookmarkData))),
        ...(!!RESTORE_DATA && (await mySQL.query(this.listData))),
        ...(!!RESTORE_DATA && (await mySQL.query(this.bookmarkListData))),
        ...(!!RESTORE_DATA && (await mySQL.query(this.tagData))),
        ...(!!RESTORE_DATA && (await mySQL.query(this.bookmarkTagData))),
        ...(!!RESTORE_DATA && (await mySQL.query(this.userLinkData))),
        ...(!!RESTORE_DATA && (await mySQL.query(this.userListData))),
        ...(!!RESTORE_DATA && (await mySQL.query(this.userLoginData))),
        ...(!!RESTORE_DATA && (await mySQL.query(this.userUserData))),
      };
    } catch (err) {
      mySQL.rollback();
      throw new NetWorkError('There was a problem resetting the DB', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async healthCheck() {
    const mySQL = new MySQL();

    const response = await mySQL.query('SELECT version() AS version, @@sql_mode AS SQLMode');
    await mySQL.close();

    return response;
  }
}
