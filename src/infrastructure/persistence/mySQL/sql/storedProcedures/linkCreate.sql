DROP PROCEDURE IF EXISTS link_create;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_create(
  IN link JSON
)
BEGIN

  -- Declare iterator variable to use it later on in the loop
  DECLARE i INT DEFAULT 0;

  -- Retrieve values from JSON
  SET @user_id    = JSON_UNQUOTE(JSON_EXTRACT(link, '$.userId'));
  SET @vote       = JSON_UNQUOTE(JSON_EXTRACT(link, '$.vote'));
  SET @saved      = JSON_UNQUOTE(JSON_EXTRACT(link, '$.saved'));
  SET @is_public  = JSON_UNQUOTE(JSON_EXTRACT(link, '$.isPublic'));
  SET @domain     = JSON_UNQUOTE(JSON_EXTRACT(link, '$.domain'));
  SET @path       = JSON_UNQUOTE(JSON_EXTRACT(link, '$.path'));
  SET @tags       = JSON_EXTRACT(link, '$.tags');

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

  -- Upsert into link_user
  INSERT INTO link_user (
    `link_user`.`isPublic`,
    `link_user`.`saved`,
    `link_user`.`vote`,
    `link_user`.`user_id`,
    `link_user`.`link_id`
  ) VALUES (
    @is_public,
    @saved,
    @vote,
    @user_id,
    @link_id
  ) ON DUPLICATE KEY UPDATE
    isPublic   = @is_public,
    saved      = @saved,
    vote       = @vote,
    user_id    = @user_id,
    link_id    = @link_id,
    updatedAt  = CURRENT_TIMESTAMP;

  -- Retrieve the last upserted id
  SET @link_user_id = (
    SELECT link_user.id
    FROM link_user
    WHERE link_user.user_id = @user_id AND link_user.link_id = @link_id
  );

  -- Get tags length for the loop
  SET @tags_length = JSON_LENGTH(@tags);

  -- Clear intermediate table for link_user_tag
  DELETE FROM link_user_tag
  WHERE
  link_user_id = @link_user_id;

  -- Execute loop over tags length
  WHILE i < @tags_length DO

    -- Retrieve current tag from tags array
    SET @tag = JSON_EXTRACT(link, CONCAT('$.tags[',i,'].tag'));

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

    -- Insert retrieved link_user_id and last_tag into link_user_tag
    INSERT INTO link_user_tag (
      link_user_id,
      tag_id
    ) VALUES (
      @link_user_id,
      @last_tag
    ) ON DUPLICATE KEY UPDATE
      link_user_id  = @link_user_id,
      tag_id        = @last_tag,
      updatedAt     = CURRENT_TIMESTAMP;

    -- Add step to iterator
    SELECT i + 1 INTO i;
  END WHILE;

  SELECT @link_user_id AS id;
END