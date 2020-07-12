DROP PROCEDURE IF EXISTS link_list_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_list_get_all(
  IN link_data JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @link_id = JSON_EXTRACT(link_data, '$.linkId');

  -- Retrieve values from JSON
  SELECT
    `list`.`id`,
    `list`.`name`,
    `list`.`description`,
    `list`.`isPrivate`,
    `list`.`createdAt`
  FROM `list`
  INNER JOIN link_user_list ON list.id = link_user_list.list_id
  INNER JOIN link_user ON link_user.id = link_user_list.link_user_id
  WHERE `link_user`.`id` = JSON_UNQUOTE(@link_id);

END