DROP PROCEDURE IF EXISTS users_following_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE users_following_get_all(
  IN user_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @id = JSON_EXTRACT(user_data, '$.id');

  -- Select user
  SELECT
    u.`id`,
    u.`name`,
    u.`level`,
    u.`email`,
    u.`status`,
    u.`statement`,
    u.`location`,
    u.`order`,
    u.`createdAt`,
    u.`updatedAt`,
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
    ) following
  FROM user u
  LEFT JOIN `user_user` uu ON u.id = uu.user_id
  LEFT JOIN user user2 ON user2.id = uu.user_id1
  WHERE u.id = JSON_UNQUOTE(@id);

END