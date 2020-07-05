DROP PROCEDURE IF EXISTS user_list_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_list_get_all(
    IN user_data JSON
)

BEGIN

  SET @user_id = JSON_EXTRACT(user_data, '$.userId');

  SELECT
    `list`.`id`,
    `list`.`order`,
    `list`.`name`,
    `list`.`description`,
    `list`.`name`,
    `list_type`.`type`,
    `user`.`id` AS userId,
    `list`.`createdAt`
  FROM `list`
  INNER JOIN `user_list` ON `user_list`.`list_id` = `list`.`id`
  INNER JOIN `user` ON `user_list`.`user_id` = `user`.`id`
  INNER JOIN `user_list_role` ON `user_list`.`user_list_role_id` = `user_list_role`.`id`
  INNER JOIN `list_type` ON `list_type`.`id` = `list`.`list_type_id`
  WHERE `user_list`.`user_id` = JSON_UNQUOTE(@user_id);

END