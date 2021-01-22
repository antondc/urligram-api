DROP PROCEDURE IF EXISTS list_tags_get_all;

CREATE PROCEDURE list_tags_get_all(
  IN $SESSION_ID VARCHAR(40),
  IN $LIST_ID INT
)

BEGIN

-- Return tags used by bookmarks in a list
SELECT DISTINCT
  tag.id,
  tag.name
  FROM tag
  JOIN bookmark_tag ON bookmark_tag.tag_id = tag.id
  JOIN bookmark ON bookmark.id = bookmark_tag.bookmark_id
  JOIN bookmark_list ON bookmark_list.bookmark_id = bookmark.id
  WHERE bookmark_list.list_id = $LIST_ID
    AND
    (
      bookmark.isPrivate IS NOT TRUE
      OR
      bookmark.user_id = $SESSION_ID
    );

END
