DROP PROCEDURE IF EXISTS user_bookmark_get_one_by_link_user;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_bookmark_get_one_by_link_user(
  IN $LINK_ID INT,
  IN $USER_ID VARCHAR(40)
)

BEGIN


  SELECT
    `bookmark`.`id`,
    `bookmark`.`order`,
    CONCAT(domain.domain, link.path) AS url,
    `bookmark`.`link_id` AS linkId,
    `bookmark`.`title`,
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
    ) AS users
  FROM bookmark
  INNER JOIN `link` ON `bookmark`.`link_id` = `link`.`id`
  INNER JOIN `domain` ON `link`.`domain_id` = `domain`.`id`
  WHERE
     `bookmark`.`user_id`     = $USER_ID
     AND `bookmark`.`link_id` = $LINK_ID
  ;

END