
DROP PROCEDURE IF EXISTS user_link_delete;

-- Stored procedure to delete link_user
CREATE PROCEDURE user_link_delete(
  IN user_link_data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @link_id   = JSON_UNQUOTE(JSON_EXTRACT(user_link_data, '$.linkId'));
  SET @user_id   = JSON_UNQUOTE(JSON_EXTRACT(user_link_data, '$.userId'));

  SET @user_link_id = (
    SELECT
      id
    FROM link_user
    WHERE
      link_id = @link_id
      AND user_id = @user_id
  );

  SET @domain_id = (
      SELECT domain_id FROM link
      WHERE id = @link_id
  );

  DELETE FROM link_user_tag
  WHERE link_user_id  = @user_link_id;

  DELETE FROM link_user_list
  WHERE link_user_id  = @user_link_id;

  -- Finally remove link_user entry
  DELETE FROM link_user
  WHERE id            = @user_link_id;

  DELETE link FROM link
  LEFT JOIN link_user ON link_user.link_id = link.id
  WHERE link_user.id IS NULL AND link.id = @link_id;

    -- Delete domain in case is not used by other link entries
  DELETE domain FROM domain
  LEFT JOIN link ON link.domain_id = domain.id
  WHERE link.id IS NULL AND domain.id = @domain_id;

  SELECT @user_link_id AS id;

END