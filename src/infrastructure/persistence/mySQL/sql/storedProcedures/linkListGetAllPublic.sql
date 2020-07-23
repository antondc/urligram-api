DROP PROCEDURE IF EXISTS link_list_get_all_public;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_list_get_all_public(
  IN data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @link_id  = JSON_UNQUOTE(JSON_EXTRACT(data, '$.linkId'));

 -- Returns a list if the list is public, or either the user is owner of the list or a participant
   SELECT
      list.id,
      list.name,
      list.description,
      list.isPrivate,
      list.userId,
      bookmark.isPrivate
    FROM `list`
    JOIN bookmark_list ON bookmark_list.list_id = list.id
    JOIN bookmark ON bookmark_list.bookmark_id = bookmark.id
    WHERE bookmark.link_id = @link_id
      AND bookmark.isPrivate IS NOT TRUE
  ;

END