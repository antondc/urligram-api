DROP PROCEDURE IF EXISTS list_get_all_public;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_get_all_public(
  IN $USER_ID TEXT,
  IN $SORT TEXT,
  IN $SIZE INT
)

BEGIN
  SET $SIZE = IFNULL($SIZE, -1);

  -- Returns a collection of public lists or those where user is member, along with the number of users in each list
SELECT
    `list`.`id`,
    `list`.`name`,
    `list`.`description`,
    `list`.`isPrivate`,
    `list`.`userId`,
    `list`.`createdAt`,
    `list`.`updatedAt`,
    (
      SELECT
        IF(
          COUNT(`user`.id) = 0,
          NULL,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', `user`.`id`,
              'userRole', `user_list`.`userRole`
            )
          )
        )
      FROM user_list
      INNER JOIN `user` ON `user`.`id` = user_list.user_id
      WHERE user_list.list_id = list.id
    ) AS members,
    (
      SELECT
      JSON_ARRAYAGG(bookmark_list.bookmark_id)
      FROM bookmark_list
      WHERE bookmark_list.list_id = list.id
    ) AS bookmarksIds
    FROM `list`
    LEFT JOIN user_list   ON `list`.id = user_list.list_id
    WHERE
      `list`.`isPrivate` IS NOT TRUE
      OR `list`.`userId`       = $SESSION_ID
      OR `user_list`.`user_id` = $SESSION_ID
    GROUP BY list.id
      ORDER BY
      CASE WHEN $SORT = "members"     THEN count(members) 	ELSE NULL END ASC,
      CASE WHEN $SORT = "-members"    THEN count(members) 	ELSE NULL END DESC,
      CASE WHEN $SORT = 'id'          THEN `list`.id      	ELSE NULL END ASC,
      CASE WHEN $SORT = '-id'         THEN `list`.id      	ELSE NULL END DESC,
      CASE WHEN $SORT = 'createdAt'   THEN `list`.createdAt	ELSE NULL END ASC,
      CASE WHEN $SORT = '-createdAt'  THEN `list`.createdAt ELSE NULL END DESC,
      CASE WHEN $SORT = 'updatedAt'   THEN `list`.updatedAt ELSE NULL END ASC,
      CASE WHEN $SORT = '-updatedAt'  THEN `list`.updatedAt ELSE NULL END DESC
    LIMIT $SIZE
  ;

END