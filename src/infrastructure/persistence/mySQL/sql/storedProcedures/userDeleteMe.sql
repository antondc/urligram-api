DROP PROCEDURE IF EXISTS user_delete_me;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_delete_me(
  IN user_data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @id = JSON_EXTRACT(user_data, '$.id');

  -- Retrieve user
  UPDATE user
  SET
   `status`     = 'disabled',
   `createdAt`  = CURRENT_TIMESTAMP
  WHERE id = JSON_UNQUOTE(@id);

  SELECT JSON_UNQUOTE(@id) AS updatedId;

END