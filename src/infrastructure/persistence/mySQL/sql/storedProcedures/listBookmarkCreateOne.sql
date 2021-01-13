DROP PROCEDURE IF EXISTS list_bookmark_create_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_bookmark_create_one(
  IN $LIST_ID INT,
  IN $BOOKMARK_ID INT
)
BEGIN

  -- Upsert into list
  INSERT INTO bookmark_list (
    list_id,
    bookmark_id
  ) VALUES (
    $LIST_ID,
    $BOOKMARK_ID
  ) ON DUPLICATE KEY UPDATE
    list_id      = $LIST_ID,
    bookmark_id  = $BOOKMARK_ID,
    updatedAt    = CURRENT_TIMESTAMP;


  SELECT $LIST_ID AS listId, $BOOKMARK_ID AS bookmarkId;

END