DROP PROCEDURE IF EXISTS bookmark_get_default_by_link;

-- DELIMITER $$

-- Stored procedure to insert post and tags
CREATE PROCEDURE bookmark_get_default_by_link(
  IN $SESSION_ID VARCHAR(40),
  IN $LINK_ID INT
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
    bookmark.title,
    bookmark.notes,
    bookmark.isPublic,
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
      WHERE bookmark.id = bookmark_list.bookmark_id AND list.isPublic IS TRUE
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
    ) AS link,
    (
      SELECT
        IF(
          COUNT(bookmark.id) = 0,
          JSON_ARRAY(),
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', `bookmark`.`id`,
              'title', `bookmark`.`title`,
              'userId', `bookmark`.`user_id`
            )
          )
        )
      FROM `bookmark`
      WHERE bookmark.link_id = link.id
    ) AS bookmarksRelated
  FROM bookmark
  INNER JOIN `link` ON bookmark.link_id = link.id
  INNER JOIN domain ON link.domain_id = domain.id
  WHERE
      bookmark.link_id = $LINK_ID
    AND
      (
          bookmark.isPublic IS TRUE
        OR
          bookmark.user_id = $SESSION_ID
        or json_contains(
          (
            select json_arrayagg(list_bookmark_user.user_id)
            from list_bookmark_user
            where list_bookmark_user.bookmark_id = bookmark.id
          ),
          json_quote($SESSION_ID),
          '$'
        )
      )
  ORDER BY bookmark.updatedAt DESC
  LIMIT 1
  ;

END

-- DELIMITER ;
-- CALL bookmark_get_default_by_link(1);
