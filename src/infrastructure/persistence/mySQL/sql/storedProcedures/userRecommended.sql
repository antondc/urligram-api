DROP PROCEDURE IF EXISTS user_recommended;

-- DELIMITER $$

CREATE PROCEDURE user_recommended(
  IN $SESSION_ID VARCHAR(40),
  IN $SIZE INT,
  IN $OFFSET INT,
  IN $SORT VARCHAR(40)
)

BEGIN
  SET $SIZE = IFNULL($SIZE, -1);

  (
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
    INNER JOIN user_user ON user_id1 = bookmark.user_id
    WHERE
      user_user.user_id = $SESSION_ID
      AND
        bookmark.isPrivate IS NOT TRUE
    GROUP BY link.id
  )

  UNION

  (
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
    INNER JOIN `bookmark` ON bookmark.link_id = link.id
    INNER JOIN domain ON link.domain_id = domain.id
    INNER JOIN user_link ON link.id = user_link.link_id
    INNER JOIN user_user ON user_user.user_id1 = user_link.user_id
    WHERE
      user_user.user_id = $SESSION_ID
      AND
        bookmark.user_id != $SESSION_ID
      AND
        user_link.vote IS TRUE
  )
  ORDER BY
    CASE WHEN $SORT = 'createdAt'   THEN createdAt	ELSE NULL END ASC,
    CASE WHEN $SORT = '-createdAt'  THEN createdAt ELSE NULL END DESC,
    CASE WHEN $SORT = 'updatedAt'   THEN updatedAt ELSE NULL END ASC,
    CASE WHEN $SORT = '-updatedAt'  THEN updatedAt ELSE NULL END DESC,
    CASE WHEN $SORT IS NULL         THEN updatedAt        ELSE NULL END ASC

  LIMIT $OFFSET , $SIZE
;

END

-- DELIMITER ;
-- CALL user_recommended("b95274c9-3d26-4ce3-98b2-77dce5bd7aae", NULL, NULL, NULL)