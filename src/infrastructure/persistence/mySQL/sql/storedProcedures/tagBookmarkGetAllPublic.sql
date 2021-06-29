DROP PROCEDURE IF EXISTS tag_bookmark_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE tag_bookmark_get_all(
  IN $SESSION_ID VARCHAR(40),
  IN $TAG_ID INT
)

BEGIN

  SELECT
    bookmark.id,
    bookmark.order,
    CONCAT(domain.domain, link.path) AS url,
    link.id AS linkId,
    link.image AS img,
    bookmark.user_id AS userId,
    bookmark.isPrivate,
    bookmark.saved,
    bookmark.createdAt,
    bookmark.updatedAt,
    (
      SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', tag.id,
            'name', tag.name
          )
        )
      FROM bookmark_tag
      JOIN tag
      ON bookmark_tag.tag_id = tag.id
      WHERE bookmark.id = bookmark_tag.bookmark_id
    ) AS tags,
    -- Returns only public lists or those where user is in
    -- Unsorted
    (
      SELECT
        CAST(
          CONCAT('[',
            GROUP_CONCAT(
              DISTINCT JSON_OBJECT(
                'id', list.id,
                'name', list.name
              ) SEPARATOR ','
          ), ']'
        ) AS JSON
      ) AS lists
      FROM bookmark_list
      JOIN `list` ON bookmark_list.list_id = list.id
      JOIN user_list ON user_list.list_id = list.id
      WHERE bookmark.id = bookmark_list.bookmark_id AND list.isPrivate != 1
    ) AS lists
  FROM bookmark
  INNER JOIN `link` ON bookmark.link_id = link.id
  INNER JOIN domain ON link.domain_id = domain.id
  INNER JOIN bookmark_tag ON bookmark_tag.bookmark_id = bookmark.id
  WHERE bookmark_tag.tag_id = $TAG_ID
  GROUP BY bookmark.id
  ;


END