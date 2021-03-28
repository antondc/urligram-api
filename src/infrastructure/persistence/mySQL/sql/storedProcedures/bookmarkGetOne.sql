DROP PROCEDURE IF EXISTS bookmark_get_one;

-- DELIMITER $$

-- Stored procedure to insert post and tags
CREATE PROCEDURE bookmark_get_one(
  IN $BOOKMARK_ID INT
)

BEGIN

  SELECT
    bookmark.id,
    bookmark.order,
    CONCAT(domain.domain, link.path) AS url,
    link.id AS linkId,
    link.image as img,
    `link`.`favicon`,
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
    ) AS lists,
    (
      SELECT
        IF(COUNT(bookmark.user_id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(bookmark.user_id))
      FROM bookmark
      WHERE bookmark.link_id = link.id
    ) AS users,
    (
      SELECT
        JSON_OBJECT(
          'id', link.id,
          'title', link.title
        )
    ) AS link
  FROM bookmark
  INNER JOIN `link` ON bookmark.link_id = link.id
  INNER JOIN domain ON link.domain_id = domain.id
  WHERE bookmark.id = $BOOKMARK_ID
  ;

END

-- DELIMITER ;
-- CALL bookmark_get_one(1);