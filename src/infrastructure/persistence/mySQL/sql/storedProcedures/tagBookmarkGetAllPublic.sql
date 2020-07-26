DROP PROCEDURE IF EXISTS tag_bookmark_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE tag_bookmark_get_all(
  IN data JSON
)

BEGIN

  SET @tag_id    = JSON_UNQUOTE(JSON_EXTRACT(data, '$.tagId'));

  -- Returns a list if the list is public, or either the user is owner of the list or a participant
   SELECT
    bookmark.id,
    bookmark.title,
    bookmark.isPrivate,
    bookmark.createdAt,
    bookmark.updatedAt
    FROM bookmark
    JOIN bookmark_tag ON bookmark_tag.bookmark_id = bookmark.id
    WHERE bookmark_tag.tag_id                     = @tag_id
      AND bookmark.isPrivate IS NOT TRUE
  ;

END