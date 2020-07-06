DROP PROCEDURE IF EXISTS list_tag_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_tag_get_all(
  IN list_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @list_id = JSON_EXTRACT(list_data, '$.listId');

  SELECT
    tag.id,
    tag.name
  FROM tag
  INNER JOIN link_user_tag ON link_user_tag.tag_id = tag.id
  INNER JOIN link_user ON link_user_tag.link_user_id = link_user.id
  INNER JOIN link_user_list ON link_user_list.link_user_id = link_user.id
  INNER JOIN LIST ON link_user_list.list_id = list.id
  WHERE list.id = JSON_UNQUOTE(@list_id)
  GROUP BY tag.id;

END