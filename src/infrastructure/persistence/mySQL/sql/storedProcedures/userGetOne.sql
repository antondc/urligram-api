DROP PROCEDURE IF EXISTS user_get_one;

/* DELIMITER $$ */

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_get_one(
  IN $SESSION_ID VARCHAR(40),
  IN $USER_ID VARCHAR(40),
  IN $EMAIL VARCHAR(40),
  IN $NAME_ VARCHAR(40)
)
BEGIN

-- Select user
SELECT
  `user`.`id`,
  `user`.`name`,
  `user`.`level`,
  `user`.`email`,
  `user`.`status`,
  `user`.`image`,
  `user`.`statement`,
  `user`.`location`,
  `user`.`order`,
  `user`.`createdAt`,
  `user`.`updatedAt`,
  (
    SELECT
      IF(COUNT(bookmark.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(bookmark.id))
    FROM bookmark
    WHERE user.id = bookmark.user_id
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
      IF(COUNT(user_user.user_id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(user_user.user_id))
    FROM user_user
    WHERE user_user.user_id1 = user.id
  ) AS followers,
  (
    SELECT
      IF(COUNT(user_user.user_id1) = 0, JSON_ARRAY(), JSON_ARRAYAGG(user_user.user_id1))
    FROM user_user
    WHERE user_user.user_id = user.id
  ) AS following
  FROM `user`
  WHERE
    `user`.`id` = $USER_ID
    OR `name`   = $NAME_
    OR `email`  = $EMAIL
  GROUP BY `user`.`id`
;

END

/* DELIMITER ; */

/* CALL user_get_one("9b360676-5b69-11eb-ae93-0242ac130002", "9b360676-5b69-11eb-ae93-0242ac130002", NULL, NULL); */