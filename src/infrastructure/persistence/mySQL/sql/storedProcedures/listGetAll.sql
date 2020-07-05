DROP PROCEDURE IF EXISTS list_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_get_all()

BEGIN

  SELECT
      list.id,
      list.name,
      list.description,
      list_type.type AS listType
    FROM LIST
    INNER JOIN list_type ON list.list_type_id = list_type.id;

END