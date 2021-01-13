DROP PROCEDURE IF EXISTS list_delete_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_delete_one(
  IN $LIST_ID INT
)

BEGIN

  DELETE FROM user_list
  WHERE list_id = $LIST_ID;

  DELETE FROM bookmark_list
  WHERE list_id = $LIST_ID;

  DELETE FROM `list`
  WHERE id = $LIST_ID;

  SELECT $LIST_ID AS listId;

END