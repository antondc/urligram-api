DROP PROCEDURE IF EXISTS create_user;

-- Stored procedure to insert post and tags
CREATE PROCEDURE create_user(
  IN user JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @name = JSON_EXTRACT(user, '$.name');
  SET @email = JSON_EXTRACT(user, '$.email');

  -- Insert user
  INSERT INTO user (name, email) VALUES (
    JSON_UNQUOTE(@name),
    JSON_UNQUOTE(@email)
  );

  -- Retrieve inserted id to select it
  SET @last_user = LAST_INSERT_ID();

  -- Retrieve user
  SELECT * FROM user
  WHERE id = @last_user;

END