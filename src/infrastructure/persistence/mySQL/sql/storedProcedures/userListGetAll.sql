DROP PROCEDURE IF EXISTS user_list_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_list_get_all(
    IN data JSON
)

BEGIN

  SET @user_id = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));
  SET @session_id = JSON_UNQUOTE(JSON_EXTRACT(data, '$.sessionId'));

  SELECT
    `list`.`id`,
    `list`.`order`,
    `list`.`name`,
    `list`.`description`,
    `list`.`name`,
    `user_list`.`userRole`,
    `user`.`id` AS userId,
    `list`.`createdAt`,
    `list`.`isPrivate`,
    `user_list`.`userRole`
  FROM `list`
  INNER JOIN `user_list` ON `user_list`.`list_id` = `list`.`id`
  INNER JOIN `user` ON `user_list`.`user_id` = `user`.`id`
  WHERE
    list.isPrivate != 1
    AND user.id IN (
        SELECT
          `user_list`.`user_id`
        FROM `user_list`
        JOIN `user` ON `user_list`.`user_id` = `user`.`id`
        WHERE `user_list`.`list_id` = `LIST`.`id` AND user_list.user_id = @user_id
    )
    OR (
      list.isPrivate = 1
      AND
      user_id IN (
        SELECT
          `user_list`.`user_id`
        FROM `user_list`
        JOIN `user` ON `user_list`.`user_id` = `user`.`id`
        WHERE `user_list`.`list_id` = `LIST`.`id` AND user_list.user_id = @session_id
      )
    )
  ;


END