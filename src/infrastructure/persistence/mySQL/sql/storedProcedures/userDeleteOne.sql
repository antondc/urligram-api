DROP PROCEDURE IF EXISTS user_delete_one;

-- Disables user and deletes all his information
CREATE PROCEDURE user_delete_one(
  IN $USER_ID VARCHAR(40)
)

BEGIN

  -- Disable user and anonimize it
  UPDATE user
  SET
    name       =  CONCAT("disabled-", $USER_ID),
    email      =  CONCAT("disabled-", $USER_ID),
   `status`    = 'disabled',
   `updatedAt` = UNIX_TIMESTAMP()
  WHERE id     = $USER_ID
  ;

  -- Delete notifications for this user
  DELETE FROM list_bookmark_user
  WHERE user_id   = $USER_ID
  ;

  -- Dont remove the lists, but set them as private
  UPDATE bookmark
  SET
   `isPrivate`  = TRUE,
   `updatedAt`  = UNIX_TIMESTAMP()
  WHERE user_id = $USER_ID
  ;

  -- Delete users participating in user's list
  DELETE user_list
  FROM user_list
  INNER JOIN list ON list.id = user_list.list_id
  WHERE list.userId          = $USER_ID
  ;

  -- Remove user from lists he is in
  DELETE FROM user_list
  WHERE user_id   = $USER_ID
  ;

  -- Dont remove the bookmarks, but set them as private
  UPDATE list
  SET
   `isPrivate`  = TRUE,
   `updatedAt`  = UNIX_TIMESTAMP()
  WHERE userId = $USER_ID
  ;

  -- Delete followers
  DELETE FROM user_user
  WHERE user_id   = $USER_ID
  ;

  -- Delete following
  DELETE FROM user_user
  WHERE user_id1   = $USER_ID
  ;

  -- Return user
  SELECT $USER_ID AS userId
  ;

END