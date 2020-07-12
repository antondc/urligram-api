DROP PROCEDURE IF EXISTS list_create;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_create(
  IN list JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @user_id      = JSON_UNQUOTE(JSON_EXTRACT(list, '$.userId'));
  SET @name         = JSON_UNQUOTE(JSON_EXTRACT(list, '$.name'));
  SET @description  = JSON_UNQUOTE(JSON_EXTRACT(list, '$.description'));
  SET @is_private    = JSON_UNQUOTE(JSON_EXTRACT(list, '$.isPrivate'));
  SET @list_type    = JSON_UNQUOTE(JSON_EXTRACT(list, '$.listType'));

  -- Upsert into list
  INSERT INTO list (
    `name`,
    `description`,
    `isPrivate`,
    `list_type_id`
  ) VALUES (
    @name,
    @description,
    @is_private,
    @list_type
  ) ON DUPLICATE KEY UPDATE
    name        = @name,
    description = @description,
    isPrivate   = @is_private,
    list_type_id   = @list_type,
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
    @user_id,
    1
  ) ON DUPLICATE KEY UPDATE
    list_id            = @list_id,
    user_id            = @user_id,
    userRole  = "admin",
    updatedAt = CURRENT_TIMESTAMP;

  SELECT @list_id as id;

END