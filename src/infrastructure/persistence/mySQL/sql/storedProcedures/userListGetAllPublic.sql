DROP PROCEDURE IF EXISTS user_list_get_all_public;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_list_get_all_public(
    IN $USER_ID VARCHAR(40),
    IN $SESSION_ID VARCHAR(40)
)

BEGIN

  SELECT
    list.id,
    list.order,
    list.name,
    list.description,
    list.name,
    user_list.userRole,
    user.id AS userId,
    list.createdAt,
    list.isPrivate,
    user_list.userRole
  FROM `list`
  INNER JOIN user_list ON user_list.list_id = list.id
  INNER JOIN `user` ON user_list.user_id = user.id
  WHERE
      (
        list.userId = $USER_ID
        OR
        user_list.user_id = $USER_ID
      )
      AND
      (
        list.isPrivate IS NOT TRUE
        OR
          (
            list.userId = $SESSION_ID
            OR
            user_list.user_id = $SESSION_ID
          )
      )
  GROUP BY list.id
  ;

END