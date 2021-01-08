DROP PROCEDURE IF EXISTS list_user_get_one_by_list_id;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_get_one_by_list_id(
  IN data JSON
)

BEGIN

  -- Retrieve values from JSON
  SET @list_id           = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.listId'));
  SET @user_id           = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.userId'));

  -- Upsert into list
 SELECT
    user.id,
    user.name,
    user.level,
    user.email,
    user.status,
    user.statement,
    user.location,
    user.order,
    user.createdAt,
    user.updatedAt,
    user_list.userRole,
    user_list.userListStatus
  FROM `user`
  INNER JOIN user_list   ON user_list.user_id = user.id
  WHERE
    user_list.list_id           = @list_id
    AND user_list.user_id       = @user_id
  ;

END