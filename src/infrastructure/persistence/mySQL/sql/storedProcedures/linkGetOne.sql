DROP PROCEDURE IF EXISTS link_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_get_one(
  IN link_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @id = JSON_EXTRACT(link_data, '$.id');

  SELECT
    link_user.id,
    link_user.order,
    CONCAT(domain.domain, link.path) AS url,
    link_user.isPublic,
    link_user.saved,
    link_user.vote,
    link_user.createdAt,
    link_user.updatedAt
  FROM link_user
  INNER JOIN link ON link_user.id = link.id
  INNER JOIN domain ON link.id = domain.id
  WHERE link_user.id = JSON_UNQUOTE(@id);

END