DROP PROCEDURE IF EXISTS user_bookmark_delete;

-- Stored procedure to delete bookmark
CREATE PROCEDURE user_bookmark_delete(
  IN $BOOKMARK_ID INT
)

BEGIN

  SET @link_id = (
    SELECT
      link_id
    FROM bookmark
    WHERE
      bookmark.id = $BOOKMARK_ID
  );

  SET @domain_id = (
      SELECT domain_id FROM link
      WHERE id = @link_id
  );

  DELETE FROM bookmark_tag
  WHERE bookmark_id  = $BOOKMARK_ID;

  DELETE FROM bookmark_list
  WHERE bookmark_id  = $BOOKMARK_ID;

  -- Finally remove bookmark entry
  DELETE FROM bookmark
  WHERE id            = $BOOKMARK_ID;

  -- Remove votes for this bookmark
  DELETE user_link FROM user_link
  LEFT JOIN bookmark ON bookmark.link_id = user_link.link_id
  WHERE bookmark.id IS NULL AND user_link.link_id = @link_id;

  -- Remove link
  DELETE link FROM link
  LEFT JOIN bookmark ON bookmark.link_id = link.id
  WHERE bookmark.id IS NULL AND link.id = @link_id;

  -- Delete domain in case is not used by other link entries
  DELETE domain FROM domain
  LEFT JOIN link ON link.domain_id = domain.id
  WHERE link.id IS NULL AND domain.id = @domain_id;

  SELECT $BOOKMARK_ID AS bookmarkId;

END