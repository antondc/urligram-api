DROP PROCEDURE IF EXISTS user_bookmark_user_update;

CREATE PROCEDURE user_bookmark_user_update(
  IN $BOOKMARK_ID INT,
  IN $USER_ID TEXT,
  IN $VIEWED BOOLEAN
)

BEGIN

  UPDATE userBookmarkUser
  SET
    `userBookmarkUser`.viewed       = $VIEWED
  WHERE
    `userBookmarkUser`.bookmark_id   = $BOOKMARK_ID
    and
    `userBookmarkUser`.user_id2      = $USER_ID
  ;

SELECT
  $BOOKMARK_ID,
  $USER_ID,
  $VIEWED
;

END