DROP PROCEDURE IF EXISTS link_get_all_public;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_get_all_public(
  IN data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @link_id  = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));

  SELECT
    link.id,
    link.title,
    link.image as img,
    link.order,
    CONCAT(domain.domain, link.path) AS url,
    (
      -- Perform a select with custom array to remove repetitions
      SELECT
        IF(
          COUNT(tag.id) = 0,
          JSON_ARRAY(),
          CAST(
            CONCAT('[',
              GROUP_CONCAT(
                DISTINCT JSON_OBJECT(
                  'id', tag.id,
                  'name', tag.name
                ) SEPARATOR ','
              ), ']'
            ) AS JSON
          )
        ) AS tags
      FROM bookmark
      JOIN bookmark_tag ON bookmark_tag.bookmark_id = bookmark.id
      JOIN tag ON bookmark_tag.tag_id = tag.id
      WHERE bookmark.link_id = link.id
    ) AS tags,
    (
      SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', user.id,
            'name', user.name
          )
        )
      FROM bookmark
      JOIN user ON bookmark.user_id = user.id
      WHERE bookmark.link_id = link.id
    ) as users
  FROM link
  INNER JOIN bookmark ON bookmark.link_id = link.id
  INNER JOIN domain ON link.domain_id = domain.id
  WHERE (
    -- Select when any of the bookmarks is public
    0 IN (
      SELECT
       bookmark.isPrivate
      FROM bookmark
      WHERE bookmark.link_id = link.id
    )
  )
  GROUP BY link.id;

END