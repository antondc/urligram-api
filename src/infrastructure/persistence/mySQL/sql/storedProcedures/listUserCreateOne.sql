DROP PROCEDURE IF EXISTS list_user_create_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_create_one(
  IN $LIST_ID INT,
  IN $USER_ID TEXT,
  IN $USER_ROLE TEXT,
  IN $USER_LIST_STATUS TEXT
)

BEGIN

  -- Upsert into list
  INSERT INTO user_list (
    user_id,
    list_id,
    userListStatus,
    userRole
  ) VALUES (
    $USER_ID,
    $LIST_ID,
    $USER_LIST_STATUS,
    $USER_ROLE
  );

  UPDATE
    list
  SET
    updatedAt  = UNIX_TIMESTAMP()
  WHERE
    list.id    = $LIST_ID
  ;

  SELECT $LIST_ID AS listId, $USER_ID AS userId;

END