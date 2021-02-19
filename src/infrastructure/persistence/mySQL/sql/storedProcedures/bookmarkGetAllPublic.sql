DROP PROCEDURE IF EXISTS bookmark_get_all_public;

-- Stored procedure to insert post and tags
CREATE PROCEDURE bookmark_get_all_public(
  IN $SESSION_ID VARCHAR(40),
  IN $SORT VARCHAR(20),
  IN $SIZE INT,
  IN $OFFSET INT
)

BEGIN
  SET $SIZE = IFNULL($SIZE, -1);

  SELECT
    count(*) OVER() as totalItems,
    bookmark.id,
    bookmark.order,
    link.image as img,
    bookmark.title,
    CONCAT(domain.domain, link.path) AS url,
    link.id AS linkId,
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
  WHERE
    bookmark.isPrivate IS NOT TRUE
    OR
    bookmark.`user_id` = $SESSION_ID
  ORDER BY
    CASE WHEN $SORT = 'id'          THEN `bookmark`.id      	ELSE NULL END ASC,
    CASE WHEN $SORT = '-id'         THEN `bookmark`.id      	ELSE NULL END DESC,
    CASE WHEN $SORT = 'createdAt'   THEN `bookmark`.createdAt	ELSE NULL END ASC,
    CASE WHEN $SORT = '-createdAt'  THEN `bookmark`.createdAt ELSE NULL END DESC,
    CASE WHEN $SORT = 'updatedAt'   THEN `bookmark`.updatedAt ELSE NULL END ASC,
    CASE WHEN $SORT = '-updatedAt'  THEN `bookmark`.updatedAt ELSE NULL END DESC,
    CASE WHEN $SORT IS NULL         THEN `bookmark`.id        ELSE NULL END ASC

  LIMIT $OFFSET , $SIZE
  ;

END