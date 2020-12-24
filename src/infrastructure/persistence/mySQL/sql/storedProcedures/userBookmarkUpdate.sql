DROP PROCEDURE IF EXISTS user_bookmark_update;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_bookmark_update(
  IN data JSON
)

BEGIN

  -- Declare iterator variable to use it later on in the loop
  DECLARE i INT DEFAULT 0;

  -- Retrieve values from JSON
  SET @bookmark_id         = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.bookmarkId'));
  SET @user_id             = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.userId'));
  SET @order               = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.order'));
  SET @saved               = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.saved'));
  SET @is_private          = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.isPrivate'));
  SET @domain              = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.domain'));
  SET @path                = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.path'));
  SET @tags                = JSON_EXTRACT(DATA, '$.tags');

  --  Select old variables
  SET @original_link_id = (
      SELECT
        bookmark.link_id
      FROM bookmark
      WHERE bookmark.id = @bookmark_id
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
    @domain
  ) ON DUPLICATE KEY UPDATE
    domain    = @domain,
    updatedAt = CURRENT_TIMESTAMP;

  -- Retrieve the upserted id
  SET @new_domain_id = (
    SELECT domain.id
    FROM domain
    WHERE domain.domain = @domain
  );

  -- Upsert new link
  INSERT INTO link (
    `path`,
    `domain_id`
  ) VALUES (
    @path,
    @new_domain_id
  ) ON DUPLICATE KEY UPDATE
    path      = @path,
    domain_id = @new_domain_id,
    updatedAt = CURRENT_TIMESTAMP;

  -- Retrieve the upserted link_id
  SET @new_link_id = (
    SELECT link.id
    FROM link
    WHERE link.path = @path AND link.domain_id = @new_domain_id
  );

  -- Upsert into bookmark
  UPDATE bookmark
  SET
    `bookmark`.`isPrivate`  = @is_private,
    `bookmark`.`saved`      = @saved,
    `bookmark`.`order`      = @order,
    `bookmark`.`user_id`    = @user_id,
    `bookmark`.`link_id`    = @new_link_id
  WHERE `bookmark`.id       = @bookmark_id;

  -- Clean link
  DELETE link FROM link
  LEFT JOIN bookmark ON bookmark.link_id = link.id
  WHERE bookmark.id IS NULL AND link.id = @original_link_id;

  -- Clean domain
  DELETE domain FROM domain
  LEFT JOIN link ON link.domain_id = domain.id
  WHERE link.id IS NULL AND domain.id = @original_domain_id;

  -- Get tags length for the loop
  SET @tags_length = JSON_LENGTH(@tags);

    -- Clear intermediate table for bookmark_tag
  DELETE FROM bookmark_tag
  WHERE bookmark_id = @bookmark_id;

  -- Execute loop over tags length
  WHILE i < @tags_length DO

    -- Retrieve current tag from tags array
    SET @tag = JSON_EXTRACT(DATA, CONCAT('$.tags[',i,'].tag'));

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