DROP PROCEDURE IF EXISTS tag_get_all;

CREATE PROCEDURE tag_get_all()
BEGIN

-- Return tags used by public bookmarks
SELECT
  tag.id,
  tag.name
FROM tag
JOIN bookmark_tag ON bookmark_tag.tag_id = tag.id
JOIN bookmark ON bookmark.id = bookmark_tag.bookmark_id
WHERE bookmark.isPrivate IS NOT TRUE
GROUP BY tag.id
ORDER BY tag.id
;


END