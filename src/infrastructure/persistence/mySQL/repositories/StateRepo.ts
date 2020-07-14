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
  private list: string;
  private linkUserList: string;
  private tag: string;
  private linkUserTag: string;
  private userList: string;
  private userLogins: string;
  private userUser: string;

  // Procedures
  private debuggerProcedure: string;

  // Data
  private domainData: string;
  private languageData: string;
  private glossaryData: string;
  private linkData: string;
  private userData: string;
  private linkUserData: string;
  private listData: string;
  private linkUserListData: string;
  private tagData: string;
  private linkUserTagData: string;
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
    this.list = fs.readFileSync(path.resolve(__dirname, '../sql/models/list.sql')).toString();
    this.linkUserList = fs.readFileSync(path.resolve(__dirname, '../sql/models/linkUserList.sql')).toString();
    this.tag = fs.readFileSync(path.resolve(__dirname, '../sql/models/tag.sql')).toString();
    this.linkUserTag = fs.readFileSync(path.resolve(__dirname, '../sql/models/linkUserTag.sql')).toString();
    this.userList = fs.readFileSync(path.resolve(__dirname, '../sql/models/userList.sql')).toString();
    this.userLogins = fs.readFileSync(path.resolve(__dirname, '../sql/models/userLog.sql')).toString();
    this.userUser = fs.readFileSync(path.resolve(__dirname, '../sql/models/userUser.sql')).toString();

    // Stored procedures
    this.debuggerProcedure = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/debugger.sql')).toString();

    //  Data
    this.domainData = fs.readFileSync(path.resolve(__dirname, '../sql/data/domain.sql')).toString();
    this.languageData = fs.readFileSync(path.resolve(__dirname, '../sql/data/language.sql')).toString();
    this.glossaryData = fs.readFileSync(path.resolve(__dirname, '../sql/data/glossary.sql')).toString();
    this.linkData = fs.readFileSync(path.resolve(__dirname, '../sql/data/link.sql')).toString();
    this.userData = fs.readFileSync(path.resolve(__dirname, '../sql/data/user.sql')).toString();
    this.linkUserData = fs.readFileSync(path.resolve(__dirname, '../sql/data/linkUser.sql')).toString();
    this.listData = fs.readFileSync(path.resolve(__dirname, '../sql/data/list.sql')).toString();
    this.linkUserListData = fs.readFileSync(path.resolve(__dirname, '../sql/data/linkUserList.sql')).toString();
    this.tagData = fs.readFileSync(path.resolve(__dirname, '../sql/data/tag.sql')).toString();
    this.linkUserTagData = fs.readFileSync(path.resolve(__dirname, '../sql/data/linkUserTag.sql')).toString();
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
      const createLinkUserTable = await mySQL.query(this.linkUser);
      const createListTable = await mySQL.query(this.list);
      const createLinkUserListTable = await mySQL.query(this.linkUserList);
      const createTagTable = await mySQL.query(this.tag);
      const createLinkUserTagTable = await mySQL.query(this.linkUserTag);
      const createUserListTable = await mySQL.query(this.userList);
      const createUserLoginsTable = await mySQL.query(this.userLogins);
      const createUserUserTable = await mySQL.query(this.userUser);

      // Create procedures
      const createDebuggerProcedure = await mySQL.query(this.debuggerProcedure);

      // Insert data
      const insertDomainData = await mySQL.query(this.domainData);
      const insertLanguageData = await mySQL.query(this.languageData);
      const insertGlossaryData = await mySQL.query(this.glossaryData);
      const insertLinkData = await mySQL.query(this.linkData);
      const insertUserData = await mySQL.query(this.userData);
      const insertLinkUserData = await mySQL.query(this.linkUserData);
      const insertListData = await mySQL.query(this.listData);
      const insertLinkUserListData = await mySQL.query(this.linkUserListData);
      const insertTagData = await mySQL.query(this.tagData);
      const insertLinkUserTagData = await mySQL.query(this.linkUserTagData);
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
