DROP PROCEDURE IF EXISTS user_following_get_all;

-- DELIMITER $$

CREATE PROCEDURE user_following_get_all(
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

  SELECT
    count(*) OVER() as totalItems,
    `following`.`id`,
    `following`.`order`,
    `following`.`name`,
    `following`.`level`,
    `following`.`accountType`,
    `following`.`image`,
    `following`.`status`,
    `following`.`statement`,
    `following`.`location`,
    `following`.`createdAt`,
    `following`.`updatedAt`,
    `user_session_log`.`updatedAt` AS lastLogged,
    (
      SELECT
        IF(COUNT(bookmark.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(bookmark.id))
      FROM bookmark
      WHERE bookmark.user_id = following.id
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
          list.userId = following.id
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
          `user_list`.user_id = following.id
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
      WHERE user_user.user_id1 = following.id
    ) AS followers,
    (
      SELECT
        IF(COUNT(user_user.user_id1) = 0, JSON_ARRAY(), JSON_ARRAYAGG(user_user.user_id1))
      FROM user_user
      WHERE user_user.user_id = following.id
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
          WHERE bookmark.user_id = `following`.id
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
  INNER JOIN `user_user` ON `user`.id = `user_user`.`user_id`
  INNER JOIN `user` `following` ON `following`.`id` = `user_user`.`user_id1`
  LEFT JOIN `user_session_log` ON `user_session_log`.`user_id` = `following`.`id`
  WHERE `user`.`id` = $USER_ID
  GROUP BY `following`.`id`
  HAVING
    (
      CASE WHEN @filterTags IS NOT NULL AND JSON_CONTAINS(UPPER(JSON_EXTRACT(tags, '$[*].name')), UPPER(@filterTags)) THEN TRUE END
      OR
      CASE WHEN @filterTags IS NULL THEN TRUE END
    )
  ORDER BY
    CASE WHEN $SORT = 'createdAt'    THEN `user_user`.createdAt	      ELSE NULL END ASC,
    CASE WHEN $SORT = '-createdAt'   THEN `user_user`.createdAt       ELSE NULL END DESC,
    CASE WHEN $SORT = 'updatedAt'    THEN `user_user`.updatedAt       ELSE NULL END ASC,
    CASE WHEN $SORT = '-updatedAt'   THEN `user_user`.updatedAt       ELSE NULL END DESC,
    CASE WHEN $SORT = 'order'        THEN `user_user`.order           ELSE NULL END ASC,
    CASE WHEN $SORT = '-order'       THEN `user_user`.order           ELSE NULL END DESC,
    CASE WHEN $SORT = 'bookmarks'    THEN JSON_LENGTH(bookmarksIds)   ELSE NULL END ASC,
    CASE WHEN $SORT = '-bookmarks'   THEN JSON_LENGTH(bookmarksIds)   ELSE NULL END DESC
  LIMIT $OFFSET , $SIZE
  ;

END

-- DELIMITER ;
-- CALL user_following_get_all('e4e2bb46-c210-4a47-9e84-f45c789fcec1', 'e4e2bb46-c210-4a47-9e84-f45c789fcec1', 'order', NULL, NULL, '{"tags": ["vestido"]}');
