import fs from 'fs';
import path from 'path';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';

export class ResetContentRepo {
  private mySQL: MySQL;
  private dropAllTables: string;
  private user: string;
  private userData: string;
  private post: string;
  private postData: string;
  private tag: string;
  private tagData: string;
  private postTag: string;
  private postTagData: string;
  private authenticateUserProcedure: string;
  private insertUserProcedure: string;
  private insertPostProcedure: string;
  private selectAllPostsProcedure: string;

  constructor() {
    this.mySQL = new MySQL({ multipleStatements: true });
    this.dropAllTables = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/dropAllTables.sql'))
      .toString();
    this.user = fs.readFileSync(path.resolve(__dirname, '../sql/models/user.sql')).toString();
    this.post = fs.readFileSync(path.resolve(__dirname, '../sql/models/post.sql')).toString();
    this.tag = fs.readFileSync(path.resolve(__dirname, '../sql/models/tag.sql')).toString();
    this.postTag = fs.readFileSync(path.resolve(__dirname, '../sql/models/postTag.sql')).toString();
    this.authenticateUserProcedure = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/authenticateUser.sql'))
      .toString();
    this.insertUserProcedure = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/insertUser.sql'))
      .toString();
    this.insertPostProcedure = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/insertPost.sql'))
      .toString();
    this.selectAllPostsProcedure = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/selectAllPosts.sql'))
      .toString();
    this.userData = fs.readFileSync(path.resolve(__dirname, '../sql/data/user.sql')).toString();
    this.postData = fs.readFileSync(path.resolve(__dirname, '../sql/data/post.sql')).toString();
    this.tagData = fs.readFileSync(path.resolve(__dirname, '../sql/data/tag.sql')).toString();
    this.postTagData = fs.readFileSync(path.resolve(__dirname, '../sql/data/postTag.sql')).toString();
  }

  public async reset() {
    try {
      this.mySQL.beginTransaction();

      const createDropAllTables = await this.mySQL.query(this.dropAllTables);
      const dropAllTables = await this.mySQL.query(`CALL drop_all_tables()`);
      const createUserTable = await this.mySQL.query(this.user);
      const insertUserData = await this.mySQL.query(this.userData);
      const createPostTable = await this.mySQL.query(this.post);
      const insertPostData = await this.mySQL.query(this.postData);
      const createTagTable = await this.mySQL.query(this.tag);
      const insertTagData = await this.mySQL.query(this.tagData);
      const createPostTagTable = await this.mySQL.query(this.postTag);
      const insertPostTagData = await this.mySQL.query(this.postTagData);
      const createAuthenticateUserProcedure = await this.mySQL.query(this.authenticateUserProcedure);
      const createInsertUserProcedure = await this.mySQL.query(this.insertUserProcedure);
      const createInsertPostProcedure = await this.mySQL.query(this.insertPostProcedure);
      const createSelectAllPostsProcedure = await this.mySQL.query(this.selectAllPostsProcedure);

      this.mySQL.commit();

      return {
        ...createDropAllTables,
        ...dropAllTables,
        ...createUserTable,
        ...insertUserData,
        ...createPostTable,
        ...insertPostData,
        ...createTagTable,
        ...insertTagData,
        ...createPostTagTable,
        ...insertPostTagData,
        ...createInsertUserProcedure,
        ...createInsertPostProcedure,
        ...createSelectAllPostsProcedure,
      };
    } catch (err) {
      this.mySQL.rollback();
      console.log(err);
    } finally {
      await this.mySQL.close();
    }
  }
}
