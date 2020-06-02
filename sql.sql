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

INSERT INTO user (id, name, surname) VALUES (1, 'Foo', "Bar");
INSERT INTO post (id, title, body) VALUES (1, 'post 1', "Post body");
INSERT INTO post (id, title, body) VALUES (2, 'post 2', "Post body");
INSERT INTO tag (id, tag) VALUES (1, 'tag 1');
INSERT INTO tag (id, tag) VALUES (2, 'tag 2');
INSERT INTO post_tag (post_id, tag_id) VALUES (1, 1);
INSERT INTO post_tag (post_id, tag_id) VALUES (1, 2);
INSERT INTO post_tag (post_id, tag_id) VALUES (2, 1);

-- Stored procedure to retrieve posts and tags
DELIMITER $$
CREATE PROCEDURE select_all_posts()
BEGIN
  SELECT
    p.id,
    p.title,
    p.body,
  IF(
    COUNT(t.id) = 0,
    JSON_ARRAY(),
    JSON_ARRAYAGG(
      JSON_OBJECT('id', t.id, 'tag', t.tag)
      )
    ) tags
  FROM post p
    LEFT JOIN post_tag pt ON p.id = pt.post_id
    LEFT JOIN tag t ON t.id = pt.tag_id
  GROUP BY p.id, p.title;

END $$
DELIMITER ;

-- Stored procedure to insert post and tags
DROP PROCEDURE IF EXISTS insert_post;
DELIMITER $$
CREATE PROCEDURE insert_post(
  IN my_data JSON
)
BEGIN
  -- Declare iterator variable to use it later on in the loop
  DECLARE i INT DEFAULT 0;

  -- Retrieve values from JSON
  SET @title = JSON_EXTRACT(my_data, '$.title');
  SET @body = JSON_EXTRACT(my_data, '$.body');
  SET @tags = JSON_EXTRACT(my_data, '$.tags');
  SET @json = JSON_UNQUOTE(my_data);
  -- Insert post
  INSERT INTO post (title, body, my_data) VALUES (
    JSON_UNQUOTE(@title),
    JSON_UNQUOTE(@body),
    @json);
  -- Retrieve inserted id to reuse it in post_tag
  SET @last_post = LAST_INSERT_ID();

  -- Get tags length for the loop
  SET @tags_length = JSON_LENGTH(@tags);
  -- Execute loop over tags length
  WHILE i < @tags_length DO
    -- Retrieve current tag from tags array
    SET @tag = JSON_EXTRACT(my_data, CONCAT('$.tags[',i,'].tag'));

    -- Insert tag
    INSERT INTO tag (tag) VALUES (
      JSON_UNQUOTE(@tag)
    ) ON DUPLICATE KEY UPDATE tag = JSON_UNQUOTE(@tag);

    -- Retrieve tag id
    SELECT id INTO @last_tag
    FROM tag
    WHERE tag = JSON_UNQUOTE(@tag);

    -- Insert retrieved post_id and tag_id into post_tag
    INSERT INTO post_tag (post_id, tag_id) VALUES (
      @last_post,
      @last_tag
    ) ON DUPLICATE KEY UPDATE post_id = @last_post, tag_id = @last_tag;

    -- Add step to iterator
    SELECT i + 1 INTO i;
  END WHILE;
END $$
DELIMITER ;

-- Stored procedure to insert a user
DROP PROCEDURE IF EXISTS insert_user;
DELIMITER $$

CREATE PROCEDURE insert_user(
  IN user_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @name = JSON_EXTRACT(user_data, '$.name');
  SET @surname = JSON_EXTRACT(user_data, '$.surname');
  SET @json = JSON_UNQUOTE(user_data);

  -- Insert user
  INSERT INTO user (name, surname) VALUES (
    JSON_UNQUOTE(@name),
    JSON_UNQUOTE(@surname)
  );
END $$
DELIMITER ;

CALL insert_user('{ "name": "Name", "surname": "Surname" }')