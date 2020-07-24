DROP PROCEDURE IF EXISTS list_bookmark_create_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_bookmark_create_one(
  IN data JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @list_id          = JSON_UNQUOTE(JSON_EXTRACT(data, '$.listId'));
  SET @bookmark_id      = JSON_UNQUOTE(JSON_EXTRACT(data, '$.bookmarkId'));

  -- Upsert into list
  INSERT INTO bookmark_list (
    list_id,
    bookmark_id
  ) VALUES (
    @list_id,
    @bookmark_id
  ) ON DUPLICATE KEY UPDATE
    list_id      = @list_id,
    bookmark_id  = @bookmark_id,
    updatedAt    = CURRENT_TIMESTAMP;


  SELECT @list_id AS listId, @bookmark_id AS bookmarkId;

END