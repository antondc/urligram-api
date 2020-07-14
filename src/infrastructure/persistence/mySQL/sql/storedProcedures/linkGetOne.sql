DROP PROCEDURE IF EXISTS link_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_get_one(
  IN link_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @id = JSON_EXTRACT(link_data, '$.id');
  SET @user_id = JSON_EXTRACT(link_data, '$.userId');
  SET @path = JSON_EXTRACT(link_data, '$.path');
  SET @domain = JSON_EXTRACT(link_data, '$.domain');

  SELECT
    link.id,
    CONCAT(domain.domain, link.path) AS url,
    (
      SELECT
        CAST(
          CONCAT('[',
            GROUP_CONCAT(
              DISTINCT JSON_OBJECT(
                'id', tag.id,
                'name', tag.name
              ) SEPARATOR ','
          ), ']'
          ) AS JSON
        ) AS tags
      FROM link_user_tag
      JOIN `tag` ON tag.id = link_user_tag.tag_id
      JOIN `link_user` ON link_user.id = link_user_tag.link_user_id
      WHERE link_user.link_id = link.id
    ) AS tags,
    (
      SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', `user`.`id`,
            'name', `user`.`name`,
            'isPrivate', `link_user`.`isPrivate`
          )
        )
      FROM `link_user`
      JOIN USER ON link_user.user_id = user.id
      WHERE link_user.link_id = link.id
    ) AS users
  FROM link
  INNER JOIN domain ON link.domain_id = domain.id
  WHERE
    link.id = JSON_UNQUOTE(@id)
    OR (
      link.path = JSON_UNQUOTE(@path)
      AND
      domain.domain = JSON_UNQUOTE(@domain)
    );

END