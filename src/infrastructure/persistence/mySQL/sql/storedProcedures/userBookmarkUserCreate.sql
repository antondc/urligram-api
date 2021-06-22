DROP PROCEDURE IF EXISTS user_bookmark_user_create;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_bookmark_user_create(
  IN $SESSION_ID VARCHAR(40),
  IN $BOOKMARK_ID INT,
  IN $USER_ID VARCHAR(40)
)

BEGIN

  INSERT INTO userBookmarkUser (
    `user_id1`,
    `bookmark_id`,
    `user_id2`,
    `viewed`
  ) VALUES (
    $SESSION_ID,
    $BOOKMARK_ID,
    $USER_ID,
    0
  );

SELECT
  $SESSION_ID,
  $BOOKMARK_ID,
  $USER_ID
;

END