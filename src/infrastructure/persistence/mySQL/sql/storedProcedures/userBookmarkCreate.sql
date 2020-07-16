DROP PROCEDURE IF EXISTS user_bookmark_create;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_bookmark_create(
  IN data JSON
)
BEGIN

  -- Declare iterator variable to use it later on in the loop
  DECLARE i INT DEFAULT 0;

  -- Retrieve values from JSON
  SET @user_id     = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));
  SET @title       = JSON_UNQUOTE(JSON_EXTRACT(data, '$.title'));
  SET @vote        = JSON_UNQUOTE(JSON_EXTRACT(data, '$.vote'));
  SET @saved       = JSON_UNQUOTE(JSON_EXTRACT(data, '$.saved'));
  SET @is_private  = JSON_UNQUOTE(JSON_EXTRACT(data, '$.isPrivate'));
  SET @domain      = JSON_UNQUOTE(JSON_EXTRACT(data, '$.domain'));
  SET @path        = JSON_UNQUOTE(JSON_EXTRACT(data, '$.path'));
  SET @tags        = JSON_EXTRACT(data, '$.tags');

  -- Upsert into domain
  INSERT INTO domain (
    `domain`
  ) VALUES (
    @domain
  ) ON DUPLICATE KEY UPDATE
    domain    = @domain,
    updatedAt = CURRENT_TIMESTAMP;

  -- Retrieve the upserted id
  SET @domain_id = (
    SELECT domain.id
    FROM domain
    WHERE domain.domain = @domain
  );

  -- Upsert into link
  INSERT INTO link (
    `path`,
    `domain_id`
  ) VALUES (
    @path,
    @domain_id
  ) ON DUPLICATE KEY UPDATE
    path      = @path,
    domain_id = @domain_id,
    updatedAt = CURRENT_TIMESTAMP;

  -- Retrieve the upserted link_id
  SET @link_id = (
    SELECT link.id
    FROM link
    WHERE link.path = @path AND link.domain_id = @domain_id
  );

  -- Upsert into bookmark
  INSERT INTO bookmark (
    `bookmark`.`title`,
    `bookmark`.`isPrivate`,
    `bookmark`.`saved`,
    `bookmark`.`vote`,
    `bookmark`.`user_id`,
    `bookmark`.`link_id`
  ) VALUES (
    @title,
    @is_private,
    @saved,
    @vote,
    @user_id,
    @link_id
  ) ON DUPLICATE KEY UPDATE
    isPrivate   = @is_private,
    saved       = @saved,
    vote        = @vote,
    user_id     = @user_id,
    link_id     = @link_id,
    updatedAt   = CURRENT_TIMESTAMP;

  -- Retrieve the last upserted id
  SET @bookmark_id = (
    SELECT bookmark.id
    FROM bookmark
    WHERE bookmark.user_id = @user_id AND bookmark.link_id = @link_id
  );

  -- Get tags length for the loop
  SET @tags_length = JSON_LENGTH(@tags);

  -- Clear intermediate table for bookmark_tag
  DELETE FROM bookmark_tag
  WHERE
  bookmark_id = @bookmark_id;

  -- Execute loop over tags length
  WHILE i < @tags_length DO

    -- Retrieve current tag from tags array
    SET @tag = JSON_EXTRACT(data, CONCAT('$.tags[',i,'].tag'));

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