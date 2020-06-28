
DROP PROCEDURE IF EXISTS user_following_create;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_following_create(
  IN user_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @userId     = JSON_EXTRACT(user_data, '$.userId');
  SET @followedId = JSON_EXTRACT(user_data, '$.followedId');

  INSERT INTO user_user (
    user_id,
    user_id1
  )
  VALUES (
    JSON_UNQUOTE(@userId),
    JSON_UNQUOTE(@followedId)
  )
  ON DUPLICATE KEY UPDATE
    user_id   = JSON_UNQUOTE(@userId),
    user_id1  = JSON_UNQUOTE(@followedId),
    updatedAt = CURRENT_TIMESTAMP
  ;

  SELECT *
  FROM user_user
  WHERE user_id = JSON_UNQUOTE(@userId) AND user_id1 = JSON_UNQUOTE(@followedId);

END