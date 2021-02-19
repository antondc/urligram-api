DROP PROCEDURE IF EXISTS list_bookmark_get_all;

-- DELIMITER $$

CREATE PROCEDURE list_bookmark_get_all(
  IN $LIST_ID INT,
  IN $SESSION_ID TEXT,
  IN $SORT TEXT,
  IN $SIZE INT,
  IN $OFFSET INT
)

BEGIN
  SET $SIZE = IFNULL($SIZE, -1);

  SELECT
    count(*) OVER() as totalItems,
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
  FROM bookmark_list
  JOIN bookmark ON bookmark_list.bookmark_id  = bookmark.id
  JOIN link ON bookmark.link_id               = link.id
  JOIN domain ON link.domain_id               = domain.id
  JOIN `list` ON bookmark_list.list_id        = list.id
  LEFT JOIN user_list ON user_list.list_id    = list.id
  WHERE
    list.id                                   = $LIST_ID
    AND
      (
        `list`.`isPrivate` IS NOT TRUE
        OR
        `list`.`userId`       = $SESSION_ID
         OR
        `user_list`.`user_id` = $SESSION_ID
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

-- DELIMITER ;

-- CALL list_bookmark_get_all(3, "e4e2bb46-c210-4a47-9e84-f45c789fcec1", NULL, 5, 3);