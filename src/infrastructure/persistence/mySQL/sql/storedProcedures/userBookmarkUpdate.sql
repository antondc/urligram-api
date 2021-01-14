DROP PROCEDURE IF EXISTS user_bookmark_update;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_bookmark_update(
  IN $BOOKMARK_ID VARCHAR(40),
  IN $ORDER INT,
  IN $TITLE VARCHAR(80),
  IN $USER_ID VARCHAR(40),
  IN $SAVED BOOLEAN,
  IN $IS_PRIVATE BOOLEAN,
  IN $DOMAIN VARCHAR(40),
  IN $PATH_ TEXT,
  IN $TAGS JSON
)

BEGIN

  -- Declare iterator variable to use it later on in the loop
  DECLARE i INT DEFAULT 0;

  --  Select old variables
  SET @original_link_id = (
      SELECT
        bookmark.link_id
      FROM bookmark
      WHERE bookmark.id = $BOOKMARK_ID
  );

  SET @original_domain_id = (
      SELECT
        link.domain_id
      FROM link
      WHERE link.id = @original_link_id
  );

  -- Upsert new domain
  INSERT INTO domain (
    `domain`
  ) VALUES (
    $DOMAIN
  ) ON DUPLICATE KEY UPDATE
    domain    = $DOMAIN,
    updatedAt = CURRENT_TIMESTAMP;

  -- Retrieve the upserted id
  SET @new_domain_id = (
    SELECT domain.id
    FROM domain
    WHERE domain.domain = $DOMAIN
  );

  -- Upsert new link
  INSERT INTO link (
    `path`,
    `domain_id`
  ) VALUES (
    $PATH_,
    @new_domain_id
  ) ON DUPLICATE KEY UPDATE
    path      = $PATH_,
    domain_id = @new_domain_id,
    updatedAt = CURRENT_TIMESTAMP;

  -- Retrieve the upserted link_id
  SET @new_link_id = (
    SELECT link.id
    FROM link
    WHERE link.path = $PATH_ AND link.domain_id = @new_domain_id
  );

  -- Upsert into bookmark
  UPDATE bookmark
  SET
    `bookmark`.`isPrivate`  = $IS_PRIVATE,
    `bookmark`.`saved`      = $SAVED,
    `bookmark`.`order`      = $ORDER,
    `bookmark`.`title`      = $TITLE,
    `bookmark`.`user_id`    = $USER_ID,
    `bookmark`.`link_id`    = @new_link_id
  WHERE `bookmark`.id       = $BOOKMARK_ID;

  -- Clean link
  DELETE link FROM link
  LEFT JOIN bookmark ON bookmark.link_id = link.id
  WHERE bookmark.id IS NULL AND link.id = @original_link_id;

  -- Clean domain
  DELETE domain FROM domain
  LEFT JOIN link ON link.domain_id = domain.id
  WHERE link.id IS NULL AND domain.id = @original_domain_id;

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
      updatedAt   = CURRENT_TIMESTAMP;

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
      updatedAt     = CURRENT_TIMESTAMP;

    -- Add step to iterator
    SELECT i + 1 INTO i;
  END WHILE;

  SELECT $BOOKMARK_ID AS bookmarkId;

END