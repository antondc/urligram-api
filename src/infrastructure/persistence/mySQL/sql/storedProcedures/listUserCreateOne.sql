DROP PROCEDURE IF EXISTS list_user_create_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_create_one(
  IN data JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @list_id          = JSON_UNQUOTE(JSON_EXTRACT(data, '$.listId'));
  SET @user_id          = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));
  SET @user_list_status           = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userListStatus'));

  -- Upsert into list
  INSERT INTO user_list (
    user_id,
    list_id,
    userListStatus,
    userRole
  ) VALUES (
    @user_id,
    @list_id,
    @user_list_status,
    "reader"
  );


  SELECT @list_id AS listId, @user_id AS userId;

END