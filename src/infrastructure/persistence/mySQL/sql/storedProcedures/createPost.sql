DROP PROCEDURE IF EXISTS create_post;

-- Stored procedure to insert post and tags
CREATE PROCEDURE create_post(
  IN my_data JSON
)
BEGIN
  -- Declare iterator variable to use it later on in the loop
  DECLARE i INT DEFAULT 0;

  -- Retrieve values from JSON
  SET @title = JSON_EXTRACT(my_data, '$.title');
  SET @body = JSON_EXTRACT(my_data, '$.body');
  SET @tags = JSON_EXTRACT(my_data, '$.tags');
  SET @json = JSON_UNQUOTE(my_data);

  -- Insert post
  INSERT INTO post (title, body, my_data) VALUES (
    JSON_UNQUOTE(@title),
    JSON_UNQUOTE(@body),
    @json);

  -- Retrieve inserted id to reuse it in post_tag
  SET @last_post = LAST_INSERT_ID();

  -- Get tags length for the loop
  SET @tags_length = JSON_LENGTH(@tags);
  -- Execute loop over tags length
  WHILE i < @tags_length DO
    -- Retrieve current tag from tags array
    SET @tag = JSON_EXTRACT(my_data, CONCAT('$.tags[',i,'].tag'));

    -- Insert tag
    INSERT INTO tag (tag) VALUES (
      JSON_UNQUOTE(@tag)
    ) ON DUPLICATE KEY UPDATE tag = JSON_UNQUOTE(@tag);

    -- Retrieve tag id
    SELECT id INTO @last_tag
    FROM tag
    WHERE tag = JSON_UNQUOTE(@tag);

    -- Insert retrieved post_id and tag_id into post_tag
    INSERT INTO post_tag (post_id, tag_id) VALUES (
      @last_post,
      @last_tag
    ) ON DUPLICATE KEY UPDATE post_id = @last_post, tag_id = @last_tag;

    -- Add step to iterator
    SELECT i + 1 INTO i;
  END WHILE;
END