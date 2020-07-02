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


  --  Select old variables
  SET @original_link_id = (
      SELECT link_id FROM link_user
      WHERE id = @id
  );
  SET @original_domain_id = (
      SELECT domain_id FROM link
      WHERE id = @original_link_id
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


  -- Upsert into link_user
  UPDATE link_user
  SET
    `link_user`.`isPublic`  = @is_public,
    `link_user`.`saved`     = @saved,
    `link_user`.`order`     = @order,
    `link_user`.`vote`      = @vote,
    `link_user`.`user_id`   = @user_id,
    `link_user`.`link_id`   = @new_link_id
  WHERE `link_user`.id      = @id;


  -- Clean link
  DELETE link FROM link
  LEFT JOIN link_user ON link_user.link_id = link.id
  WHERE link_user.id IS NULL AND link.id = @original_link_id;

  -- Clean domain
  DELETE domain FROM domain
  LEFT JOIN link ON link.domain_id = domain.id
  WHERE link.id IS NULL AND domain.id = @original_domain_id;


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

  SELECT @id;
END