DROP PROCEDURE IF EXISTS list_bookmark_user_upsert_one;

-- DELIMITER $$

CREATE PROCEDURE list_bookmark_user_upsert_one(
  IN $LIST_ID INT,
  IN $BOOKMARK_ID INT,
  IN $USER_ID TEXT,
  IN $PENDING BOOLEAN
)

BEGIN

  INSERT INTO list_bookmark_user (
    createdAt,
    updatedAt,
    `list_id`,
    `bookmark_id`,
    `user_id`,
    `pending`
  ) VALUES (
    UNIX_TIMESTAMP(),
    UNIX_TIMESTAMP(),
    $LIST_ID,
    $BOOKMARK_ID,
    $USER_ID,
    $PENDING
  )
  ON DUPLICATE KEY UPDATE
    updatedAt = UNIX_TIMESTAMP(),
    `pending` = $PENDING
  ;

  SELECT
    createdAt,
    updatedAt,
    `list_id`,
    `bookmark_id`,
    `user_id`,
    `pending`
  FROM list_bookmark_user
  WHERE
    `list_id`     = $LIST_ID
    AND
    `bookmark_id` = $BOOKMARK_ID
    AND
    `user_id`     = $USER_ID
  ;

END

-- DELIMITER ;

-- CALL list_bookmark_user_upsert_one(1, 1, "e4e2bb46-c210-4a47-9e84-f45c789fcec1", 0);