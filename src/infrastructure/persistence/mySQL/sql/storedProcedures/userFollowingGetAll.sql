DROP PROCEDURE IF EXISTS user_following_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_following_get_all(
  IN user_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @user_id    = JSON_UNQUOTE(JSON_EXTRACT(user_data, '$.userId'));

  SELECT
    `user2`.`id`,
    `user2`.`name`,
    `user2`.`level`,
    `user2`.`email`,
    `user2`.`status`,
    `user2`.`statement`,
    `user2`.`location`,
    `user2`.`order`,
    `user2`.`createdAt`,
    `user2`.`updatedAt`
  FROM `user`
  LEFT JOIN `user_user` ON `user`.id = `user_user`.`user_id`
  LEFT JOIN `user` `user2` ON `user2`.`id` = `user_user`.`user_id1`
  WHERE `user`.`id` = @user_id;

END

  /* In case we want to return current user + following, use this one
  -- Select user
  SELECT
    `user2`.`id`,
    `user2`.`name`,
    `user2`.`level`,
    `user2`.`email`,
    `user2`.`status`,
    `user2`.`statement`,
    `user2`.`location`,
    `user2`.`order`,
    `user2`.`createdAt`,
    `user2`.`updatedAt`,
    IF(
      COUNT(`user2`.`id`) = 0,
      JSON_ARRAY(),
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', `user2`.`id`,
          'name', `user2`.`name`,
          'level', `user2`.`level`,
          'email', `user2`.`email`,
          'status', `user2`.`status`,
          'statement', `user2`.`statement`,
          'location', `user2`.`location`,
          'order', `user2`.`order`,
          'createdAt', `user2`.`createdAt`,
          'updatedAt', `user2`.`updatedAt`
        )
      )
    ) following
  FROM `user`
  LEFT JOIN `user_user` ON `user`.id = `user_user`.`user_id`
  LEFT JOIN `user` `user2` ON `user2`.`id` = `user_user`.`user_id1`
  WHERE `user`.`id` = @user_id; */