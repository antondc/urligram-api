DROP PROCEDURE IF EXISTS user_bookmark_create;

DELIMITER $$

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_bookmark_create(
  IN $USER_ID VARCHAR(40),
  IN $LINK_ID INT,
  IN $TITLE VARCHAR(255),
  IN $IS_PRIVATE BOOLEAN,
  IN $TAGS JSON,
  IN $NOTES TEXT
)

BEGIN

  -- Declare iterator variable to use it later on in the loop
  DECLARE i INT DEFAULT 0;

  -- Upsert into bookmark
  INSERT INTO bookmark (
    `bookmark`.`title`,
    `bookmark`.`isPrivate`,
    `bookmark`.`user_id`,
    `bookmark`.`link_id`,
    `bookmark`.`notes`,
    createdAt,
    updatedAt
  ) VALUES (
    $TITLE,
    $IS_PRIVATE,
    $USER_ID,
    $LINK_ID,
    $NOTES,
    UNIX_TIMESTAMP(),
    UNIX_TIMESTAMP()
  ) ON DUPLICATE KEY UPDATE
    isPrivate   = $IS_PRIVATE,
    title       = $TITLE,
    notes       = $NOTES,
    updatedAt   = UNIX_TIMESTAMP()
  ;

  -- Retrieve the last upserted id
  SET @bookmark_id = (
    SELECT
      bookmark.id
    FROM
      bookmark
    WHERE
      bookmark.user_id = $USER_ID
      AND
      bookmark.link_id = $LINK_ID
  );

  -- Get tags length for the loop
  SET @tags_length = JSON_LENGTH($TAGS);

  -- Clear intermediate table for bookmark_tag
  DELETE FROM
    bookmark_tag
  WHERE
    bookmark_id = @bookmark_id
  ;

  -- Execute loop over tags length
  WHILE i < @tags_length DO

    -- Retrieve current tag from tags array
    SET @tag = JSON_EXTRACT($TAGS, CONCAT('$[',i,'].tag'));

    -- Insert tag
    INSERT INTO tag (
      name,
      createdAt,
      updatedAt
    ) VALUES (
      JSON_UNQUOTE(@tag),
      UNIX_TIMESTAMP(),
      UNIX_TIMESTAMP()
    ) ON DUPLICATE KEY UPDATE
      name        = JSON_UNQUOTE(@tag),
      updatedAt   = UNIX_TIMESTAMP();

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
      updatedAt     = UNIX_TIMESTAMP();

    -- Add step to iterator
    SELECT i + 1 INTO i;
  END WHILE;

  SELECT @bookmark_id AS id;

END $$

DELIMITER ;