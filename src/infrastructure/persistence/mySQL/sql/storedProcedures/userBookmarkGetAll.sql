DROP PROCEDURE IF EXISTS user_bookmark_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_bookmark_get_all(
  IN $USER_ID VARCHAR(40)
)

BEGIN

  SELECT
    bookmark.id,
    bookmark.order,
    CONCAT(domain.domain, link.path) AS url,
    bookmark.link_id AS linkId,
    bookmark.isPrivate,
    bookmark.saved,
    bookmark.user_id as userId,
    bookmark.createdAt,
    bookmark.updatedAt
  FROM bookmark
  INNER JOIN link ON bookmark.link_id = link.id
  INNER JOIN domain ON link.domain_id = domain.id
  WHERE bookmark.user_id = $USER_ID;

END