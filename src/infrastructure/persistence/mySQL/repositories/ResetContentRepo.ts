import fs from 'fs';
import path from 'path';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';

export class ResetContentRepo {
  private mySQL: MySQL;
  private dropAllTables: string;
  private user: string;
  private post: string;
  private tag: string;
  private postTag: string;
  private insertUser: string;
  private insertPost: string;
  private selectAllPosts: string;
  private data: string;

  constructor() {
    this.mySQL = new MySQL({ multipleStatements: true });
    this.dropAllTables = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/dropAllTables.sql'))
      .toString();
    this.user = fs.readFileSync(path.resolve(__dirname, '../sql/models/user.sql')).toString();
    this.post = fs.readFileSync(path.resolve(__dirname, '../sql/models/post.sql')).toString();
    this.tag = fs.readFileSync(path.resolve(__dirname, '../sql/models/tag.sql')).toString();
    this.postTag = fs.readFileSync(path.resolve(__dirname, '../sql/models/postTag.sql')).toString();
    this.insertUser = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/insertUser.sql')).toString();
    this.insertPost = fs.readFileSync(path.resolve(__dirname, '../sql/storedProcedures/insertPost.sql')).toString();
    this.selectAllPosts = fs
      .readFileSync(path.resolve(__dirname, '../sql/storedProcedures/selectAllPosts.sql'))
      .toString();
    this.data = fs.readFileSync(path.resolve(__dirname, '../sql/data/data.sql')).toString();
  }

  public async reset() {
    try {
      const createDropAllTables = await this.mySQL.query(this.dropAllTables);
      const dropAllTables = await this.mySQL.query(`CALL drop_all_tables()`);
      const createUser = await this.mySQL.query(this.user);
      const createPost = await this.mySQL.query(this.post);
      const createTag = await this.mySQL.query(this.tag);
      const createPostTag = await this.mySQL.query(this.postTag);
      const createInsertUser = await this.mySQL.query(this.insertUser);
      const createInsertPost = await this.mySQL.query(this.insertPost);
      const createSelectAllPosts = await this.mySQL.query(this.selectAllPosts);
      const createData = await this.mySQL.query(this.data);

      return {
        ...createDropAllTables,
        ...dropAllTables,
        ...createUser,
        ...createPost,
        ...createTag,
        ...createPostTag,
        ...createInsertUser,
        ...createInsertPost,
        ...createSelectAllPosts,
        ...createData,
      };
    } catch (err) {
      console.log(err);
    } finally {
      await this.mySQL.close();
    }
  }
}
