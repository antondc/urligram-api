import fs from 'fs';
import path from 'path';

import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { NetWorkError } from '@root/src/shared/errors/NetworkError';

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
  private tag: string;
  private bookmarkTag: string;
  private userList: string;
  private userLogins: string;
  private userUser: string;

  // Procedures
  private debuggerProcedure: string;
  private languageGetOneProcedure: string;
  private languageGetAllProcedure: string;
  private userGetAllProcedure: string;
  private userGetOneProcedure: string;
  private userCreateOneProcedure: string;
  private userUpdateOneProcedure: string;
  private userDeleteOneProcedure: string;
  private userLoginProcedure: string;
  private userLogSessionProcedure: string;
  private userPasswordUpdateProcedure: string;
  private userFollowingGetAllProcedure: string;
  private userFollowingGetOneProcedure: string;
  private userFollowingCreateProcedure: string;
  private userFollowingDeleteProcedure: string;
  private userFollowerGetAllProcedure: string;
  private userBookmarkGetAllProcedure: string;
  private userBookmarkGetOneProcedure: string;
  private userBookmarkCreateProcedure: string;
  private userBookmarkUpdateProcedure: string;
  private userBookmarkDeleteOneProcedure: string;
  private userListGetAllProcedure: string;
  private linkGetOneProcedure: string;
  private linkGetAllProcedure: string;
  private linkListGetAllProcedure: string;
  private linkTagGetAllProcedure: string;
  private listGetOneByIdProcedure: string;
  private listGetAllPublicProcedure: string;
  private listCreateOneProcedure: string;
  private listUpdateOneProcedure: string;
  private listBookmarkGetOneProcedure: string;
  private listUserGetOneByListNameProcedure: string;
  private listUserGetOneByListIdProcedure: string;
  private tagGetAllProcedure: string;

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
    this.tag = fs.readFileSync(path.resolve(__dirname, '../sql/models/tag.sql')).toString();
    this.bookmarkTag = fs.readFileSync(path.resolve(__dirname, '../sql/models/bookmarkTag.sql')).toString();
    this.userList = fs.readFileSync(path.resolve(__dirname, '../sql/models/userList.sql')).toString();
    this.userLogins = fs.readFileSync(path.resolve(__dirname, '../sql/models/userLog.sql')).toString();
    this.userUser = fs.readFileSync(path.resolve(__dirname, '../sql/models/userUser.sql')).toString();

    // Stored procedures
    this.debuggerProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/debugger.sql')).toString();
    this.languageGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/languageGetOne.sql')).toString();
    this.languageGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/languageGetAll.sql')).toString();
    this.userGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userGetAll.sql')).toString();
    this.userGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userGetOne.sql')).toString();
    this.userCreateOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userCreateOne.sql')).toString();
    this.userUpdateOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userUpdateOne.sql')).toString();
    this.userDeleteOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userDeleteOne.sql')).toString();
    this.userLoginProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userLogin.sql')).toString();
    this.userLogSessionProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userLogSession.sql')).toString();
    this.userPasswordUpdateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userPasswordUpdate.sql')).toString();
    this.userFollowingGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userFollowingGetAll.sql')).toString();
    this.userFollowingGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userFollowingGetOne.sql')).toString();
    this.userFollowingCreateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userFollowingCreate.sql')).toString();
    this.userFollowingDeleteProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userFollowingDelete.sql')).toString();
    this.userFollowerGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userFollowerGetAll.sql')).toString();
    this.userBookmarkGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userBookmarkGetAll.sql')).toString();
    this.userBookmarkGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userBookmarkGetOne.sql')).toString();
    this.userBookmarkCreateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userBookmarkCreate.sql')).toString();
    this.userBookmarkUpdateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userBookmarkUpdate.sql')).toString();
    this.userBookmarkDeleteOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userBookmarkDeleteOne.sql')).toString();
    this.userListGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userListGetAll.sql')).toString();
    this.linkGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkGetOne.sql')).toString();
    this.linkGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkGetAll.sql')).toString();
    this.linkListGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkListGetAll.sql')).toString();
    this.linkTagGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkTagGetAll.sql')).toString();
    this.listGetOneByIdProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listGetOneById.sql')).toString();
    this.listGetAllPublicProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listGetAllPublic.sql')).toString();
    this.listCreateOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listCreateOne.sql')).toString();
    this.listUpdateOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listUpdateOne.sql')).toString();
    this.listBookmarkGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listBookmarkGetOne.sql')).toString();
    this.listUserGetOneByListNameProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listUserGetOneByListName.sql')).toString();
    this.listUserGetOneByListIdProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listUserGetOneByListId.sql')).toString();
    this.tagGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/tagGetAll.sql')).toString();

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
    this.userListData = fs.readFileSync(path.resolve(__dirname, '../sql/data/userList.sql')).toString();
    this.userLoginData = fs.readFileSync(path.resolve(__dirname, '../sql/data/userLog.sql')).toString();
  }

  public async resetContent() {
    const mySQL = new MySQL({ multipleStatements: true });

    try {
      mySQL.beginTransaction();

      // Drop all tables
      const createDropAllTables = await mySQL.query(this.dropAllTables);
      const dropAllTables = await mySQL.query(`CALL drop_all_tables()`);

      // Create tables
      const createDebuggerTable = await mySQL.query(this.debugMessages);
      const createLanguageTable = await mySQL.query(this.language);
      const createGlossaryTable = await mySQL.query(this.glossary);
      const createDomainTable = await mySQL.query(this.domain);
      const createLinkTable = await mySQL.query(this.link);
      const createUserTable = await mySQL.query(this.user);
      const createLinkUserTable = await mySQL.query(this.bookmark);
      const createListTable = await mySQL.query(this.list);
      const createLinkUserListTable = await mySQL.query(this.bookmarkList);
      const createTagTable = await mySQL.query(this.tag);
      const createLinkUserTagTable = await mySQL.query(this.bookmarkTag);
      const createUserListTable = await mySQL.query(this.userList);
      const createUserLoginsTable = await mySQL.query(this.userLogins);
      const createUserUserTable = await mySQL.query(this.userUser);

      // Create procedures
      const createDebuggerProcedure = await mySQL.query(this.debuggerProcedure);
      const createLanguageGetOneProcedure = await mySQL.query(this.languageGetOneProcedure);
      const createLanguageGetAllProcedure = await mySQL.query(this.languageGetAllProcedure);
      const createUserGetAllProcedure = await mySQL.query(this.userGetAllProcedure);
      const createUserGetOneProcedure = await mySQL.query(this.userGetOneProcedure);
      const createUserCreateOneProcedure = await mySQL.query(this.userCreateOneProcedure);
      const createUserUpdateOneProcedure = await mySQL.query(this.userUpdateOneProcedure);
      const createUserDeleteOneProcedure = await mySQL.query(this.userDeleteOneProcedure);
      const createUserLoginProcedure = await mySQL.query(this.userLoginProcedure);
      const createUserLogSessionProcedure = await mySQL.query(this.userLogSessionProcedure);
      const createUserPasswordUpdateProcedure = await mySQL.query(this.userPasswordUpdateProcedure);
      const createUserFollowingGetAllProcedure = await mySQL.query(this.userFollowingGetAllProcedure);
      const createUserFollowingGetOneProcedure = await mySQL.query(this.userFollowingGetOneProcedure);
      const createUserFollowingCreateProcedure = await mySQL.query(this.userFollowingCreateProcedure);
      const createUserFollowingDeleteProcedure = await mySQL.query(this.userFollowingDeleteProcedure);
      const createUserFollowerGetAllProcedure = await mySQL.query(this.userFollowerGetAllProcedure);
      const createUserBookmarkGetAllProcedure = await mySQL.query(this.userBookmarkGetAllProcedure);
      const createUserBookmarkGetOneProcedure = await mySQL.query(this.userBookmarkGetOneProcedure);
      const createUserBookmarkCreateProcedure = await mySQL.query(this.userBookmarkCreateProcedure);
      const createUserBookmarkUpdateProcedure = await mySQL.query(this.userBookmarkUpdateProcedure);
      const createUserBookmarkDeleteOneProcedure = await mySQL.query(this.userBookmarkDeleteOneProcedure);
      const createUserListGetAllProcedure = await mySQL.query(this.userListGetAllProcedure);
      const createLinkGetOneProcedure = await mySQL.query(this.linkGetOneProcedure);
      const createLinkGetAllProcedure = await mySQL.query(this.linkGetAllProcedure);
      const createLinkListGetAllProcedure = await mySQL.query(this.linkListGetAllProcedure);
      const createLinkTagGetAllProcedure = await mySQL.query(this.linkTagGetAllProcedure);
      const createListGetOneByIdProcedure = await mySQL.query(this.listGetOneByIdProcedure);
      const createListGetAllPublicProcedure = await mySQL.query(this.listGetAllPublicProcedure);
      const createListCreateOneProcedure = await mySQL.query(this.listCreateOneProcedure);
      const createListUpdateOneProcedure = await mySQL.query(this.listUpdateOneProcedure);
      const createListBookmarkGetOneProcedure = await mySQL.query(this.listBookmarkGetOneProcedure);
      const createListUserGetOneByListNameProcedure = await mySQL.query(this.listUserGetOneByListNameProcedure);
      const createListUserGetOneByListIdProcedure = await mySQL.query(this.listUserGetOneByListIdProcedure);
      const createTagGetAllProcedure = await mySQL.query(this.tagGetAllProcedure);

      // Insert data
      const insertDomainData = await mySQL.query(this.domainData);
      const insertLanguageData = await mySQL.query(this.languageData);
      const insertGlossaryData = await mySQL.query(this.glossaryData);
      const insertLinkData = await mySQL.query(this.linkData);
      const insertUserData = await mySQL.query(this.userData);
      const insertLinkUserData = await mySQL.query(this.bookmarkData);
      const insertListData = await mySQL.query(this.listData);
      const insertLinkUserListData = await mySQL.query(this.bookmarkListData);
      const insertTagData = await mySQL.query(this.tagData);
      const insertLinkUserTagData = await mySQL.query(this.bookmarkTagData);
      const insertUserListData = await mySQL.query(this.userListData);
      const insertUserLoginData = await mySQL.query(this.userLoginData);
      const insertUserUserData = await mySQL.query(this.userUserData);

      mySQL.commit();

      return {
        // Drop tables
        ...createDropAllTables,
        ...dropAllTables,

        // Debugger table
        ...createDebuggerTable,

        // Create tables
        ...createLanguageTable,
        ...createGlossaryTable,
        ...createDomainTable,
        ...createLinkTable,
        ...createUserTable,
        ...createLinkUserTable,
        ...createListTable,
        ...createLinkUserListTable,
        ...createTagTable,
        ...createLinkUserTagTable,
        ...createUserListTable,
        ...createUserLoginsTable,
        ...createUserUserTable,

        // Create procedures
        ...createDebuggerProcedure,
        ...createLanguageGetOneProcedure,
        ...createLanguageGetAllProcedure,
        ...createUserGetAllProcedure,
        ...createUserGetOneProcedure,
        ...createUserCreateOneProcedure,
        ...createUserUpdateOneProcedure,
        ...createUserDeleteOneProcedure,
        ...createUserLoginProcedure,
        ...createUserLogSessionProcedure,
        ...createUserPasswordUpdateProcedure,
        ...createUserFollowingGetAllProcedure,
        ...createUserFollowingGetOneProcedure,
        ...createUserFollowingCreateProcedure,
        ...createUserFollowingDeleteProcedure,
        ...createUserFollowerGetAllProcedure,
        ...createUserBookmarkGetAllProcedure,
        ...createUserBookmarkGetOneProcedure,
        ...createUserBookmarkCreateProcedure,
        ...createUserBookmarkUpdateProcedure,
        ...createUserBookmarkDeleteOneProcedure,
        ...createLinkGetOneProcedure,
        ...createLinkGetAllProcedure,
        ...createLinkListGetAllProcedure,
        ...createLinkTagGetAllProcedure,
        ...createListGetOneByIdProcedure,
        ...createListGetAllPublicProcedure,
        ...createListCreateOneProcedure,
        ...createListUpdateOneProcedure,
        ...createListBookmarkGetOneProcedure,
        ...createListUserGetOneByListNameProcedure,
        ...createListUserGetOneByListIdProcedure,
        ...createUserListGetAllProcedure,
        ...createTagGetAllProcedure,

        // Insert data
        ...insertDomainData,
        ...insertLanguageData,
        ...insertGlossaryData,
        ...insertLinkData,
        ...insertUserData,
        ...insertLinkUserData,
        ...insertListData,
        ...insertLinkUserListData,
        ...insertTagData,
        ...insertLinkUserTagData,
        ...insertUserListData,
        ...insertUserLoginData,
        ...insertUserUserData,
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

    const response = await mySQL.query('SELECT version()');
    await mySQL.close();

    return response;
  }
}
