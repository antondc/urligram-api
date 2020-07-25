DROP PROCEDURE IF EXISTS list_user_update_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_update_one(
  IN data JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @list_id            = JSON_UNQUOTE(JSON_EXTRACT(data, '$.listId'));
  SET @user_id            = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));
  SET @user_list_status   = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userListStatus'));
  SET @user_role          = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userRole'));

  UPDATE user_list
  SET
    userListStatus        = @user_list_status,
    userRole              = @user_role
  WHERE user_list.user_id = @user_id
    AND user_list.list_id           = @list_id
  ;

  SELECT @list_id AS listId, @user_id AS userId;

END