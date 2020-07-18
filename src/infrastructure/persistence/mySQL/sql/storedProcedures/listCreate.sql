DROP PROCEDURE IF EXISTS list_create;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_create(
  IN data JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @list_user_id      = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));
  SET @list_name         = JSON_UNQUOTE(JSON_EXTRACT(data, '$.listName'));
  SET @list_description  = JSON_UNQUOTE(JSON_EXTRACT(data, '$.listDescription'));
  SET @list_is_private   = JSON_UNQUOTE(JSON_EXTRACT(data, '$.listIsPrivate'));

  -- Upsert into list
  INSERT INTO list (
    `name`,
    `description`,
    `isPrivate`
  ) VALUES (
    @list_name,
    @list_description,
    @list_is_private
  ) ON DUPLICATE KEY UPDATE
    name        = @list_name,
    description = @list_description,
    isPrivate   = @list_is_private,
    updatedAt   = CURRENT_TIMESTAMP;

  -- Retrieve the upserted id
  SET @list_id = LAST_INSERT_ID();

  -- Upsert into user_list
  INSERT INTO user_list (
    `list_id`,
    `user_id`,
    `userRole`
  ) VALUES (
    @list_id,
    @list_user_id,
    1
  ) ON DUPLICATE KEY UPDATE
    list_id            = @list_id,
    user_id            = @list_user_id,
    userRole  = "admin",
    updatedAt = CURRENT_TIMESTAMP;

  SELECT @list_id as listId;

END