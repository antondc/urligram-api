DROP PROCEDURE IF EXISTS list_get_all_public;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_get_all_public(
    IN data JSON
)

BEGIN
  DECLARE CASTED_SIZE INT;
  SET @user_id  = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.userId'));
  SET CASTED_SIZE  = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.size'));
  SET @sort  = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.sort'));
  SET @sortStrategy  = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.sortStrategy'));

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
          JSON_ARRAY(),
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', `user`.`id`,
              'name', `user`.`name`,
              'userRole', `user_list`.`userRole`
            )
          )
        )
      FROM user_list
      INNER JOIN `user` ON `user`.`id` = user_list.user_id
      WHERE user_list.list_id = list.id
    ) AS members
    FROM `list`
    INNER JOIN user_list   ON `list`.id = user_list.list_id
    WHERE
      `list`.`isPrivate` IS NOT TRUE
      OR `list`.`userId`       = @user_id
      OR `user_list`.`user_id` = @user_id
    GROUP BY list.id
      ORDER BY
      CASE WHEN @sort = "members" THEN count(members) ELSE '' END ASC,
      CASE WHEN @sort = "-members" THEN count(members) ELSE '' END DESC
    LIMIT CASTED_SIZE
  ;

END