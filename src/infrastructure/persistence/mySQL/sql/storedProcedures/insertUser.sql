DROP PROCEDURE IF EXISTS insert_user;

-- Stored procedure to insert post and tags
CREATE PROCEDURE insert_user(
  IN user JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @name = JSON_EXTRACT(user, '$.name');
  SET @surname = JSON_EXTRACT(user, '$.surname');

  -- Insert user
  INSERT INTO user (name, surname) VALUES (
    JSON_UNQUOTE(@name),
    JSON_UNQUOTE(@surname)
  );

  -- Retrieve inserted id to select it
  SET @last_user = LAST_INSERT_ID();

  -- Retrieve user
  SELECT * FROM user
  WHERE id = @last_user;

END