DROP PROCEDURE IF EXISTS link_tag_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_tag_get_all(
  IN link_data JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @link_id = JSON_EXTRACT(link_data, '$.linkId');

  -- Retrieve values from JSON
  SELECT
    `tag`.`id`,
    `tag`.`name`
  FROM `tag`
  INNER JOIN link_user_tag ON tag.id = link_user_tag.tag_id
  INNER JOIN link_user ON link_user.id = link_user_tag.link_user_id
  WHERE `link_user`.`id` = JSON_UNQUOTE(@link_id);

END