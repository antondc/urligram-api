DROP PROCEDURE IF EXISTS list_create;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_create(
  IN $LIST_USER_ID TEXT,
  IN $LIST_NAME TEXT,
  IN $LIST_DESCRIPTION TEXT,
  IN $LIST_IS_PRIVATE BOOLEAN
)
BEGIN

  -- Upsert into list
  INSERT INTO `list` (
    `name`,
    `description`,
    `isPrivate`,
    `userId`
  ) VALUES (
    $LIST_NAME,
    $LIST_DESCRIPTION,
    $LIST_IS_PRIVATE,
    $LIST_USER_ID
  ) ON DUPLICATE KEY UPDATE
    name        = $LIST_NAME,
    description = $LIST_DESCRIPTION,
    isPrivate   = $LIST_IS_PRIVATE,
    userId      = $LIST_USER_ID,
    updatedAt   = CURRENT_TIMESTAMP;

  -- Retrieve the upserted id
  SET @list_id = LAST_INSERT_ID();

  SELECT @list_id as listId;

END