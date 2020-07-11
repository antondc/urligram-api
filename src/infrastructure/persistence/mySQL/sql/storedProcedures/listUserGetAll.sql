DROP PROCEDURE IF EXISTS list_user_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_get_all(
  IN list_data JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @list_id = JSON_UNQUOTE(JSON_EXTRACT(list_data, '$.listId'));

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
  FROM `user_list`
  INNER JOIN `user` ON `user_list`.`user_id` = `user`.`id`
  INNER JOIN `list` ON `user_list`.`list_id` = `list`.`id`
  WHERE `user_list`.`list_id` = JSON_UNQUOTE(@list_id);

END