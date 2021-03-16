DROP PROCEDURE IF EXISTS link_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_get_one(
  IN $LINK_ID INT,
  IN $USER_ID VARCHAR(40),
  IN $URL_PATH TEXT,
  IN $URL_DOMAIN TEXT
)

BEGIN

  -- Returns «links» with tags used in public bookmarks or bookmarked by the user, public bookmarks or owned by the user, and users that bookmarked it as public, or own user
  SELECT
    link.id,
    link.title,
    link.image as img,
    link.description,
    link.language,
    link.favicon,
    link.order,
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
          OR bookmark.user_id = $USER_ID
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
      JOIN user ON bookmark.user_id = user.id
      WHERE bookmark.link_id = link.id
      AND (
        bookmark.isPrivate != TRUE
        OR bookmark.user_id = $USER_ID
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
        OR bookmark.user_id = $USER_ID
      )
    ) AS bookmarks
  FROM link
  INNER JOIN domain ON link.domain_id = domain.id
  WHERE
    link.id = $LINK_ID
    OR (
      link.path = $URL_PATH
      AND
      domain.domain = $URL_DOMAIN
    );


END