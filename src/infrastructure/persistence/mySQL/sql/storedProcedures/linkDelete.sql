
DROP PROCEDURE IF EXISTS link_delete;

-- Stored procedure to delete link_user
CREATE PROCEDURE link_delete(
  IN link_data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @id   = JSON_EXTRACT(link_data, '$.id');

  SET @link_id = (
      SELECT link_id FROM link_user
      WHERE id = JSON_UNQUOTE(@id)
  );

  SET @domain_id = (
      SELECT domain_id FROM link
      WHERE id = @link_id
  );

  DELETE FROM link_user_tag
  WHERE link_user_id  = JSON_UNQUOTE(@id);

  DELETE FROM link_user_list
  WHERE link_user_id  = JSON_UNQUOTE(@id);

  -- Finally remove link_user entry
  DELETE FROM link_user
  WHERE id            = JSON_UNQUOTE(@id);

  DELETE link FROM link
  LEFT JOIN link_user ON link_user.link_id = link.id
  WHERE link_user.id IS NULL AND link.id = @link_id;

    -- Delete domain in case is not used by other link entries
  DELETE domain FROM domain
  LEFT JOIN link ON link.domain_id = domain.id
  WHERE link.id IS NULL AND domain.id = @domain_id;

  SELECT JSON_UNQUOTE(@id) AS removedId;

END