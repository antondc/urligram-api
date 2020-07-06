DROP PROCEDURE IF EXISTS tag_list_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE tag_list_get_all(
  IN tag_data JSON
)
BEGIN

-- Retrieve values from JSON
SET @tag_id = JSON_EXTRACT(tag_data, '$.tagId');

  SELECT
    `list`.`id`,
    `list`.`name`,
    `list`.`description`,
    `list`.`isPublic`,
    `list`.`createdAt`
  FROM LIST
  INNER JOIN link_user_list ON list.id = link_user_list.list_id
  INNER JOIN link_user ON link_user_list.link_user_id = link_user.id
  INNER JOIN link_user_tag ON link_user.id = link_user_tag.link_user_id
  INNER JOIN tag ON link_user_tag.tag_id = tag.id
  WHERE `tag`.`id` = JSON_UNQUOTE(@tag_id)
  GROUP BY list.id;

END