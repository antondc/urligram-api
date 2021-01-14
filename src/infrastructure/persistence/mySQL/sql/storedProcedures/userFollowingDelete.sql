
DROP PROCEDURE IF EXISTS user_following_delete;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_following_delete(
  IN $USER_ID VARCHAR(40),
  IN $FOLLOWED_ID VARCHAR(40)
)

BEGIN

  DELETE FROM user_user
  WHERE
    user_id = $USER_ID
    AND
    user_id1 = $FOLLOWED_ID
  ;

  SELECT
    $USER_ID AS userId,
    $FOLLOWED_ID AS followedId
  ;

END