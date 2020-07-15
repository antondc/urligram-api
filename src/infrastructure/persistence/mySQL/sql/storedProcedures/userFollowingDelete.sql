
DROP PROCEDURE IF EXISTS user_following_delete;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_following_delete(
  IN data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @user_id     = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));
  SET @followed_id = JSON_UNQUOTE(JSON_EXTRACT(data, '$.followedId'));

  DELETE FROM user_user
  WHERE user_id = @user_id AND user_id1 = @followed_id;

  SELECT @user_id AS userId, @followed_id AS followedId;

END