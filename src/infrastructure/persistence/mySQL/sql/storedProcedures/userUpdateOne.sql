DROP PROCEDURE IF EXISTS user_update;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_update(
  IN user_data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @user_id    = JSON_UNQUOTE(JSON_EXTRACT(user_data, '$.userId'));
  SET @name       = JSON_UNQUOTE(JSON_EXTRACT(user_data, '$.name'));
  SET @email      = JSON_UNQUOTE(JSON_EXTRACT(user_data, '$.email'));
  SET @statement  = JSON_UNQUOTE(JSON_EXTRACT(user_data, '$.statement'));
  SET @location   = JSON_UNQUOTE(JSON_EXTRACT(user_data, '$.location'));

  -- Retrieve user
  UPDATE user
  SET
   `name`       = @name,
   `email`      = @email,
   `statement`  = @statement,
   `location`   = @location,
   `createdAt`  = CURRENT_TIMESTAMP
  WHERE id      = @user_id;

  SELECT @userId AS userId;

END