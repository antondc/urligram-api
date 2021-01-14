DROP PROCEDURE IF EXISTS user_bookmark_create;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_bookmark_create(
  IN $USER_ID VARCHAR(40),
  IN $TITLE VARCHAR(40),
  IN $SAVED BOOLEAN,
  IN $IS_PRIVATE BOOLEAN,
  IN $DOMAIN VARCHAR(40),
  IN $_PATH TEXT,
  IN $TAGS JSON
)

BEGIN

  -- Declare iterator variable to use it later on in the loop
  DECLARE i INT DEFAULT 0;

  -- Upsert into domain
  INSERT INTO domain (
    `domain`
  ) VALUES (
    $DOMAIN
  ) ON DUPLICATE KEY UPDATE
    domain    = $DOMAIN,
    updatedAt = CURRENT_TIMESTAMP;

  -- Retrieve the upserted id
  SET @domain_id = (
    SELECT domain.id
    FROM domain
    WHERE domain.domain = $DOMAIN
  );

  -- Upsert into link
  INSERT INTO link (
    `path`,
    `domain_id`
  ) VALUES (
    $_PATH,
    @domain_id
  ) ON DUPLICATE KEY UPDATE
    path      = $_PATH,
    domain_id = @domain_id,
    updatedAt = CURRENT_TIMESTAMP;

  -- Retrieve the upserted link_id
  SET @link_id = (
    SELECT link.id
    FROM link
    WHERE link.path = $_PATH AND link.domain_id = @domain_id
  );

  -- Upsert into bookmark
  INSERT INTO bookmark (
    `bookmark`.`title`,
    `bookmark`.`isPrivate`,
    `bookmark`.`saved`,
    `bookmark`.`user_id`,
    `bookmark`.`link_id`
  ) VALUES (
    $TITLE,
    $IS_PRIVATE,
    $SAVED,
    $USER_ID,
    @link_id
  ) ON DUPLICATE KEY UPDATE
    isPrivate   = $IS_PRIVATE,
    saved       = $SAVED,
    user_id     = $USER_ID,
    link_id     = @link_id,
    updatedAt   = CURRENT_TIMESTAMP;

  -- Retrieve the last upserted id
  SET @bookmark_id = (
    SELECT bookmark.id
    FROM bookmark
    WHERE bookmark.user_id = $USER_ID AND bookmark.link_id = @link_id
  );

  -- Get tags length for the loop
  SET @tags_length = JSON_LENGTH($TAGS);

  -- Clear intermediate table for bookmark_tag
  DELETE FROM bookmark_tag
  WHERE
  bookmark_id = @bookmark_id;

  -- Execute loop over tags length
  WHILE i < @tags_length DO

    -- Retrieve current tag from tags array
    SET @tag = JSON_EXTRACT($TAGS, CONCAT('$[',i,'].tag'));

    -- Insert tag
    INSERT INTO tag (
      name
    ) VALUES (
      JSON_UNQUOTE(@tag)
    ) ON DUPLICATE KEY UPDATE
      name        = JSON_UNQUOTE(@tag),
      updatedAt   = CURRENT_TIMESTAMP;

    -- Retrieve tag id
    SELECT id INTO @last_tag
    FROM tag
    WHERE name = JSON_UNQUOTE(@tag);

    -- Insert retrieved bookmark_id and last_tag into bookmark_tag
    INSERT INTO bookmark_tag (
      bookmark_id,
      tag_id
    ) VALUES (
      @bookmark_id,
      @last_tag
    ) ON DUPLICATE KEY UPDATE
      bookmark_id   = @bookmark_id,
      tag_id        = @last_tag,
      updatedAt     = CURRENT_TIMESTAMP;

    -- Add step to iterator
    SELECT i + 1 INTO i;
  END WHILE;

  SELECT @bookmark_id AS bookmarkId;
END