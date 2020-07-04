DROP PROCEDURE IF EXISTS user_link_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_link_get_all(
    IN user_data JSON
)

BEGIN

  -- Retrieve values from JSON
  SET @user_id = JSON_EXTRACT(user_data, '$.userId');

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
  WHERE link_user.user_id = JSON_UNQUOTE(@user_id);

END