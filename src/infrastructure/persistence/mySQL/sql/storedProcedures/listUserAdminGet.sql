DROP PROCEDURE IF EXISTS list_user_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_get_one(
  IN data JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @list_id           = JSON_UNQUOTE(JSON_EXTRACT(data, '$.listId'));
  SET @list_name         = JSON_UNQUOTE(JSON_EXTRACT(data, '$.listName'));
  SET @user_id           = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));

  -- Upsert into list
 SELECT
   `user`.`id`,
   `user`.`name`,
   `user`.`level`,
   `user`.`email`,
   `user`.`status`,
   `user`.`statement`,
   `user`.`location`,
   `user`.`order`,
   `user`.`createdAt`,
   `user`.`updatedAt`
  FROM `user`
  INNER JOIN `list` ON `list`.`userId` = `user`.`id`
  WHERE (
    `list`.`id`          = @list_id
  ) OR (
    `list`.`name`        = @list_name
    AND `list`.`userId`  = @user_id
  );

END