DROP PROCEDURE IF EXISTS user_bookmark_get_all;

-- DELIMITER $$

CREATE PROCEDURE user_bookmark_get_all(
  IN $SESSION_ID VARCHAR(40),
  IN $USER_ID VARCHAR(40),
  IN $SORT VARCHAR(40),
  IN $SIZE INT,
  IN $OFFSET INT,
  IN $FILTER JSON
)

BEGIN

  SET $SIZE = IFNULL($SIZE, -1);
  SET @filterTags  = JSON_UNQUOTE(JSON_EXTRACT($FILTER, '$.tags'));

  SELECT DISTINCT
    count(*) OVER() as totalItems,
    bookmark.id,
    bookmark.title,
    bookmark.order,
    CONCAT(domain.domain, link.path) AS url,
    bookmark.link_id AS linkId,
    `link`.`favicon`,
    bookmark.isPrivate,
    bookmark.saved,
    bookmark.user_id AS userId,
    bookmark.createdAt,
    bookmark.updatedAt,
    (
      SELECT
        COUNT(bookmark.id)
      FROM bookmark
      WHERE bookmark.link_id = link.id
    ) AS timesBookmarked,
    (
      SELECT
        SUM(IF(user_link.vote IS NULL, 0, IF(user_link.vote = 0, -1, 1)))
      FROM user_link
      WHERE user_link.link_id = link.id
    ) AS totalVote,
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
    ) AS tags,
    (
      SELECT
        IF(COUNT(bookmark.user_id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(bookmark.user_id))
      FROM bookmark
      WHERE bookmark.link_id = link.id
    ) AS users,
    (
      SELECT
        IF(
          COUNT(bookmark.id) = 0,
          JSON_ARRAY(),
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', `bookmark`.`id`,
              'title', `bookmark`.`title`,
              'userId', `bookmark`.`user_id`
            )
          )
        )
      FROM `bookmark`
      WHERE bookmark.link_id = link.id
      AND (
        bookmark.isPrivate IS NOT TRUE
        OR bookmark.user_id = $SESSION_ID
      )
    ) AS bookmarksRelated
  FROM bookmark
  INNER JOIN link ON bookmark.link_id = link.id
  INNER JOIN domain ON link.domain_id = domain.id
  LEFT JOIN bookmark_tag ON bookmark_tag.bookmark_id = bookmark.id
  LEFT JOIN tag ON bookmark_tag.tag_id = tag.id
  WHERE
      (
        (
          bookmark.`user_id` = $USER_ID
          AND
          bookmark.isPrivate IS NOT TRUE
        )
        OR
        (
          bookmark.`user_id` = $USER_ID
          AND
          $USER_ID = $SESSION_ID
        )
      )
      AND
      (
        CASE WHEN @filterTags IS NOT NULL AND JSON_CONTAINS(@filterTags, JSON_QUOTE(tag.name)) THEN TRUE END
        OR
        CASE WHEN @filterTags IS NULL THEN TRUE END
      )

  GROUP BY bookmark.id
  ORDER BY
    CASE WHEN $SORT = 'id'                THEN `bookmark`.id      	ELSE NULL END ASC,
    CASE WHEN $SORT = '-id'               THEN `bookmark`.id      	ELSE NULL END DESC,
    CASE WHEN $SORT = 'createdAt'         THEN `bookmark`.createdAt	ELSE NULL END ASC,
    CASE WHEN $SORT = '-createdAt'        THEN `bookmark`.createdAt ELSE NULL END DESC,
    CASE WHEN $SORT = 'updatedAt'         THEN `bookmark`.updatedAt ELSE NULL END ASC,
    CASE WHEN $SORT = '-updatedAt'        THEN `bookmark`.updatedAt ELSE NULL END DESC,
    CASE WHEN $SORT = 'vote'              THEN totalVote            ELSE NULL END ASC,
    CASE WHEN $SORT = '-vote'             THEN totalVote            ELSE NULL END DESC,
    CASE WHEN $SORT = 'timesbookmarked'   THEN timesBookmarked      ELSE NULL END ASC,
    CASE WHEN $SORT = '-timesbookmarked'  THEN timesBookmarked      ELSE NULL END DESC,
    CASE WHEN $SORT IS NULL               THEN `bookmark`.id        ELSE NULL END ASC
  LIMIT $OFFSET , $SIZE
  ;

END

-- DELIMITER ;
-- CALL user_bookmark_get_all('e4e2bb46-c210-4a47-9e84-f45c789fcec1', 'b95274c9-3d26-4ce3-98b2-77dce5bd7aae', "-timesbookmarked", NULL, NULL, '{"tags": ["foo"]}');