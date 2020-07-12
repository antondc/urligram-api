DROP PROCEDURE IF EXISTS link_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_get_all()

BEGIN

  SELECT
    link_user.id,
    link_user.order,
    CONCAT(domain.domain, link.path) AS url,
    link_user.isPrivate,
    link_user.saved,
    link_user.vote,
    link_user.createdAt,
    link_user.updatedAt
  FROM link_user
  INNER JOIN link ON link_user.id = link.id
  INNER JOIN domain ON link.id = domain.id;

END