DROP PROCEDURE IF EXISTS user_login;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_login(
  IN user_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @user_id       = JSON_UNQUOTE(JSON_EXTRACT(user_data, '$.userId'));
  SET @name          = JSON_UNQUOTE(JSON_EXTRACT(user_data, '$.name'));
  SET @password      = JSON_UNQUOTE(JSON_EXTRACT(user_data, '$.password'));

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
    `password` = @password
  AND (
    `name` = @name
    OR `id` = @user_id
  );

END