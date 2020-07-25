DROP PROCEDURE IF EXISTS list_user_create_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_create_one(
  IN data JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @list_id          = JSON_UNQUOTE(JSON_EXTRACT(data, '$.listId'));
  SET @user_id          = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));
  SET @status           = JSON_UNQUOTE(JSON_EXTRACT(data, '$.status'));

  -- Upsert into list
  INSERT INTO user_list (
    user_id,
    list_id,
    status,
    userRole
  ) VALUES (
    @user_id,
    @list_id,
    @status,
    "reader"
  );


  SELECT @list_id AS listId, @user_id AS userId;

END