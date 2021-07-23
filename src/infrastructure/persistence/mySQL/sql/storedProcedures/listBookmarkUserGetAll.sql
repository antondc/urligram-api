DROP PROCEDURE IF EXISTS list_bookmark_user_get_all;

-- DELIMITER $$

CREATE PROCEDURE list_bookmark_user_get_all(
  IN $SESSION_ID TEXT
)

BEGIN

  SELECT
    id,
    list_id AS listId,
    bookmark_id AS bookmarkId,
    viewPending
  FROM list_bookmark_user
  WHERE
    user_id = $SESSION_ID
  ;

END

-- DELIMITER ;

-- CALL list_bookmark_user_get_all("e4e2bb46-c210-4a47-9e84-f45c789fcec1");