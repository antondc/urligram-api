DROP PROCEDURE IF EXISTS link_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_get_one(
  IN link_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @id = JSON_EXTRACT(link_data, '$.id');

  SELECT *
  FROM `link_user`
  WHERE `id` = JSON_UNQUOTE(@id);

END