DROP PROCEDURE IF EXISTS tag_get_all;

CREATE PROCEDURE tag_get_all()
BEGIN

-- Return tags used by public bookmarks
SELECT
  t.id,
  t.name
FROM tag t
JOIN bookmark_tag b_t ON b_t.tag_id = t.id
JOIN bookmark b ON b.id = b_t.bookmark_id
WHERE b.isPrivate IS NOT TRUE
GROUP BY t.id
ORDER BY t.id
;


END