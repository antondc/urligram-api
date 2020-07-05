DROP PROCEDURE IF EXISTS list_link_delete;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_link_delete(
  IN list_link JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @list_id      = JSON_UNQUOTE(JSON_EXTRACT(list_link, '$.listId'));
  SET @link_id      = JSON_UNQUOTE(JSON_EXTRACT(list_link, '$.linkId'));

  -- Upsert into list
  DELETE FROM link_user_list
  WHERE
    list_id          = @list_id
    AND link_user_id = @link_id;

  SELECT @list_id AS id, @link_id AS linkId;

END