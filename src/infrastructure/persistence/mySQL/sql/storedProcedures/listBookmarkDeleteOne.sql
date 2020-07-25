DROP PROCEDURE IF EXISTS list_bookmark_delete_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_bookmark_delete_one(
  IN data JSON
)
BEGIN

  SET @list_id          = JSON_UNQUOTE(JSON_EXTRACT(data, '$.listId'));
  SET @bookmark_id      = JSON_UNQUOTE(JSON_EXTRACT(data, '$.bookmarkId'));

  DELETE FROM bookmark_list
  WHERE
    list_id = @list_id
    AND bookmark_id = @bookmark_id
  ;

  SELECT @list_id AS listId, @bookmark_id AS bookmarkId;

END