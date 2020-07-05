DROP PROCEDURE IF EXISTS list_delete;

-- Stored procedure to delete link_user
CREATE PROCEDURE list_delete(
  IN list_data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @id   = JSON_EXTRACT(list_data, '$.id');

  DELETE FROM user_list
  WHERE user_list.list_id       = JSON_UNQUOTE(@id);

  DELETE FROM link_user_list
  WHERE link_user_list.list_id  = JSON_UNQUOTE(@id);

  DELETE FROM list
  WHERE id                      = JSON_UNQUOTE(@id);

  SELECT JSON_UNQUOTE(@id) AS removedId;

END