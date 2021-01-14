DROP PROCEDURE IF EXISTS user_password_update;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_password_update(
  IN $USER_ID VARCHAR(40),
  IN $NEW_PASSWORD VARCHAR(40)
)

BEGIN

  -- Retrieve user
  UPDATE user
  SET
   `password`       = $NEW_PASSWORD,
   `updatedAt`      = CURRENT_TIMESTAMP
  WHERE id          = $USER_ID;

  SELECT $USER_ID AS userId;

END