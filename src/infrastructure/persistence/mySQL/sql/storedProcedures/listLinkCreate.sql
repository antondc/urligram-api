DROP PROCEDURE IF EXISTS list_link_create;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_link_create(
  IN list_link JSON
)
BEGIN

  -- Retrieve values from JSON
  SET @list_id      = JSON_UNQUOTE(JSON_EXTRACT(list_link, '$.listId'));
  SET @link_id      = JSON_UNQUOTE(JSON_EXTRACT(list_link, '$.linkId'));
  SET @user_id      = JSON_UNQUOTE(JSON_EXTRACT(list_link, '$.userId'));

  SET @link_user_id = (
    SELECT
      id
    FROM link_user
    WHERE
      link_id = @link_id
      AND user_id = @user_id
  );

  -- Upsert into list
  INSERT INTO link_user_list (
    `list_id`,
    `link_user_id`
  ) VALUES (
    @list_id,
    @link_user_id
  ) ON DUPLICATE KEY UPDATE
    list_id      = @list_id,
    link_user_id = @link_user_id,
    updatedAt    = CURRENT_TIMESTAMP;


  SELECT @list_id AS listId, @link_id AS linkId, @user_id AS userId;

END