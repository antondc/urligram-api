
DROP PROCEDURE IF EXISTS user_following_create;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_following_create(
  IN $USER_ID VARCHAR(40),
  IN $FOLLOWED_ID VARCHAR(40)
)
BEGIN

  INSERT INTO user_user (
    user_id,
    user_id1
  )
  VALUES (
    $USER_ID,
    $FOLLOWED_ID
  )
  ON DUPLICATE KEY UPDATE
    user_id   = $USER_ID,
    user_id1  = $FOLLOWED_ID,
    updatedAt = UNIX_TIMESTAMP()
  ;

  SELECT $USER_ID AS userId, $FOLLOWED_ID AS followedId;
END