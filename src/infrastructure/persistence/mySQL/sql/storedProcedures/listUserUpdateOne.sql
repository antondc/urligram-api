DROP PROCEDURE IF EXISTS list_user_update_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_update_one(
  IN $LIST_ID INT,
  IN $USER_ID TEXT,
  IN $USER_ROLE TEXT,
  IN $USER_LIST_STATUS TEXT
)

BEGIN

  UPDATE user_list
  SET
    userListStatus        = $USER_LIST_STATUS,
    userRole              = $USER_ROLE
  WHERE user_list.user_id = $USER_ID
    AND user_list.list_id = $LIST_ID
  ;

  SELECT $LIST_ID AS listId, $USER_ID AS userId;

END