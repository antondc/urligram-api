-- Example CALL
-- CALL user_following_get_all('e4e2bb46-c210-4a47-9e84-f45c789fcec1', 'order', NULL, NULL);

DROP PROCEDURE IF EXISTS user_following_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_following_get_all(
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
    `user2`.`location`
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
