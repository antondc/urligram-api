DROP PROCEDURE IF EXISTS list_user_delete_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_delete_one(
  IN data JSON
)
BEGIN

  SET @list_id      = JSON_UNQUOTE(JSON_EXTRACT(data, '$.listId'));
  SET @user_id      = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));

  DELETE FROM user_list
  WHERE
    list_id     = @list_id
    AND user_id = @user_id
  ;

  SELECT @list_id AS listId, @user_id AS userId;

END