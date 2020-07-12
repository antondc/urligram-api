DROP PROCEDURE IF EXISTS list_link_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_link_get_all(
  IN list_data JSON
)
BEGIN

  -- Retrieve values from JSON
SET @list_id = JSON_EXTRACT(list_data, '$.listId');

  -- Upsert into list

  SELECT
    link_user.id,
    link_user.order,
    CONCAT(domain.domain, link.path) AS url,
    link_user.isPublic,
    link_user.saved,
    link_user.vote,
    link_user.createdAt,
    link_user.updatedAt,
    link_user.user_id AS userId
  FROM link_user
  INNER JOIN link ON link_user.id = link.id
  INNER JOIN domain ON link.id = domain.id
  INNER JOIN link_user_list ON link_user.id = link_user_list.link_user_id
  INNER JOIN `list` ON `list`.`id` = `link_user_list`.`list_id`
  WHERE `list`.`id` = JSON_UNQUOTE(@list_id);

END