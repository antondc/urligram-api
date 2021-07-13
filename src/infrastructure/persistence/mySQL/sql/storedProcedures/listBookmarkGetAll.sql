DROP PROCEDURE IF EXISTS list_bookmark_get_all;

/* DELIMITER $$ */

CREATE PROCEDURE list_bookmark_get_all(
  IN $LIST_ID INT,
  IN $SESSION_ID TEXT,
  IN $SORT TEXT,
  IN $SIZE INT,
  IN $OFFSET INT,
  IN $FILTER JSON
)

BEGIN
  SET $SIZE = IFNULL($SIZE, -1);
  SET @filterTags  = JSON_UNQUOTE(JSON_EXTRACT($FILTER, '$.tags'));

  SELECT
    count(*) OVER() AS totalItems,
    bookmark.id,
    bookmark.order,
    link.image AS img,
    bookmark.title,
    CONCAT(domain.domain, link.path) AS url,
    link.id AS linkId,
    `link`.`favicon`,
    bookmark.user_id AS userId,
    bookmark.isPrivate,
    bookmark.saved,
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
        JSON_ARRAYAGG(user_link.vote)
      FROM user_link
      WHERE user_link.link_id = bookmark.link_id
    ) AS allVotes,
    (
      SELECT
        SUM(IF(user_link.vote IS NULL, 0, IF(user_link.vote = 0, -1, 1)))
      FROM user_link
      WHERE user_link.link_id = bookmark.link_id
    ) AS totalVote,
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
  GROUP BY bookmark.link_id
  HAVING
    (
      CASE WHEN @filterTags IS NOT NULL AND JSON_CONTAINS(UPPER(JSON_EXTRACT(tags, '$[*].name')), UPPER(@filterTags)) THEN TRUE END
      OR
      CASE WHEN @filterTags IS NULL THEN TRUE END
    )
  ORDER BY
    CASE WHEN $SORT = 'id'                THEN `bookmark`.id      	  ELSE NULL END ASC,
    CASE WHEN $SORT = '-id'               THEN `bookmark`.id      	  ELSE NULL END DESC,
    CASE WHEN $SORT = 'createdAt'         THEN `bookmark`.createdAt	  ELSE NULL END ASC,
    CASE WHEN $SORT = '-createdAt'        THEN `bookmark`.createdAt   ELSE NULL END DESC,
    CASE WHEN $SORT = 'updatedAt'         THEN `bookmark`.updatedAt   ELSE NULL END ASC,
    CASE WHEN $SORT = '-updatedAt'        THEN `bookmark`.updatedAt   ELSE NULL END DESC,
    CASE WHEN $SORT = 'vote'              THEN totalVote              ELSE NULL END ASC,
    CASE WHEN $SORT = '-vote'             THEN totalVote              ELSE NULL END DESC,
    CASE WHEN $SORT = 'timesbookmarked'   THEN timesBookmarked        ELSE NULL END ASC,
    CASE WHEN $SORT = '-timesbookmarked'  THEN timesBookmarked        ELSE NULL END DESC,
    CASE WHEN $SORT IS NULL               THEN `bookmark`.id          ELSE NULL END ASC
  LIMIT $OFFSET , $SIZE
  ;


END

/* DELIMITER ; */

/* CALL list_bookmark_get_all(10, "e4e2bb46-c210-4a47-9e84-f45c789fcec1", NULL, NULL, NULL, '{"tags": ["Москва"]}'); */