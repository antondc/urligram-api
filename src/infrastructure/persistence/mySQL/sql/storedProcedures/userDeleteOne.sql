DROP PROCEDURE IF EXISTS user_delete_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_delete_one(
  IN user_data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @user_id = JSON_UNQUOTE(JSON_EXTRACT(user_data, '$.userId'));

  -- Retrieve user
  UPDATE user
  SET
   `status`     = 'disabled',
   `createdAt`  = CURRENT_TIMESTAMP
  WHERE id      = @user_id;

  SELECT @id AS userId;

END