DROP PROCEDURE IF EXISTS link_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_get_one(
  IN data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @link_id  = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.linkId'));
  SET @user_id  = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.userId'));
  SET @path     = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.path'));
  SET @domain   = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.domain'));

  -- Returns «links» with tags used in public bookmarks or bookmarked by the user, public bookmarks or owned by the user, and users that bookmarked it as public, or own user
  SELECT
    link.id,
    CONCAT(domain.domain, link.path) AS url,
    (
      SELECT
        IF(
          COUNT(tag.id) = 0,
          JSON_ARRAY(),
          CAST(
            CONCAT('[',
              GROUP_CONCAT(
                DISTINCT JSON_OBJECT(
                  'id', tag.id,
                  'name', tag.name
                ) SEPARATOR ','
              ), ']'
            ) AS JSON
          )
        ) AS tags
        FROM bookmark_tag
        JOIN `tag` ON tag.id = bookmark_tag.tag_id
        JOIN `bookmark` ON bookmark.id = bookmark_tag.bookmark_id
        WHERE bookmark.link_id = link.id
        AND (
          bookmark.isPrivate != TRUE
          OR bookmark.user_id = @user_id
        )
      ) AS tags,
    (
      SELECT
      IF(
        COUNT(user.id) = 0,
        JSON_ARRAY(),
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', `user`.`id`,
            'name', `user`.`name`,
            'isPrivate', `bookmark`.`isPrivate`
          )
        )
      )
      FROM `bookmark`
      JOIN USER ON bookmark.user_id = user.id
      WHERE bookmark.link_id = link.id
      AND (
        bookmark.isPrivate != TRUE
        OR bookmark.user_id = @user_id
      )
    ) AS users,
    (
      SELECT
        IF(
          COUNT(bookmark.id) = 0,
          JSON_ARRAY(),
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', `bookmark`.`id`
            )
          )
        )
      FROM `bookmark`
      WHERE bookmark.link_id = link.id
      AND (
        bookmark.isPrivate != TRUE
        OR bookmark.user_id = @user_id
      )
    ) AS bookmarks
  FROM link
  INNER JOIN domain ON link.domain_id = domain.id
  WHERE
    link.id = @link_id
    OR (
      link.path = @path
      AND
      domain.domain = @domain
    );


END