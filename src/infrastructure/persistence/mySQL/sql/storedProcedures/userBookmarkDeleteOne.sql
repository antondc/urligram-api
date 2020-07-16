
DROP PROCEDURE IF EXISTS user_bookmark_delete;

-- Stored procedure to delete bookmark
CREATE PROCEDURE user_bookmark_delete(
  IN data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @bookmark_id   = JSON_UNQUOTE(JSON_EXTRACT(data, '$.bookmarkId'));
  SET @user_id   = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));

  SET @link_id = (
    SELECT
      link_id
    FROM bookmark
    WHERE
      bookmark.id = @bookmark_id
  );

  SET @domain_id = (
      SELECT domain_id FROM link
      WHERE id = @link_id
  );

  DELETE FROM bookmark_tag
  WHERE bookmark_id  = @bookmark_id;

  DELETE FROM bookmark_list
  WHERE bookmark_id  = @bookmark_id;

  -- Finally remove bookmark entry
  DELETE FROM bookmark
  WHERE id            = @bookmark_id;

  DELETE link FROM link
  LEFT JOIN bookmark ON bookmark.link_id = link.id
  WHERE bookmark.id IS NULL AND link.id = @link_id;

    -- Delete domain in case is not used by other link entries
  DELETE domain FROM domain
  LEFT JOIN link ON link.domain_id = domain.id
  WHERE link.id IS NULL AND domain.id = @domain_id;

  SELECT @bookmark_id AS bookmarkId;

END