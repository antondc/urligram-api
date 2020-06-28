DROP PROCEDURE IF EXISTS user_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_get_one(
  IN user_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @id = JSON_EXTRACT(user_data, '$.id');
  SET @name = JSON_EXTRACT(user_data, '$.name');
  SET @email = JSON_EXTRACT(user_data, '$.email');

  -- Select user
  SELECT `id`, `name`, `level`, `email`, `status`, `statement`, `location`, `order`, `createdAt`,
`updatedAt` FROM `user`
  WHERE `id` = JSON_UNQUOTE(@id) OR `name` = JSON_UNQUOTE(@name) OR `email` = JSON_UNQUOTE(@email);

END