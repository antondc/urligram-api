DROP PROCEDURE IF EXISTS bookmark_get_all_by_link_id;

-- Stored procedure to insert post and tags
CREATE PROCEDURE bookmark_get_all_by_link_id(
  IN data JSON
)

BEGIN

  -- Retrieve values from JSON
  SET @link_id  = JSON_UNQUOTE(JSON_EXTRACT(data, '$.linkId'));
  SET @user_id  = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));

  SELECT
    bookmark.id,
    bookmark.order,
    link.image AS img,
    bookmark.title,
    CONCAT(domain.domain, link.path) AS url,
    link.id AS linkId,
    bookmark.user_id AS userId,
    bookmark.isPrivate,
    bookmark.saved,
    bookmark.createdAt,
    bookmark.updatedAt,
    (
      SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', tag.id,
            'name', tag.name
          )
        )
      FROM bookmark_tag
      JOIN tag
      ON bookmark_tag.tag_id = tag.id
      WHERE bookmark.id = bookmark_tag.bookmark_id
    ) AS tags

  FROM bookmark
  INNER JOIN `link` ON bookmark.link_id = link.id
  INNER JOIN domain ON link.domain_id = domain.id
  WHERE bookmark.link_id = @link_id
  AND
    (
      bookmark.isPrivate != TRUE OR bookmark.user_id = @user_id
    )
  ORDER BY bookmark.id
  ;

END