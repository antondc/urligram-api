DROP PROCEDURE IF EXISTS user_following_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_following_get_one(
  IN $USER_ID VARCHAR(40),
  IN $FOLLOWED_ID VARCHAR(40)
)

BEGIN

  SELECT
    `user`.`id` as userId,
    `user2`.`id` as followingId
  FROM `user`
  LEFT JOIN `user_user` ON `user`.id = `user_user`.`user_id`
  LEFT JOIN `user` `user2` ON `user2`.`id` = `user_user`.`user_id1`
  WHERE `user`.`id` = $USER_ID and `user2`.`id` = $FOLLOWED_ID;

END
