DROP PROCEDURE IF EXISTS user_delete_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_delete_one(
  IN $USER_ID VARCHAR(40)
)

BEGIN

  -- Retrieve user
  UPDATE user
  SET
   `status`     = 'disabled',
   `createdAt`  = CURRENT_TIMESTAMP
  WHERE id      = $USER_ID;

  SELECT $USER_ID AS userId;

END