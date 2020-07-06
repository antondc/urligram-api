DROP PROCEDURE IF EXISTS tag_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE tag_get_one(
  IN tag_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @id = JSON_EXTRACT(tag_data, '$.id');
  SET @tag = JSON_EXTRACT(tag_data, '$.tag');

  SELECT
    tag.id,
    tag.name
  FROM tag
  WHERE
    tag.id = JSON_UNQUOTE(@id)
    OR tag.name = JSON_UNQUOTE(@tag);

END