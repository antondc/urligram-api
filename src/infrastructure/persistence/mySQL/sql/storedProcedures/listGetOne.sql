DROP PROCEDURE IF EXISTS list_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_get_one(
  IN list_data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @list_id   = JSON_UNQUOTE(JSON_EXTRACT(list_data, '$.id'));
  SET @user_id   = JSON_UNQUOTE(JSON_EXTRACT(list_data, '$.userId'));
  SET @name      = JSON_UNQUOTE(JSON_EXTRACT(list_data, '$.name'));
  SET @list_type = JSON_UNQUOTE(JSON_EXTRACT(list_data, '$.listType'));

  -- In case we don't have a list_id, find the list for given list name, given user as admin of the list, and list type
  IF @list_id IS NULL THEN
    SET @list_id = (
        SELECT
          `list`.`id`
        FROM `list`
        INNER JOIN user_list ON list.id = user_list.list_id
        WHERE
          list.name = @name
          AND user_list.userRole = "admin"
          AND user_list.user_id = @user_id
    );
  END IF;

  -- Select list with links, and place into it the links
  SELECT
      list.id,
      list.name,
      list.description,
      listType
    FROM LIST
    INNER JOIN user_list ON list.id = user_list.list_id
    INNER JOIN `user` ON user.id = user_list.user_id
    WHERE list.id = @list_id;

END