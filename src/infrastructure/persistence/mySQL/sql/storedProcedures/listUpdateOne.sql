DROP PROCEDURE IF EXISTS list_update_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_update_one(
  IN $LIST_ID INT,
  IN $USER_ID TEXT,
  IN $NAME TEXT,
  IN $DESCRIPTION TEXT,
  IN $IS_PRIVATE BOOLEAN
)

BEGIN

  UPDATE `list`
  SET
    `name`          = $NAME,
    `description`   = $DESCRIPTION,
    `isPrivate`     = $IS_PRIVATE,
    `updatedAt`     = UNIX_TIMESTAMP()
  WHERE `list`.`id` = $LIST_ID
  ;

  SELECT $LIST_ID as listId;
END