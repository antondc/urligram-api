DROP PROCEDURE IF EXISTS user_bookmark_get_one_by_link_user;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_bookmark_get_one_by_link_user(
    IN data JSON
)

BEGIN

  -- Retrieve values from JSON
  SET @user_id      = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));
  SET @link_id      = JSON_UNQUOTE(JSON_EXTRACT(data, '$.linkId'));

  SELECT
    `bookmark`.`id`,
    `bookmark`.`order`,
    CONCAT(domain.domain, link.path) AS url,
    `bookmark`.`isPrivate`,
    `bookmark`.`saved`,
    `bookmark`.`createdAt`,
    `bookmark`.`updatedAt`
  FROM bookmark
  INNER JOIN `link` ON `bookmark`.`link_id` = `link`.`id`
  INNER JOIN `domain` ON `link`.`domain_id` = `domain`.`id`
  WHERE
     `bookmark`.`user_id`     = @user_id
     AND `bookmark`.`link_id` = @link_id
  ;

END