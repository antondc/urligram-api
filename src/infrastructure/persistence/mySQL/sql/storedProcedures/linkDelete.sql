
DROP PROCEDURE IF EXISTS link_delete;

-- Stored procedure to delete link_user
CREATE PROCEDURE link_delete(
  IN link_data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @link_user_id     = JSON_EXTRACT(link_data, '$.linkUserId');

  DELETE FROM link_user
  WHERE link_user = JSON_UNQUOTE(@link_user_id);

END