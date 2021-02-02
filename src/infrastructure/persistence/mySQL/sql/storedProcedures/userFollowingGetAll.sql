DROP PROCEDURE IF EXISTS user_following_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_following_get_all(
  IN $SESSION_ID VARCHAR(40),
  IN $USER_ID VARCHAR(40),
  IN $SORT VARCHAR(40),
  IN $SIZE INT,
  IN $OFFSET INT
)

BEGIN
  SET $SIZE = IFNULL($SIZE, -1);

  SELECT
    `user_user`.`order`,
    `user_user`.`createdAt`,
    `user_user`.`updatedAt`,
    `user2`.`id`,
    `user2`.`name`,
    `user2`.`level`,
    `user2`.`email`,
    `user2`.`status`,
    `user2`.`statement`,
    `user2`.`location`,
    (
      SELECT
        JSON_ARRAYAGG(
          bookmark.id
        )
      FROM bookmark
      WHERE user.id = bookmark.user_id
        AND
          (
            bookmark.isPrivate IS NOT TRUE
            OR
            bookmark.user_id = $SESSION_ID
          )
    ) AS bookmarks,
    JSON_MERGE(
      (
        SELECT
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', list.id,
              'userRole', "admin"
            )
          )
        FROM `list`
        WHERE
          list.userId = user2.id
          AND
          (
            list.isPrivate IS NOT TRUE
            OR
            list.userId = $SESSION_ID
          )
      ),
      (
        SELECT
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', `user_list`.list_id,
              'userRole', `user_list`.userRole
            )
          )
        FROM `user_list`
        INNER JOIN `list` ON user_list.list_id = `list`.id
        WHERE
          `user_list`.user_id = user2.id
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
        JSON_ARRAYAGG(
          user_user.user_id1
        )
      FROM user_user
      WHERE user_user.user_id = user2.id
    ) AS followers,
    (
      SELECT
        JSON_ARRAYAGG(
          user_user.user_id
        )
      FROM user_user
      WHERE user_user.user_id1 = user2.id
    ) AS following
  FROM `user`
  LEFT JOIN `user_user` ON `user`.id = `user_user`.`user_id`
  LEFT JOIN `user` `user2` ON `user2`.`id` = `user_user`.`user_id1`
  WHERE `user`.`id` = $USER_ID
  ORDER BY
    CASE WHEN $SORT = 'createdAt'                       THEN `user_user`.createdAt	          ELSE NULL END ASC,
    CASE WHEN $SORT = '-createdAt'                      THEN `user_user`.createdAt           ELSE NULL END DESC,
    CASE WHEN $SORT = 'updatedAt'                       THEN `user_user`.updatedAt           ELSE NULL END ASC,
    CASE WHEN $SORT = '-updatedAt'                      THEN `user_user`.updatedAt           ELSE NULL END DESC,
    CASE WHEN $SORT = 'order'                           THEN `user_user`.order               ELSE NULL END ASC,
    CASE WHEN $SORT = '-order'                           THEN `user_user`.order               ELSE NULL END DESC
  LIMIT $OFFSET , $SIZE
  ;

END

-- Example CALL
-- CALL user_following_get_all('e4e2bb46-c210-4a47-9e84-f45c789fcec1', 'e4e2bb46-c210-4a47-9e84-f45c789fcec1', 'order', NULL, NULL);
