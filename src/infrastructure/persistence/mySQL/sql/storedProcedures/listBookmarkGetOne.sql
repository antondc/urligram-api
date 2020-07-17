DROP PROCEDURE IF EXISTS list_bookmark_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_bookmark_get_one(
  IN data JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @list_id      = JSON_UNQUOTE(JSON_EXTRACT(data, '$.listId'));
  SET @bookmark_id  = JSON_UNQUOTE(JSON_EXTRACT(data, '$.bookmarkId'));

  SELECT
    bookmark.id,
    bookmark.user_id AS userId,
    CONCAT(domain.domain, link.path) AS url,
    bookmark.isPrivate,
    bookmark.saved,
    bookmark.vote
  FROM bookmark_list
  JOIN bookmark ON bookmark_list.bookmark_id = bookmark.id
  JOIN link ON bookmark.link_id = link.id
  JOIN domain ON link.domain_id = domain.id
  WHERE `bookmark_list`.`list_id` = @list_id AND `bookmark_list`.`bookmark_id` = @bookmark_id;

END