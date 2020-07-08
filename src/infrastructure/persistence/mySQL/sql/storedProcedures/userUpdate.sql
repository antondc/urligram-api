DROP PROCEDURE IF EXISTS user_update;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_update(
  IN user_data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @id = JSON_EXTRACT(user_data, '$.id');
  SET @name = JSON_EXTRACT(user_data, '$.name');
  SET @email = JSON_EXTRACT(user_data, '$.email');
  SET @statement = JSON_EXTRACT(user_data, '$.statement');
  SET @location = JSON_EXTRACT(user_data, '$.location');

  -- Retrieve user
  UPDATE user
  SET
   `name`       = JSON_UNQUOTE(@name),
   `email`      = JSON_UNQUOTE(@email),
   `statement`  = JSON_UNQUOTE(@statement),
   `location`   = JSON_UNQUOTE(@location),
   `createdAt`  = CURRENT_TIMESTAMP
  WHERE id = JSON_UNQUOTE(@id);

  SELECT JSON_UNQUOTE(@id) AS updatedId;

END