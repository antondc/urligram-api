DROP PROCEDURE IF EXISTS list_delete_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_delete_one(
  IN data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @list_id = JSON_UNQUOTE(JSON_EXTRACT(data, '$.listId'));

  DELETE FROM user_list
  WHERE list_id = @list_id;

  DELETE FROM bookmark_list
  WHERE list_id = @list_id;

  DELETE FROM `list`
  WHERE id = @list_id;

  SELECT @list_id AS listId;

END