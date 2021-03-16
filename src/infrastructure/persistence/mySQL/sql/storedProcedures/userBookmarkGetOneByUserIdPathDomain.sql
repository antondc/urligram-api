DROP PROCEDURE IF EXISTS user_bookmark_get_one_by_user_path_domain;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_bookmark_get_one_by_user_path_domain(
  IN $USER_ID VARCHAR(40),
  IN $_PATH TEXT,
  IN $DOMAIN VARCHAR(40)
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
    `bookmark`.`updatedAt`
  FROM bookmark
  INNER JOIN `link` ON `bookmark`.`link_id` = `link`.`id`
  INNER JOIN `domain` ON `link`.`domain_id` = `domain`.`id`
  WHERE
    `bookmark`.`user_id`      = $USER_ID
    AND `link`.`path`         = $_PATH
    AND `domain`.`domain`     = $DOMAIN
  ;

END