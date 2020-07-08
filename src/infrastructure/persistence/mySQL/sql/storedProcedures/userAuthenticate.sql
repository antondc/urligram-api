DROP PROCEDURE IF EXISTS user_authenticate;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_authenticate(
  IN user_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @id       = JSON_EXTRACT(user_data, '$.id');
  SET @name     = JSON_EXTRACT(user_data, '$.name');
  SET @password = JSON_EXTRACT(user_data, '$.password');

  -- Select user
  SELECT
    `id`,
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
  WHERE `password` = JSON_UNQUOTE(@password)
  AND (
    `name` = JSON_UNQUOTE(@name)
    OR `id` = JSON_UNQUOTE(@id)
  );

END