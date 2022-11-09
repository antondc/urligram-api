DROP PROCEDURE IF EXISTS list_create;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_create(
  IN $LIST_USER_ID TEXT,
  IN $LIST_NAME TEXT,
  IN $LIST_DESCRIPTION TEXT,
  IN $LIST_IS_PUBLIC BOOLEAN
)
BEGIN

  -- Upsert into list
  INSERT INTO `list` (
    `name`,
    `description`,
    `isPublic`,
    `userId`,
    `createdAt`,
    `updatedAt`
  ) VALUES (
    $LIST_NAME,
    $LIST_DESCRIPTION,
    $LIST_IS_PUBLIC,
    $LIST_USER_ID,
    UNIX_TIMESTAMP(),
    UNIX_TIMESTAMP()
  ) ON DUPLICATE KEY UPDATE
    name        = $LIST_NAME,
    description = $LIST_DESCRIPTION,
    isPublic    = $LIST_IS_PUBLIC,
    userId      = $LIST_USER_ID,
    updatedAt   = UNIX_TIMESTAMP();

  -- Retrieve the upserted id
  SET @list_id = LAST_INSERT_ID();

  SELECT @list_id as listId;

END
