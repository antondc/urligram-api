DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS post_tag;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS tag;
DROP PROCEDURE IF EXISTS select_all_posts;
DROP PROCEDURE IF EXISTS insert_post;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  surname VARCHAR(45) NULL,
  PRIMARY KEY (id));

CREATE TABLE post (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  body TEXT NULL,
  my_data TEXT NULL,
  PRIMARY KEY (id));

CREATE TABLE tag (
  id INT NOT NULL AUTO_INCREMENT,
  tag VARCHAR(45) NULL UNIQUE,
  PRIMARY KEY (id));

CREATE TABLE post_tag (
  post_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (post_id, tag_id),
  INDEX fk_post_tag_tag1_idx (tag_id ASC) VISIBLE,
  INDEX fk_post_tag_post_idx (post_id ASC) VISIBLE,
  CONSTRAINT fk_post_tag_post
    FOREIGN KEY (post_id)
    REFERENCES post (id),
  CONSTRAINT fk_post_tag_tag1
    FOREIGN KEY (tag_id)
    REFERENCES tag (id));