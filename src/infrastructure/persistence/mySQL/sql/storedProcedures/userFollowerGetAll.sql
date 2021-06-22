DROP PROCEDURE IF EXISTS user_follower_get_all;

-- DELIMITER $$

CREATE PROCEDURE user_follower_get_all(
  IN $SESSION_ID VARCHAR(40),
  IN $USER_ID VARCHAR(40),
  IN $SORT VARCHAR(40),
  IN $SIZE INT,
  IN $OFFSET INT
)

BEGIN
  SET $SIZE = IFNULL($SIZE, -1);

  SELECT
    count(*) OVER() as totalItems,
    `follower`.`order`,
    `follower`.`createdAt`,
    `follower`.`updatedAt`,
    `follower`.`id`,
    `follower`.`name`,
    `follower`.`image`,
    `follower`.`level`,
    `follower`.`email`,
    `follower`.`status`,
    `follower`.`statement`,
    `follower`.`location`,
    `user_session_log`.`updatedAt` AS lastLogged,
    (
      SELECT
        IF(COUNT(bookmark.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(bookmark.id))
      FROM bookmark
      WHERE bookmark.user_id = follower.id
        AND
          (
            bookmark.isPrivate IS NOT TRUE
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
          list.userId = follower.id
          AND
          (
            list.isPrivate IS NOT TRUE
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
                'userRole', `user_list`.userRole
              )
            )
          )
        FROM `user_list`
        INNER JOIN `list` ON user_list.list_id = `list`.id
        WHERE
          `user_list`.user_id = follower.id
          AND
          (
            list.isPrivate IS NOT TRUE
            OR
            `user_list`.user_id = $SESSION_ID
          )
      )
    ) AS lists,
    (
      SELECT
        IF(COUNT(user_user.user_id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(user_user.user_id))
      FROM user_user
      WHERE user_user.user_id1 = follower.id
    ) AS followers,
    (
      SELECT
        IF(COUNT(user_user.user_id1) = 0, JSON_ARRAY(), JSON_ARRAYAGG(user_user.user_id1))
      FROM user_user
      WHERE user_user.user_id = follower.id
    ) AS following
  FROM `user`
  INNER JOIN `user_user` ON `user`.id = `user_user`.`user_id`
  INNER JOIN `user` `follower` ON `follower`.`id` = `user_user`.`user_id`
  LEFT JOIN `user_session_log` ON `user_session_log`.`user_id` = `follower`.`id`
  WHERE `user_user`.`user_id1` = $USER_ID
  GROUP BY `follower`.`id`
  ORDER BY
    CASE WHEN $SORT = 'createdAt'    THEN `user_user`.createdAt	      ELSE NULL END ASC,
    CASE WHEN $SORT = '-createdAt'   THEN `user_user`.createdAt       ELSE NULL END DESC,
    CASE WHEN $SORT = 'updatedAt'    THEN `user_user`.updatedAt       ELSE NULL END ASC,
    CASE WHEN $SORT = '-updatedAt'   THEN `user_user`.updatedAt       ELSE NULL END DESC,
    CASE WHEN $SORT = 'order'        THEN `user_user`.order           ELSE NULL END ASC,
    CASE WHEN $SORT = '-order'       THEN `user_user`.order           ELSE NULL END DESC,
    CASE WHEN $SORT = 'name'         THEN follower.name               ELSE NULL END ASC,
    CASE WHEN $SORT = '-name'        THEN follower.name               ELSE NULL END DESC,
    CASE WHEN $SORT = 'login'        THEN lastLogged                  ELSE NULL END ASC,
    CASE WHEN $SORT = '-login'       THEN lastLogged                  ELSE NULL END DESC,
    CASE WHEN $SORT = 'bookmarks'    THEN JSON_LENGTH(bookmarksIds)   ELSE NULL END ASC,
    CASE WHEN $SORT = '-bookmarks'   THEN JSON_LENGTH(bookmarksIds)   ELSE NULL END DESC
  LIMIT $OFFSET , $SIZE
  ;

END

-- DELIMITER ;
-- CALL user_follower_get_all('e4e2bb46-c210-4a47-9e84-f45c789fcec1', 'e4e2bb46-c210-4a47-9e84-f45c789fcec1', 'order', NULL, NULL);