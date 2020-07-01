DROP PROCEDURE IF EXISTS link_update;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_update(
  IN link JSON
)
BEGIN

  -- Declare iterator variable to use it later on in the loop
  DECLARE i INT DEFAULT 0;

  -- Retrieve values from JSON
  SET @id         = JSON_UNQUOTE(JSON_EXTRACT(link, '$.id'));
  SET @user_id    = JSON_UNQUOTE(JSON_EXTRACT(link, '$.userId'));
  SET @order      = JSON_UNQUOTE(JSON_EXTRACT(link, '$.order'));
  SET @vote       = JSON_UNQUOTE(JSON_EXTRACT(link, '$.vote'));
  SET @saved      = JSON_UNQUOTE(JSON_EXTRACT(link, '$.saved'));
  SET @is_public  = JSON_UNQUOTE(JSON_EXTRACT(link, '$.isPublic'));
  SET @domain     = JSON_UNQUOTE(JSON_EXTRACT(link, '$.domain'));
  SET @path       = JSON_UNQUOTE(JSON_EXTRACT(link, '$.path'));
  SET @tags       = JSON_EXTRACT(link, '$.tags');

  -- Select path
  SET @link_id = (
      SELECT link_id FROM link_user
      WHERE id = @id
  );
  SET @current_path = (
      SELECT path FROM link
      WHERE id = @link_id
  );
  SET @path_updated = @path NOT LIKE @current_path;
  -- Select domain
  SET @domain_id = (
      SELECT domain_id FROM link
      WHERE id = @link_id
  );
  SET @current_domain = (
      SELECT domain FROM domain
      WHERE id = @domain_id
  );
  SET @domain_updated = @domain NOT LIKE @current_domain;

  -- Update link_user FK to be able to select links with no relations
  UPDATE link_user
  SET link_user.link_id = NULL
  WHERE link_user.id = JSON_UNQUOTE(@id);

  -- Delete domain in case it was updated and is not used by any other link
  IF @domain_updated THEN
  -- Update link_user FK to be able to select links with no relations
    UPDATE link
    SET link.domain_id = NULL
    WHERE link.id = @link_id;

    DELETE domain FROM domain
    LEFT JOIN link ON link.domain_id = domain.id
    WHERE link.id IS NULL AND domain.id = @domain_id;

    -- Upsert new domain
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

    -- Upsert new link
    UPDATE link
    SET domain_id = @domain_id
    WHERE id = @link_id;

  END IF;

  -- Delete link in case it was updated and is not used by any other link_user
  IF @path_updated THEN

    -- Update link_user FK to be able to select links with no relations
    UPDATE link_user
    SET link_user.link_id = NULL
    WHERE link_user.id = JSON_UNQUOTE(@id);

    DELETE link FROM link
    LEFT JOIN link_user ON link_user.link_id = link.id
    WHERE link_user.id IS NULL AND link.id = @link_id;

    -- Upsert new link
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

  END IF;

  -- Upsert into link_user
  UPDATE link_user
  SET
    `link_user`.`isPublic`  = @is_public,
    `link_user`.`saved`     = @saved,
    `link_user`.`order`     = @order,
    `link_user`.`vote`      = @vote,
    `link_user`.`user_id`   = @user_id,
    `link_user`.`link_id`   = @link_id
  WHERE `link_user`.id      = @id;


  -- Retrieve the last upserted id
  SET @id = (
    SELECT link_user.id
    FROM link_user
    WHERE link_user.user_id = @user_id AND link_user.link_id = @link_id
  );

  -- Get tags length for the loop
  SET @tags_length = JSON_LENGTH(@tags);

  -- Clear intermediate table for link_user_tag
  DELETE FROM link_user_tag
  WHERE
  link_user_id = @id;

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
      @id,
      @last_tag
    ) ON DUPLICATE KEY UPDATE
      link_user_id  = @id,
      tag_id        = @last_tag,
      updatedAt     = CURRENT_TIMESTAMP;

    -- Add step to iterator
    SELECT i + 1 INTO i;
  END WHILE;

  SELECT @id AS id;
END