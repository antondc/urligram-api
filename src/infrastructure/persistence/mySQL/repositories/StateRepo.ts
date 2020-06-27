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
  private usersAuthenticateProcedure: string;
  private usersDeauthenticateProcedure: string;
  private usersCreateProcedure: string;
  private usersGetOneProcedure: string;
  private usersFollowingGetAllProcedure: string;
  private usersFollowersGetProcedure: string;
  private usersFollowProcedure: string;
  private usersFollowDeleteProcedure: string;
  private usersGetAllProcedure: string;
  private languagesGetAllProcedure: string;
  private languagesGetOneProcedure: string;
  private usersLogSessionProcedure: string;

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
    this.usersAuthenticateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/usersAuthenticate.sql')).toString();
    this.usersDeauthenticateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/usersDeauthenticate.sql')).toString();
    this.usersCreateProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/usersCreate.sql')).toString();
    this.usersGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/usersGetOne.sql')).toString();
    this.usersFollowingGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/usersFollowingGetAll.sql')).toString();
    this.usersFollowersGetProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/usersFollowersGet.sql')).toString();
    this.usersFollowProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/usersFollow.sql')).toString();
    this.usersFollowDeleteProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/usersFollowDelete.sql')).toString();
    this.usersGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/usersGetAll.sql')).toString();
    this.languagesGetAllProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/languagesGetAll.sql')).toString();
    this.languagesGetOneProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/languagesGetOne.sql')).toString();
    this.usersLogSessionProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/usersLogSession.sql')).toString();

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

  public async reset() {
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
      const createUsersAuthenticateProcedure = await mySQL.query(this.usersAuthenticateProcedure);
      const createUsersDeauthenticateProcedure = await mySQL.query(this.usersDeauthenticateProcedure);
      const createUsersCreateProcedure = await mySQL.query(this.usersCreateProcedure);
      const createUsersGetOneProcedure = await mySQL.query(this.usersGetOneProcedure);
      const createUsersGetAllProcedure = await mySQL.query(this.usersGetAllProcedure);
      const createUsersFollowingGetAllProcedure = await mySQL.query(this.usersFollowingGetAllProcedure);
      const createUsersFollowersGetProcedure = await mySQL.query(this.usersFollowersGetProcedure);
      const createUsersFollowProcedure = await mySQL.query(this.usersFollowProcedure);
      const createUsersFollowDeleteProcedure = await mySQL.query(this.usersFollowDeleteProcedure);
      const createLanguagesGetAllProcedure = await mySQL.query(this.languagesGetAllProcedure);
      const createLanguagesGetOneProcedure = await mySQL.query(this.languagesGetOneProcedure);
      const createUsersLogSessionProcedure = await mySQL.query(this.usersLogSessionProcedure);

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
        ...createUsersFollowersGetProcedure,
        ...createUsersFollowProcedure,
        ...createUsersFollowDeleteProcedure,
        ...createUsersGetAllProcedure,
        ...createLanguagesGetAllProcedure,
        ...createLanguagesGetOneProcedure,
        ...createUsersLogSessionProcedure,

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

  public async test() {
    const mySQL = new MySQL();

    const response = await mySQL.query('SELECT version()');
    await mySQL.close();

    return response;
  }
}
