DROP PROCEDURE IF EXISTS bookmark_get_all_by_link_id;

-- Stored procedure to insert post and tags
CREATE PROCEDURE bookmark_get_all_by_link_id(
  IN LINK_ID INT,
  IN USER_ID VARCHAR(40)
)

BEGIN

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
  WHERE bookmark.link_id = LINK_ID
  AND
    (
      bookmark.isPrivate != TRUE OR bookmark.user_id = USER_ID
    )
  ORDER BY bookmark.id
  ;

END