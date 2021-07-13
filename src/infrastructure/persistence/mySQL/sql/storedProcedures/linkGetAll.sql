DROP PROCEDURE IF EXISTS link_get_all;

/* DELIMITER $$ */

CREATE PROCEDURE link_get_all(
  IN $SESSION_ID VARCHAR(40),
  IN $SORT TEXT,
  IN $SIZE INT,
  IN $OFFSET INT,
  IN $FILTER JSON
)

BEGIN

  SET $SIZE = IFNULL($SIZE, -1);
  SET @filterTags  = JSON_UNQUOTE(JSON_EXTRACT($FILTER, '$.tags'));

  SELECT
    count(*) OVER() as totalItems,
    link.id,
    link.order,
    link.title,
    link.image as img,
    link.description,
    link.language,
    link.favicon,
    link.createdAt,
    link.updatedAt,
    CONCAT(domain.domain, link.path) AS url,
    (
      SELECT
        JSON_ARRAYAGG(user_link.vote)
      FROM user_link
      WHERE user_link.link_id = link.id
    ) AS allVotes,
    (
      SELECT
        SUM(IF(user_link.vote IS NULL, 0, IF(user_link.vote = 0, -1, 1))) AS aaa
      FROM user_link
      WHERE user_link.link_id = link.id
    ) AS totalVote,
    MAX(bookmark.createdAt) AS lastBookmarked,
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
        IF(COUNT(user.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(user.id))
      FROM bookmark
      JOIN `user` ON bookmark.user_id = user.id
      WHERE bookmark.link_id = link.id
    ) AS users,
    (
      SELECT
        IF(COUNT(bookmark.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(bookmark.id)) AS bookmarksIds
      FROM bookmark
      WHERE bookmark.link_id = link.id
    ) AS bookmarksIds,
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
        bookmark.isPrivate != TRUE
        OR bookmark.user_id = $SESSION_ID
      )
    ) AS bookmarksRelated
  FROM link
  INNER JOIN bookmark ON bookmark.link_id = link.id
  INNER JOIN domain ON link.domain_id = domain.id
  LEFT JOIN bookmark_tag ON bookmark.id = bookmark_tag.bookmark_id
  LEFT JOIN tag ON tag.id = bookmark_tag.tag_id
  LEFT JOIN user_link ON user_link.link_id = link.id
  GROUP BY link.id
  HAVING
    CASE WHEN @filterTags IS NOT NULL AND JSON_CONTAINS(UPPER(JSON_EXTRACT(tags, '$[*].name')), UPPER(@filterTags)) THEN TRUE END
    OR
    CASE WHEN @filterTags IS NULL THEN TRUE END
    AND (
      bookmark.isPrivate IS NOT TRUE
      OR
      bookmark.`user_id` = $SESSION_ID
    )
  ORDER BY
    CASE WHEN $SORT = 'id'                THEN link.id      	          ELSE NULL END ASC,
    CASE WHEN $SORT = '-id'               THEN link.id      	          ELSE NULL END DESC,
    CASE WHEN $SORT = 'order'             THEN link.order	              ELSE NULL END ASC,
    CASE WHEN $SORT = '-order'            THEN link.order               ELSE NULL END DESC,
    CASE WHEN $SORT = 'most-bookmarked'   THEN COUNT(bookmark.id)       ELSE NULL END ASC,
    CASE WHEN $SORT = '-most-bookmarked'  THEN COUNT(bookmark.id)       ELSE NULL END DESC,
    CASE WHEN $SORT = 'updated'           THEN link.updatedAt           ELSE NULL END ASC,
    CASE WHEN $SORT = '-updated'          THEN link.updatedAt           ELSE NULL END DESC,
    CASE WHEN $SORT = 'created'           THEN link.createdAt           ELSE NULL END ASC,
    CASE WHEN $SORT = '-created'          THEN link.createdAt           ELSE NULL END DESC,
    CASE WHEN $SORT = 'last-bookmarked'   THEN MAX(bookmark.updatedAt)  ELSE NULL END ASC,
    CASE WHEN $SORT = '-last-bookmarked'  THEN MAX(bookmark.updatedAt)  ELSE NULL END DESC,
    CASE WHEN $SORT = 'vote'              THEN totalVote                ELSE NULL END ASC,
    CASE WHEN $SORT = '-vote'             THEN totalVote                ELSE NULL END DESC,
    CASE WHEN $SORT IS NULL               THEN link.id                  ELSE NULL END ASC
  LIMIT $OFFSET , $SIZE
 ;

END

/* DELIMITER ; */

/* CALL link_get_all('e4e2bb46-c210-4a47-9e84-f45c789fcec1', '-vote', NULL, NULL, '{"tags": ["foo"]}'); */