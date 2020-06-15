DROP PROCEDURE IF EXISTS create_user;

-- Stored procedure to insert post and tags
CREATE PROCEDURE create_user(
  IN user JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @name = JSON_EXTRACT(user, '$.name');
  SET @email = JSON_EXTRACT(user, '$.email');
  SET @password = JSON_EXTRACT(user, '$.password');
  SET @uuid = uuid();

  -- Insert user
  INSERT INTO user (`id`, `name`, `email`, `password`) VALUES (
    @uuid ,
    JSON_UNQUOTE(@name),
    JSON_UNQUOTE(@email),
    JSON_UNQUOTE(@password)
  );

  -- Retrieve user
  SELECT `id`, `name`, `email`, `status` FROM user
  WHERE id = @uuid;

END