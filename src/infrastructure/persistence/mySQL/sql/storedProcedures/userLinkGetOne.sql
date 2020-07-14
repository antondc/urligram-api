DROP PROCEDURE IF EXISTS user_link_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_link_get_one(
    IN link_user_data JSON
)

BEGIN

  -- Retrieve values from JSON
  SET @user_id = JSON_EXTRACT(link_user_data, '$.userId');
  SET @link_id = JSON_EXTRACT(link_user_data, '$.linkId');
  SET @path    = JSON_EXTRACT(link_user_data, '$.path');
  SET @domain  = JSON_EXTRACT(link_user_data, '$.domain');

  SELECT
    link_user.id,
    link_user.order,
    CONCAT(domain.domain, link.path) AS url,
    link_user.isPrivate,
    link_user.saved,
    link_user.vote,
    link_user.createdAt,
    link_user.updatedAt,
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
      WHERE link_user.id = link_user_tag.link_user_id
    ) AS tags,
    (
      SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', list.id,
            'name', list.name
          )
        )
      FROM link_user_list
      JOIN LIST
      ON link_user_list.list_id = list.id
      WHERE link_user.id = link_user_list.link_user_id
    ) AS lists
  FROM link_user
  INNER JOIN link ON link_user.link_id = link.id
  INNER JOIN domain ON link.domain_id = domain.id
  WHERE
    (
     link_user.user_id     = JSON_UNQUOTE(@user_id)
     AND link_user.link_id = JSON_UNQUOTE(@link_id)
    )
    OR (
      link_user.user_id = JSON_UNQUOTE(@user_id)
      AND
      link.path = JSON_UNQUOTE(@path)
      AND
      domain.domain = JSON_UNQUOTE(@domain)
    );

END