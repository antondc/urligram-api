DROP PROCEDURE IF EXISTS list_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_get_all()

BEGIN

  SELECT
      list.id,
      list.name,
      list.description
    FROM `list`;

END