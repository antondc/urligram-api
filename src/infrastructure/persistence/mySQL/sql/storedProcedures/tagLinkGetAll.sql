DROP PROCEDURE IF EXISTS tag_link_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE tag_link_get_all(
  IN tag_data JSON
)
BEGIN

  -- Retrieve values from JSON
SET @tag_id = JSON_EXTRACT(tag_data, '$.tagId');

  -- Upsert into tag

  SELECT
    link_user.id,
    link_user.order,
    CONCAT(domain.domain, link.path) AS url,
    link_user.isPublic,
    link_user.saved,
    link_user.vote,
    link_user.createdAt,
    link_user.updatedAt
  FROM link_user
  INNER JOIN link ON link_user.id = link.id
  INNER JOIN domain ON link.id = domain.id
  INNER JOIN link_user_tag ON link_user.id = link_user_tag.link_user_id
  INNER JOIN `tag` ON `tag`.`id` = `link_user_tag`.`tag_id`
  WHERE `tag`.`id` = JSON_UNQUOTE(@tag_id);

END