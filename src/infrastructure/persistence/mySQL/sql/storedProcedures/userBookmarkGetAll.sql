DROP PROCEDURE IF EXISTS user_bookmark_get_all;

/* DELIMITER $$ */

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
    count(*) OVER() as totalItems,
    bookmark.id,
    bookmark.title,
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
        IF(
          COUNT(tag.id) = 0,
          JSON_ARRAY(),
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', tag.id,
              'name', tag.name
            )
          )
        )
      FROM tag
      INNER JOIN bookmark_tag ON bookmark_tag.tag_id = tag.id
      WHERE bookmark_tag.bookmark_id = bookmark.id
    ) AS tags
  FROM bookmark
  INNER JOIN link ON bookmark.link_id = link.id
  INNER JOIN domain ON link.domain_id = domain.id
  LEFT JOIN bookmark_tag ON bookmark_tag.bookmark_id = bookmark.id
  LEFT JOIN tag ON bookmark_tag.tag_id = tag.id
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
    CASE WHEN $SORT = '-updatedAt'  THEN `bookmark`.updatedAt ELSE NULL END DESC,
    CASE WHEN $SORT IS NULL         THEN `bookmark`.id            ELSE NULL END ASC
  LIMIT $OFFSET , $SIZE
  ;

END

/* DELIMITER ; */
/* CALL user_bookmark_get_all('e4e2bb46-c210-4a47-9e84-f45c789fcec1', 'e4e2bb46-c210-4a47-9e84-f45c789fcec1', NULL, NULL, NULL); */