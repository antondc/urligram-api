DROP PROCEDURE IF EXISTS user_update_password;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_update_password(
  IN user_data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @id = JSON_EXTRACT(user_data, '$.id');
  SET @new_password = JSON_EXTRACT(user_data, '$.newPassword');

  -- Retrieve user
  UPDATE user
  SET
   `password`       = JSON_UNQUOTE(@new_password),
   `createdAt`      = CURRENT_TIMESTAMP
  WHERE id = JSON_UNQUOTE(@id);

  SELECT JSON_UNQUOTE(@id) AS updatedId;

END