DROP PROCEDURE IF EXISTS user_follower_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_follower_get_all(
  IN $USER_ID VARCHAR(40)
)

BEGIN

  -- Select user
  SELECT
    `user`.`id`,
    `user`.`name`,
    `user`.`level`,
    `user`.`email`,
    `user`.`status`,
    `user`.`statement`,
    `user`.`location`,
    `user`.`order`,
    `user`.`createdAt`,
    `user`.`updatedAt`,
    IF(
      COUNT(user2.id) = 0,
      JSON_ARRAY(),
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', user2.id,
          'name', user2.name,
          'level', user2.level,
          'email', user2.email,
          'status', user2.status,
          'statement', user2.statement,
          'location', user2.location,
          'order', user2.order,
          'createdAt', user2.createdAt,
          'updatedAt', user2.updatedAt
        )
      )
    ) followers
  FROM user
  LEFT JOIN `user_user` ON `user`.`id` = user_user.user_id1
  LEFT JOIN `user` user2 ON user2.id = user_user.user_id
  WHERE `user`.`id` = $USER_ID;

END