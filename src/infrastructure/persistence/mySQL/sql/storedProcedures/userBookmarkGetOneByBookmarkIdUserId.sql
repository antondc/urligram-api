DROP PROCEDURE IF EXISTS user_bookmark_get_one_by_id;

-- DELIMITER $$

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_bookmark_get_one_by_id(
  IN $SESSION_ID VARCHAR(40),
  IN $BOOKMARK_ID INT,
  IN $USER_ID VARCHAR(40)
)

BEGIN


  SELECT
    `bookmark`.`id`,
    `bookmark`.`order`,
    CONCAT(domain.domain, link.path) AS url,
    `bookmark`.`link_id` AS linkId,
    `bookmark`.`title`,
    `bookmark`.`user_id` AS userId,
    `link`.`favicon`,
    `bookmark`.`isPrivate`,
    `bookmark`.`saved`,
    `bookmark`.`createdAt`,
    `bookmark`.`updatedAt`,
    (
      SELECT
        IF(COUNT(bookmark.user_id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(bookmark.user_id))
      FROM bookmark
      WHERE bookmark.link_id = link.id
    ) AS users,
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
      AND (
        bookmark.isPrivate IS NOT TRUE
        OR bookmark.user_id = $USER_ID
      )
    ) AS bookmarksRelated
  FROM bookmark
  INNER JOIN `link` ON `bookmark`.`link_id` = `link`.`id`
  INNER JOIN `domain` ON `link`.`domain_id` = `domain`.`id`
  WHERE
    `bookmark`.`id` = $BOOKMARK_ID
    AND bookmark.user_id = $USER_ID;

END

-- DELIMITER ;

-- CALL user_bookmark_get_one_by_id(10, "e4e2bb46-c210-4a47-9e84-f45c789fcec1");