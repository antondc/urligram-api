DROP PROCEDURE IF EXISTS list_update;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_update(
  IN list JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @id           = JSON_UNQUOTE(JSON_EXTRACT(list, '$.id'));
  SET @user_id      = JSON_UNQUOTE(JSON_EXTRACT(list, '$.userId'));
  SET @name         = JSON_UNQUOTE(JSON_EXTRACT(list, '$.name'));
  SET @description  = JSON_UNQUOTE(JSON_EXTRACT(list, '$.description'));
  SET @is_public    = JSON_UNQUOTE(JSON_EXTRACT(list, '$.isPublic'));
  SET @list_type    = JSON_UNQUOTE(JSON_EXTRACT(list, '$.listType'));

  UPDATE `list`
  SET
    `name`          = @name,
    `description`   = @description,
    `isPublic`      = @is_public,
    `list_type_id`  = @list_type,
    `updatedAt`     = CURRENT_TIMESTAMP
  WHERE `list`.`id` = @id;

  SELECT *
  FROM `list`
  WHERE `list`.`id` = @id;
END