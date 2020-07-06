DROP PROCEDURE IF EXISTS tag_user_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE tag_user_get_all(
  IN tag_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @tag_id = JSON_EXTRACT(tag_data, '$.tagId');

  -- Select user
  SELECT
    `user`.`id`,
    `user`.`name`,
    `user`.`level`,
    `user`.`email`,
    `user`.`status`,
    `user`.`statement`,
    `user`.`location`,
    `user`.`order`,
    `user`.`createdAt`,
    `user`.`updatedAt`
  FROM `user`
  INNER JOIN link_user ON link_user.user_id = user.id
  INNER JOIN link_user_tag ON link_user.id = link_user_tag.link_user_id
  INNER JOIN tag ON link_user_tag.tag_id = tag.id
  WHERE `tag`.`id` = JSON_UNQUOTE(@tag_id)
  GROUP BY user.id;

END