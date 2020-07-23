DROP PROCEDURE IF EXISTS user_list_get_all_public;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_list_get_all_public(
    IN data JSON
)

BEGIN

  SET @user_id = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.userId'));

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
    list.isPrivate IS NOT TRUE
    AND list.userId = @user_id
  ;

END