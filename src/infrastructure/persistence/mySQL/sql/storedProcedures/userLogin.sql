DROP PROCEDURE IF EXISTS user_login;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_login(
  IN $NAME VARCHAR(40),
  IN $PASS VARCHAR(40),
  IN $USER_ID VARCHAR(40)
)
BEGIN

  -- Select user
  SELECT
    `user`.`id`,
    `user`.`name`,
    `user`.`level`,
    `user`.`email`,
    `user`.`status`,
    `user`.`statement`,
    `user`.`location`,
    `user`.`order`,
    `user`.`createdAt`,
    `user`.`updatedAt`
  FROM `user`
  WHERE
    `password` = $PASS
  AND (
    `name` = $NAME
    OR
    `id` = $USER_ID
  );

END