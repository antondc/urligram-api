DROP PROCEDURE IF EXISTS user_get_by_ids;

-- DELIMITER $$

CREATE PROCEDURE user_get_by_ids(
  IN $SESSION_ID VARCHAR(40),
  IN $USER_IDS JSON,
  IN $SORT VARCHAR(40),
  IN $SIZE INT,
  IN $OFFSET INT
)

BEGIN

  SET $SIZE = IFNULL($SIZE, -1);

  SELECT
    `user`.`id`,
    `user`.`order`,
    `user`.`name`,
    `user`.`level`,
    `user`.`accountType`,
    `user`.`image`,
    `user`.`status`,
    `user`.`statement`,
    `user`.`location`,
    `user`.`createdAt`,
    `user`.`updatedAt`,
    (
      SELECT
        IF(COUNT(bookmark.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(bookmark.id))
      FROM bookmark
      WHERE user.id = bookmark.user_id
        AND
          (
            bookmark.isPublic IS TRUE
            OR
            bookmark.user_id = $SESSION_ID
          )
    ) AS bookmarksIds,
    JSON_MERGE(
      (
        SELECT
          IF(
            COUNT(list.id) = 0,
            JSON_ARRAY(),
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'id', list.id,
                'userRole', "admin"
              )
            )
          )
        FROM `list`
        WHERE
          list.userId = user.id
          AND
          (
            list.isPublic IS TRUE
            OR
            list.userId = $SESSION_ID
          )
      ),
      (
        SELECT
          IF(
            COUNT(`user_list`.list_id) = 0,
            JSON_ARRAY(),
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'id', `user_list`.list_id,
                'userRole', `user_list`.userRole,
                'userListStatus', `user_list`.`userListStatus`
              )
            )
          )
        FROM `user_list`
        INNER JOIN `list` ON user_list.list_id = `list`.id
        WHERE
          `user_list`.user_id = user.id
          AND
          (
            list.isPublic IS TRUE
            OR
            `user_list`.user_id = $SESSION_ID
          )
      )
    ) AS lists,
    (
      SELECT
        IF(COUNT(user_user.user_id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(user_user.user_id))
      FROM user_user
      WHERE user_user.user_id1 = user.id
    ) AS followers,
    (
      SELECT
        IF(COUNT(user_user.user_id1) = 0, JSON_ARRAY(), JSON_ARRAYAGG(user_user.user_id1))
      FROM user_user
      WHERE user_user.user_id = user.id
    ) AS following,
    (
      SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', tag.id,
            'name', tag.name,
            'count', tag.count
          )
        )
      FROM
        (
          SELECT DISTINCT
          subTag.id,
          subTag.name,
          COUNT(bookmark.id) as count
          FROM tag as subTag
          JOIN bookmark_tag ON bookmark_tag.tag_id = subTag.id
          JOIN bookmark ON bookmark.id = bookmark_tag.bookmark_id
          WHERE bookmark.user_id = user.id
          AND
            (
              bookmark.isPublic IS TRUE
              OR
              bookmark.user_id = $SESSION_ID
            )
          GROUP BY subTag.id
          ORDER BY count DESC
          ) as tag
    ) AS tags
    FROM `user`
    WHERE JSON_CONTAINS($USER_IDS, JSON_QUOTE(user.id))
    GROUP BY `user`.`id`
    ORDER BY
      CASE WHEN $SORT = 'order'          THEN `user`.order      	        ELSE NULL END ASC,
      CASE WHEN $SORT = '-order'         THEN `user`.order      	        ELSE NULL END DESC,
      CASE WHEN $SORT = 'createdAt'   THEN `user`.createdAt	        ELSE NULL END ASC,
      CASE WHEN $SORT = '-createdAt'  THEN `user`.createdAt         ELSE NULL END DESC,
      CASE WHEN $SORT = 'updatedAt'   THEN `user`.updatedAt         ELSE NULL END ASC,
      CASE WHEN $SORT = '-updatedAt'  THEN `user`.updatedAt         ELSE NULL END DESC,
      CASE WHEN $SORT = 'followers'   THEN JSON_LENGTH(followers)         ELSE NULL END ASC,
      CASE WHEN $SORT = '-followers'  THEN JSON_LENGTH(followers)         ELSE NULL END DESC,
      CASE WHEN $SORT = 'following'   THEN JSON_LENGTH(following)         ELSE NULL END ASC,
      CASE WHEN $SORT = '-following'  THEN JSON_LENGTH(following)         ELSE NULL END DESC,
      CASE WHEN $SORT = 'bookmarks'   THEN JSON_LENGTH(bookmarksIds)         ELSE NULL END ASC,
      CASE WHEN $SORT = '-bookmarks'  THEN JSON_LENGTH(bookmarksIds)         ELSE NULL END DESC,
      CASE WHEN $SORT = 'lists'       THEN JSON_LENGTH(lists)             ELSE NULL END ASC,
      CASE WHEN $SORT = '-lists'      THEN JSON_LENGTH(lists)             ELSE NULL END DESC,
      CASE WHEN $SORT != 'order' AND $SORT != '-order'      THEN `user`.order        ELSE NULL END ASC
    LIMIT $OFFSET, $SIZE
  ;


END

-- DELIMITER ;
/* CALL user_get_by_ids("e4e2bb46-c210-4a47-9e84-f45c789fcec1", '["e4e2bb46-c210-4a47-9e84-f45c789fcec1", "92fac4aa-5b6a-11eb-ae93-0242ac130002"]', NULL, NULL, NULL); */
