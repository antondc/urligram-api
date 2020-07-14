DROP PROCEDURE IF EXISTS list_link_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_link_get_one(
  IN list_link JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @list_id      = JSON_UNQUOTE(JSON_EXTRACT(list_link, '$.listId'));
  SET @link_id      = JSON_UNQUOTE(JSON_EXTRACT(list_link, '$.linkId'));
  SET @user_id      = JSON_UNQUOTE(JSON_EXTRACT(list_link, '$.userId'));

  -- Upsert into list
  SELECT
    list.id,
    link_user.order,
    CONCAT(domain.domain, link.path) AS url,
    link_user.isPrivate,
    link_user.saved,
    link_user.vote,
    link_user.createdAt,
    link_user.updatedAt
  FROM link_user_list
  INNER JOIN link_user ON link_user_list.link_user_id = link_user.id
  INNER JOIN link ON link_user.link_id = link.id
  INNER JOIN domain ON link.domain_id = domain.id
  WHERE `link_user_list`.`list_id` = @list_id AND `link_user_list`.`link_user_id` = @link_id;

END