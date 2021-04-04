DROP PROCEDURE IF EXISTS list_user_delete_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_delete_one(
  IN $LIST_ID INT,
  IN $USER_ID TEXT
)

BEGIN

  DELETE FROM user_list
  WHERE
    list_id     = $LIST_ID
    AND user_id = $USER_ID
  ;

  UPDATE
    list
  SET
    updatedAt  = UNIX_TIMESTAMP()
  WHERE
    list.id    = $LIST_ID
  ;

  SELECT $LIST_ID AS listId, $USER_ID AS userId;

END