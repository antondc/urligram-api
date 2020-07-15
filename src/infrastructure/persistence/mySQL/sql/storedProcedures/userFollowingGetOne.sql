DROP PROCEDURE IF EXISTS user_following_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_following_get_one(
  IN data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @user_id         = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));
  SET @followed_id     = JSON_UNQUOTE(JSON_EXTRACT(data, '$.followedId'));

  SELECT
    `user`.`id` as userId,
    `user2`.`id` as followingId
  FROM `user`
  LEFT JOIN `user_user` ON `user`.id = `user_user`.`user_id`
  LEFT JOIN `user` `user2` ON `user2`.`id` = `user_user`.`user_id1`
  WHERE `user`.`id` = @user_id and `user2`.`id` = @followed_id;

END
