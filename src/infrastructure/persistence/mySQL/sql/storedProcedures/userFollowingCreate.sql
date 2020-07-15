
DROP PROCEDURE IF EXISTS user_following_create;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_following_create(
  IN data JSON
)
BEGIN
  SET @user_id     = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));
  SET @followed_id = JSON_UNQUOTE(JSON_EXTRACT(data, '$.followedId'));

  INSERT INTO user_user (
    user_id,
    user_id1
  )
  VALUES (
    @user_id,
    @followed_id
  )
  ON DUPLICATE KEY UPDATE
    user_id   = @user_id,
    user_id1  = @followed_id,
    updatedAt = CURRENT_TIMESTAMP
  ;

  SELECT @user_id AS userId, @followed_id AS followedId;
END