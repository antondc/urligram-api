DROP PROCEDURE IF EXISTS user_bookmark_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_bookmark_get_one(
    IN data JSON
)

BEGIN

  -- Retrieve values from JSON
  SET @bookmark_id  = JSON_UNQUOTE(JSON_EXTRACT(data, '$.bookmarkId'));
  SET @user_id      = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));
  SET @link_id      = JSON_UNQUOTE(JSON_EXTRACT(data, '$.linkId'));
  SET @path         = JSON_UNQUOTE(JSON_EXTRACT(data, '$.path'));
  SET @domain       = JSON_UNQUOTE(JSON_EXTRACT(data, '$.domain'));

  SELECT
    `bookmark`.`id`,
    `bookmark`.`order`,
    CONCAT(domain.domain, link.path) AS url,
    `bookmark`.`link_id` AS linkId,
    `link`.`favicon`,
    `bookmark`.`isPrivate`,
    `bookmark`.`saved`,
    `bookmark`.`createdAt`,
    `bookmark`.`updatedAt`,
    (
      SELECT
        IF(
          COUNT(tag.id) = 0,
          JSON_ARRAY(),
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', tag.id,
              'name', tag.name
            )
          )
        )
      FROM `bookmark_tag`
      JOIN `tag`
      ON `bookmark_tag`.`tag_id` = `tag`.`id`
      WHERE `bookmark`.`id` = `bookmark_tag`.`bookmark_id`
    ) AS tags,
    -- Returns only public lists or those where user is in
    -- Unsorted
    (
      SELECT
        CAST(
          CONCAT('[',
            GROUP_CONCAT(
              DISTINCT JSON_OBJECT(
                'id', `list`.`id`,
                'name', `list`.`name`
              ) SEPARATOR ','
          ), ']'
        ) AS JSON
      ) AS lists
      FROM `bookmark_list`
      JOIN `list` ON `bookmark_list`.`list_id` = `list`.`id`
      JOIN `user_list` ON `user_list`.`list_id` = `list`.`id`
      WHERE `bookmark`.`id` = `bookmark_list`.`bookmark_id` AND (`list`.`isPrivate` != 1 OR `user_list`.`user_id` = @user_id)
    ) AS lists,
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
    `bookmark`.`id`             = @bookmark_id
    OR (
     `bookmark`.`user_id`       = @user_id
     AND `bookmark`.`link_id`   = @link_id
    )
    OR (
      `bookmark`.`user_id`      = @user_id
      AND
      `link`.`path`             = @path
      AND
      `domain`.`domain`         = @domain
    );

END