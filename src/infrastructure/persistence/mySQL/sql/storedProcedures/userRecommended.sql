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

  SELECT
     count(*) OVER() as totalItems,
    `id`,
    `order`,
    `img`,
    `favicon`,
    `title`,
    `url`,
    `linkId`,
    `userId`,
    `isPublic`,
    `saved`,
    `createdAt`,
    `updatedAt`,
    `tags`,
    `lists`,
    `users`,
    `link`,
    `bookmarksRelated`
    FROM
    (
      (
      SELECT
        bookmark.id,
        bookmark.order,
        link.image as img,
        `link`.`favicon`,
        bookmark.title,
        CONCAT(domain.domain, link.path) AS url,
        link.id AS linkId,
        bookmark.user_id AS userId,
        bookmark.isPublic,
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
        ) AS tags,
        -- Returns only public lists or those where user is in
        -- Unsorted
        (
          SELECT
            CAST(
              CONCAT('[',
                GROUP_CONCAT(
                  DISTINCT JSON_OBJECT(
                    'id', list.id,
                    'name', list.name
                  ) SEPARATOR ','
              ), ']'
            ) AS JSON
          ) AS lists
          FROM bookmark_list
          JOIN `list` ON bookmark_list.list_id = list.id
          JOIN user_list ON user_list.list_id = list.id
          WHERE bookmark.id = bookmark_list.bookmark_id AND list.isPublic IS TRUE
        ) AS lists,
        (
          SELECT
            IF(COUNT(bookmark.user_id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(bookmark.user_id))
          FROM bookmark
          WHERE bookmark.link_id = link.id
        ) AS users,
        (
          SELECT
            JSON_OBJECT(
              'id', link.id,
              'title', link.title
            )
        ) AS link,
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
            bookmark.isPublic IS TRUE
            OR bookmark.user_id = $SESSION_ID
          )
        ) AS bookmarksRelated
      FROM bookmark
      INNER JOIN `link` ON bookmark.link_id = link.id
      LEFT JOIN bookmark_tag ON bookmark.id = bookmark_tag.bookmark_id
      LEFT JOIN tag ON tag.id = bookmark_tag.tag_id
      INNER JOIN domain ON link.domain_id = domain.id
      INNER JOIN user_user ON user_id1 = bookmark.user_id
      WHERE
        user_user.user_id = $SESSION_ID
        AND
          bookmark.isPublic IS TRUE
      GROUP BY link.id
    )

    UNION ALL

    (
      SELECT
        bookmark.id,
        bookmark.order,
        link.image as img,
        `link`.`favicon`,
        bookmark.title,
        CONCAT(domain.domain, link.path) AS url,
        link.id AS linkId,
        bookmark.user_id AS userId,
        bookmark.isPublic,
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
        ) AS tags,
        -- Returns only public lists or those where user is in
        -- Unsorted
        (
          SELECT
            CAST(
              CONCAT('[',
                GROUP_CONCAT(
                  DISTINCT JSON_OBJECT(
                    'id', list.id,
                    'name', list.name
                  ) SEPARATOR ','
              ), ']'
            ) AS JSON
          ) AS lists
          FROM bookmark_list
          JOIN `list` ON bookmark_list.list_id = list.id
          JOIN user_list ON user_list.list_id = list.id
          WHERE bookmark.id = bookmark_list.bookmark_id AND list.isPublic IS TRUE
        ) AS lists,
        (
          SELECT
            IF(COUNT(bookmark.user_id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(bookmark.user_id))
          FROM bookmark
          WHERE bookmark.link_id = link.id
        ) AS users,
        (
          SELECT
            JSON_OBJECT(
              'id', link.id,
              'title', link.title
            )
        ) AS link,
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
            bookmark.isPublic IS TRUE
            OR bookmark.user_id = $SESSION_ID
          )
        ) AS bookmarksRelated
      FROM bookmark
      INNER JOIN `link` ON bookmark.link_id = link.id
      LEFT JOIN bookmark_tag ON bookmark.id = bookmark_tag.bookmark_id
      LEFT JOIN tag ON tag.id = bookmark_tag.tag_id
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
  ) bookmarksRecommended
  GROUP BY linkId
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
