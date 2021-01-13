DROP PROCEDURE IF EXISTS link_tag_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_tag_get_all(
  IN LINK_ID INT
)
BEGIN

  -- Returns tags used to tag links
  SELECT
    `tag`.`id`,
    `tag`.`name`
  FROM `tag`
  INNER JOIN bookmark_tag ON tag.id = bookmark_tag.tag_id
  INNER JOIN bookmark ON bookmark.id = bookmark_tag.bookmark_id
  WHERE
    bookmark.link_id = LINK_ID
    AND bookmark.isPrivate IS NOT TRUE
  GROUP BY tag.id
  ;

END