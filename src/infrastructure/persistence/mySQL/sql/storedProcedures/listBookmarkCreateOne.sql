DROP PROCEDURE IF EXISTS list_bookmark_create_one;

-- DELIMITER $$

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_bookmark_create_one(
  IN $LIST_ID INT,
  IN $BOOKMARK_ID INT
)
BEGIN

  SET @newOrder := (select IFNULL(MAX(`order`), 0) FROM bookmark_list) + 1;


  -- Upsert into list
  INSERT INTO bookmark_list (
    `order`,
    list_id,
    bookmark_id
  ) VALUES (
    @newOrder,
    $LIST_ID,
    $BOOKMARK_ID
  ) ON DUPLICATE KEY UPDATE
    list_id      = $LIST_ID,
    bookmark_id  = $BOOKMARK_ID,
    updatedAt    = UNIX_TIMESTAMP();

  UPDATE
    bookmark
  SET
    updatedAt   = UNIX_TIMESTAMP()
  WHERE
    bookmark.id = $BOOKMARK_ID
  ;

  SELECT $LIST_ID AS listId, $BOOKMARK_ID AS bookmarkId;

END

-- DELIMITER ;
