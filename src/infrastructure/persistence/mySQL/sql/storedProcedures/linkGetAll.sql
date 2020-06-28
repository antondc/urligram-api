DROP PROCEDURE IF EXISTS link_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_get_all()

BEGIN

  SELECT *
  FROM `link_user`;

END