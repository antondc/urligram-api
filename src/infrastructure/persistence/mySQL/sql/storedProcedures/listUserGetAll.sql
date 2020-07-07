DROP PROCEDURE IF EXISTS list_user_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_get_all(
  IN list_data JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @list_id = JSON_EXTRACT(list_data, '$.listId');

  SELECT
    user.id,
    user.order,
    user.name,
    user_list.userRole as userListRole
  FROM user
  INNER JOIN user_list ON user.id = user_list.user_id
  INNER JOIN list ON user_list.list_id = list.id
  WHERE `list`.`id` = JSON_UNQUOTE(@list_id);

END