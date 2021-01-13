DROP PROCEDURE IF EXISTS bookmark_tag_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE bookmark_tag_get_all(
  IN BOOKMARK_ID INT
)

BEGIN

  -- Return tags used by public bookmarks
  SELECT
    tag.id,
    tag.name
  FROM tag
  JOIN bookmark_tag ON bookmark_tag.tag_id = tag.id
  WHERE bookmark_tag.bookmark_id = BOOKMARK_ID
  ORDER BY tag.id
  ;


END