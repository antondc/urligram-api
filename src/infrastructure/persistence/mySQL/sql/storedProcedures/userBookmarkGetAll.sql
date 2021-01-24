DROP PROCEDURE IF EXISTS user_bookmark_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_bookmark_get_all(
  IN $SESSION_ID VARCHAR(40),
  IN $USER_ID VARCHAR(40),
  IN $SORT VARCHAR(40),
  IN $SIZE INT,
  IN $OFFSET INT
)

BEGIN

  SET $SIZE = IFNULL($SIZE, -1);

  SELECT DISTINCT
    bookmark.id,
    bookmark.order,
    CONCAT(domain.domain, link.path) AS url,
    bookmark.link_id AS linkId,
    bookmark.isPrivate,
    bookmark.saved,
    bookmark.user_id AS userId,
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
      FROM tag
      INNER JOIN bookmark_tag ON bookmark_tag.tag_id = tag.id
      WHERE bookmark_tag.bookmark_id = bookmark.id
    ) AS tags
  FROM bookmark
  INNER JOIN link ON bookmark.link_id = link.id
  INNER JOIN domain ON link.domain_id = domain.id
  INNER JOIN bookmark_tag ON bookmark_tag.bookmark_id = bookmark.id
  INNER JOIN tag ON bookmark_tag.tag_id = tag.id
  WHERE bookmark.user_id = $USER_ID
  AND
    (
      bookmark.isPrivate IS NOT TRUE
      OR
      bookmark.user_id = $SESSION_ID
    )
  GROUP BY bookmark.id
  ORDER BY
    CASE WHEN $SORT = 'id'          THEN `bookmark`.id      	ELSE NULL END ASC,
    CASE WHEN $SORT = '-id'         THEN `bookmark`.id      	ELSE NULL END DESC,
    CASE WHEN $SORT = 'createdAt'   THEN `bookmark`.createdAt	ELSE NULL END ASC,
    CASE WHEN $SORT = '-createdAt'  THEN `bookmark`.createdAt ELSE NULL END DESC,
    CASE WHEN $SORT = 'updatedAt'   THEN `bookmark`.updatedAt ELSE NULL END ASC,
    CASE WHEN $SORT = '-updatedAt'  THEN `bookmark`.updatedAt ELSE NULL END DESC
  LIMIT $OFFSET , $SIZE
  ;

END