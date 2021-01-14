DROP PROCEDURE IF EXISTS tag_user_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE tag_user_get_all(
  IN $TAG_ID INT
)

BEGIN

  SELECT
    user.id,
    user.name,
    user.level,
    user.statement,
    user.location,
    user.createdAt,
    user.updatedAt
  FROM `user`
  JOIN bookmark ON user.id = bookmark.user_id
  JOIN bookmark_tag ON bookmark_tag.bookmark_id = bookmark.id
  WHERE bookmark_tag.tag_id                     = $TAG_ID
    AND bookmark.isPrivate IS NOT TRUE
  ;

END