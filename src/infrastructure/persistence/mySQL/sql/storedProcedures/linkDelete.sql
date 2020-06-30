
DROP PROCEDURE IF EXISTS link_delete;

-- Stored procedure to delete link_user
CREATE PROCEDURE link_delete(
  IN link_data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @id   = JSON_EXTRACT(link_data, '$.id');

  DELETE FROM link_user_tag
  WHERE link_user_id  = JSON_UNQUOTE(@id);

  DELETE FROM link_user_list
  WHERE link_user_id  = JSON_UNQUOTE(@id);

  DELETE FROM link_user
  WHERE id            = JSON_UNQUOTE(@id);

END