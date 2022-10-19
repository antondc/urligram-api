DROP PROCEDURE IF EXISTS user_bookmark_update;

-- DELIMITER $$

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_bookmark_update(
  IN $BOOKMARK_ID INT,
  IN $ORDER INT,
  IN $TITLE VARCHAR(255),
  IN $IS_PRIVATE BOOLEAN,
  IN $TAGS JSON,
  IN $NOTES TEXT
)

BEGIN

  -- Declare iterator variable to use it later on in the loop
  DECLARE i INT DEFAULT 0;

  -- Upsert into bookmark
  UPDATE bookmark
  SET
    `bookmark`.`isPrivate`  = $IS_PRIVATE,
    `bookmark`.`order`      = $ORDER,
    `bookmark`.`title`      = $TITLE,
    `bookmark`.`notes`      = $NOTES
  WHERE
    `bookmark`.id           = $BOOKMARK_ID
  ;

  -- Get tags length for the loop
  SET @tags_length = JSON_LENGTH($TAGS);

    -- Clear intermediate table for bookmark_tag
  DELETE FROM bookmark_tag
  WHERE bookmark_id = $BOOKMARK_ID;

  -- Execute loop over tags length
  WHILE i < @tags_length DO

    -- Retrieve current tag from tags array
    SET @tag = JSON_EXTRACT($TAGS, CONCAT('$[',i,'].tag'));

    -- Insert tag
    INSERT INTO tag (
      NAME
    ) VALUES (
      JSON_UNQUOTE(@tag)
    ) ON DUPLICATE KEY UPDATE
      NAME        = JSON_UNQUOTE(@tag),
      updatedAt   = UNIX_TIMESTAMP();

    -- Retrieve tag id
    SELECT id INTO @last_tag
    FROM tag
    WHERE NAME = JSON_UNQUOTE(@tag);

    -- Insert retrieved bookmark_id and last_tag into bookmark_tag
    INSERT INTO bookmark_tag (
      bookmark_id,
      tag_id
    ) VALUES (
      $BOOKMARK_ID,
      @last_tag
    ) ON DUPLICATE KEY UPDATE
      bookmark_id   = $BOOKMARK_ID,
      tag_id        = @last_tag,
      updatedAt     = UNIX_TIMESTAMP();

    UPDATE
      bookmark
    SET
      updatedAt   = UNIX_TIMESTAMP()
    WHERE
      bookmark.id = $BOOKMARK_ID
    ;

    -- Add step to iterator
    SELECT i + 1 INTO i;
  END WHILE;

  SELECT
    $BOOKMARK_ID
  AS
    bookmarkId
  ;

END

-- DELIMITER ;
