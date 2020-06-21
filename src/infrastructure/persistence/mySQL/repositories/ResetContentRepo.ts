import fs from 'fs';
import path from 'path';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { NetWorkError } from '@root/src/shared/errors/NetworkError';

export class ResetContentRepo {
  private mySQL: MySQL;

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
  private authenticateUserProcedure: string;
  private deauthenticateUserProcedure: string;
  private createUserProcedure: string;
  private findUserProcedure: string;
  private getAllLanguagesProcedure: string;
  private getLanguageBySlugProcedure: string;
  private logUserSessionProcedure: string;

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

  constructor() {
    this.mySQL = new MySQL({ multipleStatements: true });

    // Operational tables
    this.dropAllTables = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/dropAllTables.sql'))
      .toString();
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
    this.debuggerProcedure = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/debugger.sql'))
      .toString();
    this.authenticateUserProcedure = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/authenticateUser.sql'))
      .toString();
    this.deauthenticateUserProcedure = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/deauthenticateUser.sql'))
      .toString();
    this.createUserProcedure = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/createUser.sql'))
      .toString();
    this.findUserProcedure = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/findUser.sql'))
      .toString();
    this.getAllLanguagesProcedure = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/getAllLanguages.sql'))
      .toString();
    this.getLanguageBySlugProcedure = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/getLanguageBySlug.sql'))
      .toString();
    this.logUserSessionProcedure = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/logUserSession.sql'))
      .toString();

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
    this.userListRoleData = fs.readFileSync(path.resolve(__dirname, '../sql/data/userListRole.sql')).toString();
    this.userListData = fs.readFileSync(path.resolve(__dirname, '../sql/data/userList.sql')).toString();
    this.userLoginData = fs.readFileSync(path.resolve(__dirname, '../sql/data/userLog.sql')).toString();
  }

  public async reset() {
    try {
      this.mySQL.beginTransaction();

      // Drop all tables
      const createDropAllTables = await this.mySQL.query(this.dropAllTables);
      const dropAllTables = await this.mySQL.query(`CALL drop_all_tables()`);

      // Create tables
      const createDebuggerTable = await this.mySQL.query(this.debugMessages);
      const createLanguageTable = await this.mySQL.query(this.language);
      const createGlossaryTable = await this.mySQL.query(this.glossary);
      const createDomainTable = await this.mySQL.query(this.domain);
      const createLinkTable = await this.mySQL.query(this.link);
      const createUserTable = await this.mySQL.query(this.user);
      const createLinkUserTable = await this.mySQL.query(this.linkUser);
      const createListTypeTable = await this.mySQL.query(this.listType);
      const createListTable = await this.mySQL.query(this.list);
      const createLinkUserListTable = await this.mySQL.query(this.linkUserList);
      const createTagTable = await this.mySQL.query(this.tag);
      const createLinkUserTagTable = await this.mySQL.query(this.linkUserTag);
      const createUserListRoleTable = await this.mySQL.query(this.userListRole);
      const createUserListTable = await this.mySQL.query(this.userList);
      const createUserLoginsTable = await this.mySQL.query(this.userLogins);
      const createUsersUsersTable = await this.mySQL.query(this.userUser);

      // Create procedures
      const createDebuggerProcedure = await this.mySQL.query(this.debuggerProcedure);
      const createAuthenticateUserProcedure = await this.mySQL.query(this.authenticateUserProcedure);
      const createDeauthenticateUserProcedure = await this.mySQL.query(this.deauthenticateUserProcedure);
      const createCreateUserProcedure = await this.mySQL.query(this.createUserProcedure);
      const createFindUserProcedure = await this.mySQL.query(this.findUserProcedure);
      const createGetAllLanguagesProcedure = await this.mySQL.query(this.getAllLanguagesProcedure);
      const createGetLanguageBySlugProcedure = await this.mySQL.query(this.getLanguageBySlugProcedure);
      const createLogUserSessionProcedure = await this.mySQL.query(this.logUserSessionProcedure);

      // Insert data
      const insertDomainData = await this.mySQL.query(this.domainData);
      const insertLanguageData = await this.mySQL.query(this.languageData);
      const insertGlossaryData = await this.mySQL.query(this.glossaryData);
      const insertLinkData = await this.mySQL.query(this.linkData);
      const insertUserData = await this.mySQL.query(this.userData);
      const insertLinkUserData = await this.mySQL.query(this.linkUserData);
      const insertListTypeData = await this.mySQL.query(this.listTypeData);
      const insertListData = await this.mySQL.query(this.listData);
      const insertLinkUserListData = await this.mySQL.query(this.linkUserListData);
      const insertTagData = await this.mySQL.query(this.tagData);
      const insertLinkUserTagData = await this.mySQL.query(this.linkUserTagData);
      const insertUserListRoleData = await this.mySQL.query(this.userListRoleData);
      const insertUserListData = await this.mySQL.query(this.userListData);
      const insertUserLoginData = await this.mySQL.query(this.userLoginData);

      this.mySQL.commit();

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
        ...createAuthenticateUserProcedure,
        ...createDeauthenticateUserProcedure,
        ...createCreateUserProcedure,
        ...createFindUserProcedure,
        ...createGetAllLanguagesProcedure,
        ...createGetLanguageBySlugProcedure,
        ...createLogUserSessionProcedure,

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
      };
    } catch (err) {
      this.mySQL.rollback();
      throw new NetWorkError('There was a problem resetting the DB', 500, err);
    } finally {
      await this.mySQL.close();
    }
  }
}
