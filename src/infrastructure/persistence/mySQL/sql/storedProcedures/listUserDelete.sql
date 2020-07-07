DROP PROCEDURE IF EXISTS list_user_delete;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_delete(
  IN list_data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @list_id = JSON_UNQUOTE(JSON_EXTRACT(list_data, '$.listId'));
  SET @user_id = JSON_UNQUOTE(JSON_EXTRACT(list_data, '$.userId'));

  DELETE FROM user_list
  WHERE user_list.list_id = @list_id AND user_id = @user_id;

  SELECT @list_id AS listId, @user_id AS userId;

END