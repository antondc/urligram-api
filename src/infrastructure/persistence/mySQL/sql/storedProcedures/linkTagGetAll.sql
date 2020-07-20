DROP PROCEDURE IF EXISTS link_tag_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_tag_get_all(
  IN data JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @link_id = JSON_UNQUOTE(JSON_EXTRACT(data, '$.linkId'));

  -- Returns tags used to tag links
  SELECT
    `tag`.`id`,
    `tag`.`name`
  FROM `tag`
  INNER JOIN bookmark_tag ON tag.id = bookmark_tag.tag_id
  INNER JOIN bookmark ON bookmark.id = bookmark_tag.bookmark_id
  WHERE
    bookmark.link_id = @link_id
    AND bookmark.isPrivate IS NOT TRUE
  GROUP BY tag.id
  ;

END