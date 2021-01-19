DROP PROCEDURE IF EXISTS user_get_all;

CREATE PROCEDURE user_get_all(
  IN $SESSION_ID VARCHAR(40)
)
BEGIN

-- Select user
SELECT
  `user`.`id`,
  `user`.`name`,
  `user`.`level`,
  `user`.`email`,
  `user`.`image`,
  `user`.`status`,
  `user`.`statement`,
  `user`.`location`,
  `user`.`order`,
  `user`.`createdAt`,
  `user`.`updatedAt`,
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
        list.userId = user.id
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
        `user_list`.user_id = user.id
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
    WHERE user_user.user_id = user.id
  ) AS followers,
  (
    SELECT
      JSON_ARRAYAGG(
        user_user.user_id
      )
    FROM user_user
    WHERE user_user.user_id1 = user.id
  ) AS following
  FROM `user`
  GROUP BY `user`.`id`
;

END