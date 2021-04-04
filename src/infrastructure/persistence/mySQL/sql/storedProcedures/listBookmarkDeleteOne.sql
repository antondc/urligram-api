DROP PROCEDURE IF EXISTS list_bookmark_delete_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_bookmark_delete_one(
  IN $LIST_ID INT,
  IN $BOOKMARK_ID INT
)
BEGIN

  DELETE FROM bookmark_list
  WHERE
    list_id = $LIST_ID
    AND bookmark_id = $BOOKMARK_ID
  ;

  UPDATE
    bookmark
  SET
    updatedAt   = UNIX_TIMESTAMP()
  WHERE
    bookmark.id = $BOOKMARK_ID
  ;

  SELECT $LIST_ID AS listId, $BOOKMARK_ID AS bookmarkId;

END