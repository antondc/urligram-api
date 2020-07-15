DROP PROCEDURE IF EXISTS user_password_update;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_password_update(
  IN user_data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @user_id      = JSON_UNQUOTE(JSON_EXTRACT(user_data, '$.userId'));
  SET @new_password = JSON_UNQUOTE(JSON_EXTRACT(user_data, '$.newPassword'));

  -- Retrieve user
  UPDATE user
  SET
   `password`       = @new_password,
   `updatedAt`      = CURRENT_TIMESTAMP
  WHERE id          = @user_id;

  SELECT @user_id AS userId;

END