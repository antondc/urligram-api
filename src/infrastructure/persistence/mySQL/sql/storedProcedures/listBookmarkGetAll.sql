DROP PROCEDURE IF EXISTS list_bookmark_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_bookmark_get_all(
  IN $LIST_ID INT
)
BEGIN

  SELECT
    bookmark.id,
    bookmark.title AS bookmarkTitle,
    bookmark.user_id AS userId,
    CONCAT(domain.domain, link.path) AS url,
    bookmark.isPrivate,
    bookmark.saved
  FROM bookmark_list
  JOIN bookmark ON bookmark_list.bookmark_id  = bookmark.id
  JOIN link ON bookmark.link_id               = link.id
  JOIN domain ON link.domain_id               = domain.id
  JOIN `list` ON bookmark_list.list_id        = list.id
  LEFT JOIN user_list ON user_list.list_id    = list.id
  WHERE
    list.id                                   = $LIST_ID
  ;

END