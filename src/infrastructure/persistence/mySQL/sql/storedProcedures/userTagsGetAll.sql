DROP PROCEDURE IF EXISTS user_tags_get_all;

CREATE PROCEDURE user_tags_get_all(
  IN $USER_ID VARCHAR(40),
  IN $SESSION_ID VARCHAR(40)
)
BEGIN

-- Return tags used by users
SELECT DISTINCT
  tag.id,
  tag.name
FROM tag
JOIN bookmark_tag ON bookmark_tag.tag_id = tag.id
JOIN bookmark ON bookmark.id = bookmark_tag.bookmark_id
WHERE bookmark.user_id = $USER_ID
  AND
  (
    bookmark.isPrivate IS NOT TRUE
    OR
    bookmark.user_id = $SESSION_ID
  );

END
