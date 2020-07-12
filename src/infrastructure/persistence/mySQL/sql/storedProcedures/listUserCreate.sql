DROP PROCEDURE IF EXISTS list_user_create;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_create(
  IN list_user JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @list_id = JSON_UNQUOTE(JSON_EXTRACT(list_user, '$.listId'));
  SET @user_id = JSON_UNQUOTE(JSON_EXTRACT(list_user, '$.userId'));

  -- Upsert into list
  INSERT INTO user_list (
    `list_id`,
    `userRole`,
    `user_id`
  ) VALUES (
    @list_id,
    "reader",
    @user_id
  );

  SELECT @list_id AS listId, @user_id AS userId;

END