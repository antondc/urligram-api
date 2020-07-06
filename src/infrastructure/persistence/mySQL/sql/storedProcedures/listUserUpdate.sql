DROP PROCEDURE IF EXISTS list_user_update;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_update(
  IN list JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @list_id = JSON_UNQUOTE(JSON_EXTRACT(list, '$.listId'));
  SET @user_id = JSON_UNQUOTE(JSON_EXTRACT(list, '$.userId'));
  SET @role_id = JSON_UNQUOTE(JSON_EXTRACT(list, '$.newRole'));

  UPDATE user_list
  SET user_list_role_id = 1
  WHERE user_list.list_id = @list_id AND user_id = @user_id;

  SELECT *
  FROM user_list
  WHERE user_list.list_id = @list_id AND user_id = @user_id;
  
END