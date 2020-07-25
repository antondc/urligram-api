DROP PROCEDURE IF EXISTS list_user_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_get_all(
  IN data JSON
)

BEGIN

  -- Retrieve values from JSON
  SET @list_id           = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.listId'));

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
    user_list.userRole
  FROM `user`
  INNER JOIN user_list   ON user_list.user_id = user.id
  WHERE
    user_list.list_id           = @list_id
  ;

END