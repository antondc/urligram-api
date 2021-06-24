DROP PROCEDURE IF EXISTS list_bookmark_get_one;

-- DELIMITER $$

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_bookmark_get_one(
  IN $SESSION_ID VARCHAR(40),
  IN $LIST_ID INT,
  IN $BOOKMARK_ID INT
)
BEGIN

  SELECT
    bookmark.id,
    bookmark.title AS bookmarkTitle,
    bookmark.user_id AS userId,
    CONCAT(domain.domain, link.path) AS url,
    `link`.`favicon`,
    bookmark.isPrivate,
    bookmark.saved,
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
  FROM bookmark_list
  JOIN bookmark ON bookmark_list.bookmark_id  = bookmark.id
  JOIN link ON bookmark.link_id               = link.id
  JOIN domain ON link.domain_id               = domain.id
  JOIN `list` ON bookmark_list.list_id        = list.id
  LEFT JOIN user_list ON user_list.list_id    = list.id
  WHERE
    `bookmark_list`.`list_id`                 = $LIST_ID
    AND `bookmark_list`.`bookmark_id`         = $BOOKMARK_ID
  GROUP BY bookmark.id
  ;

END

-- DELIMITER ;

-- CALL list_bookmark_get_one(1, 1);