DROP PROCEDURE IF EXISTS authenticate_user;

-- Stored procedure to insert post and tags
CREATE PROCEDURE authenticate_user(
  IN user_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @name = JSON_EXTRACT(user_data, '$.name');
  SET @password = JSON_EXTRACT(user_data, '$.password');

  -- Select user
  SELECT `id` FROM `user`
  WHERE `name` = JSON_UNQUOTE(@name) AND `password` = JSON_UNQUOTE(@password);

END