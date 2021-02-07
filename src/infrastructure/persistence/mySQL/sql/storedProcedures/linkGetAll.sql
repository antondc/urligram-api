DROP PROCEDURE IF EXISTS link_get_all;

/* DELIMITER $$ */

CREATE PROCEDURE link_get_all(
  IN $SESSION_ID VARCHAR(40),
  IN $SORT VARCHAR(40),
  IN $SIZE INT,
  IN $OFFSET INT,
  IN $FILTER JSON
)

BEGIN

  SET $SIZE = IFNULL($SIZE, -1);
  SET @filterTags  = JSON_UNQUOTE(JSON_EXTRACT($FILTER, '$.tags'));

  SELECT
    link.id,
    link.title,
    link.image as img,
    link.order,
    CONCAT(domain.domain, link.path) AS url,
    (
      -- Perform a select with custom array to remove repetitions
      SELECT
        IF(
          COUNT(tag.id) = 0,
          JSON_ARRAY(),
          CAST(
            CONCAT('[',
              GROUP_CONCAT(
                DISTINCT JSON_OBJECT(
                  'id', tag.id,
                  'name', tag.name
                ) SEPARATOR ','
              ), ']'
            ) AS JSON
          )
        ) AS tags
      FROM bookmark
      JOIN bookmark_tag ON bookmark_tag.bookmark_id = bookmark.id
      JOIN tag ON bookmark_tag.tag_id = tag.id
      WHERE bookmark.link_id = link.id
    ) AS tags,
    (
      SELECT
        JSON_ARRAYAGG(user.id)
      FROM bookmark
      JOIN `user` ON bookmark.user_id = user.id
      WHERE bookmark.link_id = link.id
    ) AS users,
    JSON_ARRAYAGG(bookmark.id) AS bookmarksIds
  FROM link
  INNER JOIN bookmark ON bookmark.link_id = link.id
  INNER JOIN domain ON link.domain_id = domain.id
  LEFT JOIN bookmark_tag ON bookmark.id = bookmark_tag.bookmark_id
  LEFT JOIN tag ON tag.id = bookmark_tag.tag_id
  WHERE
    CASE WHEN @filterTags != "null" AND JSON_CONTAINS(@filterTags, JSON_QUOTE(tag.name)) THEN TRUE END
    OR
    CASE WHEN @filterTags = "null" THEN TRUE END
    AND (
      bookmark.isPrivate IS NOT TRUE
      OR
      bookmark.`user_id` = $SESSION_ID
    )
  GROUP BY link.id
  ORDER BY
    CASE WHEN $SORT = 'id'         THEN link.id      	    ELSE NULL END ASC,
    CASE WHEN $SORT = '-id'        THEN link.id      	    ELSE NULL END DESC,
    CASE WHEN $SORT = 'order'      THEN link.order	      ELSE NULL END ASC,
    CASE WHEN $SORT = '-order'     THEN link.order        ELSE NULL END DESC,
    CASE WHEN $SORT = 'bookmarks'  THEN COUNT(bookmark.id)  ELSE NULL END ASC,
    CASE WHEN $SORT = '-bookmarks' THEN COUNT(bookmark.id)  ELSE NULL END DESC,
    CASE WHEN $SORT IS NULL        THEN COUNT(link.id)    ELSE NULL END DESC
  LIMIT $OFFSET , $SIZE
 ;

END

/* DELIMITER ; */

/* CALL link_get_all('e4e2bb46-c210-4a47-9e84-f45c789fcec1', '-bookmarks', NULL, NULL, '{"tags": [ "asd"]}'); */