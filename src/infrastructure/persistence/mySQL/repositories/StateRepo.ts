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
  private linkUser: string;
  private listType: string;
  private list: string;
  private linkUserList: string;
  private tag: string;
  private linkUserTag: string;
  private userListRole: string;
  private userList: string;
  private userLogins: string;
  private userUser: string;

  // Procedures
  private debuggerProcedure: string;
  private userAuthenticateProcedure: string;
  private userDeauthenticateProcedure: string;
  private userCreateProcedure: string;
  private userGetOneProcedure: string;
  private userFollowersGetAllProcedure: string;
  private userFollowingGetAllProcedure: string;
  private userFollowingCreateProcedure: string;
  private userFollowingDeleteProcedure: string;
  private userGetAllProcedure: string;
  private userLinkGetAllProcedure: string;
  private userListGetAllProcedure: string;
  private languageGetAllProcedure: string;
  private languageGetOneProcedure: string;
  private userLogSessionProcedure: string;
  private linkGetOneProcedure: string;
  private linkGetAllProcedure: string;
  private linkCreateProcedure: string;
  private linkUpdateProcedure: string;
  private linkDeleteProcedure: string;
  private linkListGetAllProcedure: string;
  private linkTagGetAllProcedure: string;
  private listGetOneProcedure: string;
  private listCreateProcedure: string;
  private listUpdateProcedure: string;
  private listDeleteProcedure: string;
  private listLinkGetOneProcedure: string;
  private listLinkGetAllProcedure: string;
  private listLinkCreateProcedure: string;
  private listLinkDeleteProcedure: string;
  private listUserGetAllProcedure: string;
  private tagGetAllProcedure: string;

  // Data
  private domainData: string;
  private languageData: string;
  private glossaryData: string;
  private linkData: string;
  private userData: string;
  private linkUserData: string;
  private listTypeData: string;
  private listData: string;
  private linkUserListData: string;
  private tagData: string;
  private linkUserTagData: string;
  private userListRoleData: string;
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
    this.linkUser = fs.readFileSync(path.resolve(__dirname, '../sql/models/linkUser.sql')).toString();
    this.listType = fs.readFileSync(path.resolve(__dirname, '../sql/models/listType.sql')).toString();
    this.list = fs.readFileSync(path.resolve(__dirname, '../sql/models/list.sql')).toString();
    this.linkUserList = fs.readFileSync(path.resolve(__dirname, '../sql/models/linkUserList.sql')).toString();
    this.tag = fs.readFileSync(path.resolve(__dirname, '../sql/models/tag.sql')).toString();
    this.linkUserTag = fs.readFileSync(path.resolve(__dirname, '../sql/models/linkUserTag.sql')).toString();
    this.userListRole = fs.readFileSync(path.resolve(__dirname, '../sql/models/userListRole.sql')).toString();
    this.userList = fs.readFileSync(path.resolve(__dirname, '../sql/models/userList.sql')).toString();
    this.userLogins = fs.readFileSync(path.resolve(__dirname, '../sql/models/userLog.sql')).toString();
    this.userUser = fs.readFileSync(path.resolve(__dirname, '../sql/models/userUser.sql')).toString();

    // Stored procedures
    this.debuggerProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/debugger.sql')).toString();
    this.userAuthenticateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userAuthenticate.sql')).toString();
    this.userDeauthenticateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userDeauthenticate.sql')).toString();
    this.userCreateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userCreate.sql')).toString();
    this.userGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userGetOne.sql')).toString();
    this.userFollowersGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userFollowersGetAll.sql')).toString();
    this.userFollowingGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userFollowingGetAll.sql')).toString();
    this.userFollowingCreateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userFollowingCreate.sql')).toString();
    this.userFollowingDeleteProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userFollowingDelete.sql')).toString();
    this.userGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userGetAll.sql')).toString();
    this.userLinkGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userLinkGetAll.sql')).toString();
    this.userListGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userListGetAll.sql')).toString();
    this.languageGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/languageGetAll.sql')).toString();
    this.languageGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/languageGetOne.sql')).toString();
    this.userLogSessionProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/userLogSession.sql')).toString();
    this.linkGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkGetOne.sql')).toString();
    this.linkGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkGetAll.sql')).toString();
    this.linkCreateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkCreate.sql')).toString();
    this.linkUpdateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkUpdate.sql')).toString();
    this.linkDeleteProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkDelete.sql')).toString();
    this.linkListGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkListGetAll.sql')).toString();
    this.linkTagGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/linkTagGetAll.sql')).toString();
    this.listGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listGetOne.sql')).toString();
    this.listCreateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listCreate.sql')).toString();
    this.listUpdateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listUpdate.sql')).toString();
    this.listDeleteProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listDelete.sql')).toString();
    this.listLinkGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listLinkGetOne.sql')).toString();
    this.listLinkGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listLinkGetAll.sql')).toString();
    this.listLinkCreateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listLinkCreate.sql')).toString();
    this.listLinkDeleteProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listLinkDelete.sql')).toString();
    this.listUserGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/listUserGetAll.sql')).toString();
    this.tagGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/tagGetAll.sql')).toString();

    //  Data
    this.domainData = fs.readFileSync(path.resolve(__dirname, '../sql/data/domain.sql')).toString();
    this.languageData = fs.readFileSync(path.resolve(__dirname, '../sql/data/language.sql')).toString();
    this.glossaryData = fs.readFileSync(path.resolve(__dirname, '../sql/data/glossary.sql')).toString();
    this.linkData = fs.readFileSync(path.resolve(__dirname, '../sql/data/link.sql')).toString();
    this.userData = fs.readFileSync(path.resolve(__dirname, '../sql/data/user.sql')).toString();
    this.linkUserData = fs.readFileSync(path.resolve(__dirname, '../sql/data/linkUser.sql')).toString();
    this.listTypeData = fs.readFileSync(path.resolve(__dirname, '../sql/data/listType.sql')).toString();
    this.listData = fs.readFileSync(path.resolve(__dirname, '../sql/data/list.sql')).toString();
    this.linkUserListData = fs.readFileSync(path.resolve(__dirname, '../sql/data/linkUserList.sql')).toString();
    this.tagData = fs.readFileSync(path.resolve(__dirname, '../sql/data/tag.sql')).toString();
    this.linkUserTagData = fs.readFileSync(path.resolve(__dirname, '../sql/data/linkUserTag.sql')).toString();
    this.userUserData = fs.readFileSync(path.resolve(__dirname, '../sql/data/userUser.sql')).toString();
    this.userListRoleData = fs.readFileSync(path.resolve(__dirname, '../sql/data/userListRole.sql')).toString();
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
      const createLinkUserTable = await mySQL.query(this.linkUser);
      const createListTypeTable = await mySQL.query(this.listType);
      const createListTable = await mySQL.query(this.list);
      const createLinkUserListTable = await mySQL.query(this.linkUserList);
      const createTagTable = await mySQL.query(this.tag);
      const createLinkUserTagTable = await mySQL.query(this.linkUserTag);
      const createUserListRoleTable = await mySQL.query(this.userListRole);
      const createUserListTable = await mySQL.query(this.userList);
      const createUserLoginsTable = await mySQL.query(this.userLogins);
      const createUsersUsersTable = await mySQL.query(this.userUser);

      // Create procedures
      const createDebuggerProcedure = await mySQL.query(this.debuggerProcedure);
      const createUsersAuthenticateProcedure = await mySQL.query(this.userAuthenticateProcedure);
      const createUsersDeauthenticateProcedure = await mySQL.query(this.userDeauthenticateProcedure);
      const createUsersCreateProcedure = await mySQL.query(this.userCreateProcedure);
      const createUsersGetOneProcedure = await mySQL.query(this.userGetOneProcedure);
      const createUsersGetAllProcedure = await mySQL.query(this.userGetAllProcedure);
      const createUserLinkGetAllProcedure = await mySQL.query(this.userLinkGetAllProcedure);
      const createUserListGetAllProcedure = await mySQL.query(this.userListGetAllProcedure);
      const createUsersFollowersGetAllProcedure = await mySQL.query(this.userFollowersGetAllProcedure);
      const createUsersFollowingGetAllProcedure = await mySQL.query(this.userFollowingGetAllProcedure);
      const createUsersFollowingCreateProcedure = await mySQL.query(this.userFollowingCreateProcedure);
      const createUsersFollowingDeleteProcedure = await mySQL.query(this.userFollowingDeleteProcedure);
      const createLanguageGetAllProcedure = await mySQL.query(this.languageGetAllProcedure);
      const createLanguageGetOneProcedure = await mySQL.query(this.languageGetOneProcedure);
      const createUsersLogSessionProcedure = await mySQL.query(this.userLogSessionProcedure);
      const createLinkGetOneProcedure = await mySQL.query(this.linkGetOneProcedure);
      const createLinkGetAllProcedure = await mySQL.query(this.linkGetAllProcedure);
      const createLinkCreateProcedure = await mySQL.query(this.linkCreateProcedure);
      const createLinkUpdateProcedure = await mySQL.query(this.linkUpdateProcedure);
      const createLinkDeleteProcedure = await mySQL.query(this.linkDeleteProcedure);
      const createLinkListGetAllProcedure = await mySQL.query(this.linkListGetAllProcedure);
      const createLinkTagGetAllProcedure = await mySQL.query(this.linkTagGetAllProcedure);
      const createListGetOneProcedure = await mySQL.query(this.listGetOneProcedure);
      const createListCreateProcedure = await mySQL.query(this.listCreateProcedure);
      const createListUpdateProcedure = await mySQL.query(this.listUpdateProcedure);
      const createListDeleteProcedure = await mySQL.query(this.listDeleteProcedure);
      const createListLinkGetOneProcedure = await mySQL.query(this.listLinkGetOneProcedure);
      const createListLinkGetAllProcedure = await mySQL.query(this.listLinkGetAllProcedure);
      const createListLinkCreateProcedure = await mySQL.query(this.listLinkCreateProcedure);
      const createListLinkDeleteProcedure = await mySQL.query(this.listLinkDeleteProcedure);
      const createListUserGetAllProcedure = await mySQL.query(this.listUserGetAllProcedure);
      const createTagGetAllProcedure = await mySQL.query(this.tagGetAllProcedure);

      // Insert data
      const insertDomainData = await mySQL.query(this.domainData);
      const insertLanguageData = await mySQL.query(this.languageData);
      const insertGlossaryData = await mySQL.query(this.glossaryData);
      const insertLinkData = await mySQL.query(this.linkData);
      const insertUserData = await mySQL.query(this.userData);
      const insertLinkUserData = await mySQL.query(this.linkUserData);
      const insertListTypeData = await mySQL.query(this.listTypeData);
      const insertListData = await mySQL.query(this.listData);
      const insertLinkUserListData = await mySQL.query(this.linkUserListData);
      const insertTagData = await mySQL.query(this.tagData);
      const insertLinkUserTagData = await mySQL.query(this.linkUserTagData);
      const insertUserListRoleData = await mySQL.query(this.userListRoleData);
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
        ...createListTypeTable,
        ...createListTable,
        ...createLinkUserListTable,
        ...createTagTable,
        ...createLinkUserTagTable,
        ...createUserListRoleTable,
        ...createUserListTable,
        ...createUserLoginsTable,
        ...createUsersUsersTable,

        // Create procedures
        ...createDebuggerProcedure,
        ...createUsersAuthenticateProcedure,
        ...createUsersDeauthenticateProcedure,
        ...createUsersCreateProcedure,
        ...createUsersGetOneProcedure,
        ...createUsersFollowingGetAllProcedure,
        ...createUsersFollowersGetAllProcedure,
        ...createUsersFollowingCreateProcedure,
        ...createUsersFollowingDeleteProcedure,
        ...createUsersGetAllProcedure,
        ...createUserLinkGetAllProcedure,
        ...createUserListGetAllProcedure,
        ...createLanguageGetAllProcedure,
        ...createLanguageGetOneProcedure,
        ...createUsersLogSessionProcedure,
        ...createLinkGetOneProcedure,
        ...createLinkGetAllProcedure,
        ...createLinkCreateProcedure,
        ...createLinkUpdateProcedure,
        ...createLinkDeleteProcedure,
        ...createLinkListGetAllProcedure,
        ...createLinkTagGetAllProcedure,
        ...createListGetOneProcedure,
        ...createListCreateProcedure,
        ...createListUpdateProcedure,
        ...createListDeleteProcedure,
        ...createListLinkGetOneProcedure,
        ...createListLinkGetAllProcedure,
        ...createListLinkCreateProcedure,
        ...createListLinkDeleteProcedure,
        ...createListUserGetAllProcedure,
        ...createTagGetAllProcedure,

        // Insert data
        ...insertDomainData,
        ...insertLanguageData,
        ...insertGlossaryData,
        ...insertLinkData,
        ...insertUserData,
        ...insertLinkUserData,
        ...insertListTypeData,
        ...insertListData,
        ...insertLinkUserListData,
        ...insertTagData,
        ...insertLinkUserTagData,
        ...insertUserListRoleData,
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
