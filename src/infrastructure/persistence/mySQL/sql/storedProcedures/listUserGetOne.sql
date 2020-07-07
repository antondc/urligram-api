DROP PROCEDURE IF EXISTS list_user_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_get_one(
  IN list_data JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @list_id      = JSON_UNQUOTE(JSON_EXTRACT(list_data, '$.listId'));
  SET @user_id      = JSON_UNQUOTE(JSON_EXTRACT(list_data, '$.userId'));

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
   `user`.`updatedAt`,
   `user_list`.`userRole` AS userListRole
  FROM user_list
  INNER JOIN `user` ON `user_list`.`user_id` = `user`.`id`
  WHERE `user_list`.`list_id` = @list_id AND `user_list`.`user_id` = @user_id;

  SELECT @list_id, @user_id;

END