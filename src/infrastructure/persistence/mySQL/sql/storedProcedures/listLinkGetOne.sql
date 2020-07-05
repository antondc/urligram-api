DROP PROCEDURE IF EXISTS list_link_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_link_get_one(
  IN list_link JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @list_id      = JSON_UNQUOTE(JSON_EXTRACT(list_link, '$.listId'));
  SET @link_id      = JSON_UNQUOTE(JSON_EXTRACT(list_link, '$.linkId'));

  -- Upsert into list
  SELECT
    `list_id`,
    `link_user_id`
  FROM link_user_list
  WHERE `link_user_list`.`list_id` = @list_id AND `link_user_list`.`link_user_id` = @link_id;

END