DROP PROCEDURE IF EXISTS list_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_get_one(
  IN data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @list_id        = JSON_UNQUOTE(JSON_EXTRACT(data, '$.listId'));
  SET @user_id        = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));
  SET @list_name      = JSON_UNQUOTE(JSON_EXTRACT(data, '$.listName'));

  -- In case we don't have a list_id, find the list for given list name, given user as admin of the list, and list type
  IF @list_id IS NULL THEN
    SET @list_id = (
      SELECT
        `list`.`id`
      FROM `list`
      INNER JOIN `user_list` ON `list`.`id` = `user_list`.`list_id`
      WHERE
        `list`.`name`                       = @list_name
        AND `user_list`.`user_id`           = @user_id
    );
  END IF;

  -- Select list with links, and place into it the links
  SELECT
    `list`.`id`,
    `list`.`name`,
    `list`.`description`,
    `list`.`isPrivate`,
    `list`.`createdAt`,
    `list`.`updatedAt`,
    (
      SELECT
        IF(
          COUNT(`user_list`.`id`) = 0,
          JSON_ARRAY(),
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', `user_list`.`user_id`,
              'name', `user`.`name`,
              'userRole', `user_list`.`userRole`
            )
          )
        )
      FROM `user_list`
      JOIN `user` ON `user_list`.`user_id` = `user`.`id`
      WHERE `user_list`.`list_id` = `list`.`id`
    ) as users
    FROM `list`
    WHERE `list`.`id` =  @list_id;

END