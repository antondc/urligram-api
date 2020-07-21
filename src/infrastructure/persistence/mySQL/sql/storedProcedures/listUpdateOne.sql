DROP PROCEDURE IF EXISTS list_update_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_update_one(
  IN data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @user_id      = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));
  SET @list_id      = JSON_UNQUOTE(JSON_EXTRACT(data, '$.listId'));
  SET @name         = JSON_UNQUOTE(JSON_EXTRACT(data, '$.name'));
  SET @description  = JSON_UNQUOTE(JSON_EXTRACT(data, '$.description'));
  SET @is_private   = JSON_UNQUOTE(JSON_EXTRACT(data, '$.isPrivate'));

  UPDATE `list`
  SET
    `name`          = @name,
    `description`   = @description,
    `isPrivate`     = @is_private,
    `updatedAt`     = CURRENT_TIMESTAMP
  WHERE `list`.`id` = @list_id;

  SELECT @list_id as listId;
END