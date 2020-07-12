DROP PROCEDURE IF EXISTS link_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_get_one(
  IN link_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @id = JSON_EXTRACT(link_data, '$.id');
  SET @user_id = JSON_EXTRACT(link_data, '$.userId');
  SET @path = JSON_EXTRACT(link_data, '$.path');
  SET @domain = JSON_EXTRACT(link_data, '$.domain');

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
  INNER JOIN link ON link_user.link_id = link.id
  INNER JOIN domain ON link.domain_id = domain.id
  WHERE
    link_user.id = JSON_UNQUOTE(@id)
    OR (
      link_user.user_id = JSON_UNQUOTE(@user_id)
      AND
      link.path = JSON_UNQUOTE(@path)
      AND
      domain.domain = JSON_UNQUOTE(@domain)
    );

END