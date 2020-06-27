
DROP PROCEDURE IF EXISTS users_follow_delete;

-- Stored procedure to insert post and tags
CREATE PROCEDURE users_follow_delete(
  IN user_data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @userId     = JSON_EXTRACT(user_data, '$.userId');
  SET @followedId = JSON_EXTRACT(user_data, '$.followedId');

  DELETE FROM user_user
  WHERE user_id = JSON_UNQUOTE(@userId) AND user_id1 = JSON_UNQUOTE(@followedId);

  SELECT *
  FROM user
  WHERE id = JSON_UNQUOTE(@userId);
END