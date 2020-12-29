DROP PROCEDURE IF EXISTS user_bookmark_get_one_by_user_path_domain;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_bookmark_get_one_by_user_path_domain(
    IN data JSON
)

BEGIN

  -- Retrieve values from JSON
  SET @user_id      = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));
  SET @path         = JSON_UNQUOTE(JSON_EXTRACT(data, '$.path'));
  SET @domain       = JSON_UNQUOTE(JSON_EXTRACT(data, '$.domain'));

  SELECT
    `bookmark`.`id`,
    `bookmark`.`order`,
    CONCAT(domain.domain, link.path) AS url,
    `bookmark`.`link_id` AS linkId,
    `bookmark`.`isPrivate`,
    `bookmark`.`saved`,
    `bookmark`.`createdAt`,
    `bookmark`.`updatedAt`
  FROM bookmark
  INNER JOIN `link` ON `bookmark`.`link_id` = `link`.`id`
  INNER JOIN `domain` ON `link`.`domain_id` = `domain`.`id`
  WHERE
    `bookmark`.`user_id`      = @user_id
    AND `link`.`path`         = @path
    AND `domain`.`domain`     = @domain
  ;

END