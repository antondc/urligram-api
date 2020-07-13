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
    link.id,
    CONCAT(domain.domain, link.path) AS url,
    link_user.isPrivate,
    (
      SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', tag.id,
            'name', tag.name
          )
        )
      FROM link_user_tag
      JOIN tag
      ON link_user_tag.tag_id = tag.id
      WHERE link_user.link_id = link_user_tag.link_user_id
    ) as tags,
    (
      SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', user.id,
            'name', user.name
          )
        )
      FROM link_user
      JOIN user ON link_user.user_id = user.id
      WHERE link_user.link_id = link.id
    ) as users,
    link.createdAt,
    link_user.updatedAt
  FROM link_user
  INNER JOIN link ON link.id = link_user.link_id
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