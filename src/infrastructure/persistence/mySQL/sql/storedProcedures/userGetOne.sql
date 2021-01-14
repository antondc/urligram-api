DROP PROCEDURE IF EXISTS user_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_get_one(
  IN $USER_ID VARCHAR(40),
  IN $EMAIL VARCHAR(40),
  IN $NAME VARCHAR(40)
)
BEGIN

  -- Select user
  SELECT
    `id`,
    `name`,
    `level`,
    `email`,
    `status`,
    `statement`,
    `location`,
    `order`,
    `createdAt`,
    `updatedAt`
  FROM `user`
  WHERE `id` = JSON_UNQUOTE($USER_ID)
    OR `name` = JSON_UNQUOTE($NAME)
    OR `email` = JSON_UNQUOTE($EMAIL);

END