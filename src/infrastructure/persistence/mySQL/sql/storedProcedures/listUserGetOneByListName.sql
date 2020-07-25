DROP PROCEDURE IF EXISTS list_user_get_one_by_list_name;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_get_one_by_list_name(
  IN data JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @list_name         = JSON_UNQUOTE(JSON_EXTRACT(data, '$.listName'));
  SET @user_id           = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));

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
  INNER JOIN user_list ON user_list.user_id = user.id
  INNER JOIN `list` ON user_list.list_id = list.id
  WHERE
    list.name               = @list_name
    AND user_list.user_id   = @user_id
  ;


END