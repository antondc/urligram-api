DROP PROCEDURE IF EXISTS tag_list_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE tag_list_get_all(
  IN $TAG_ID INT
)

BEGIN

   SELECT
    `list`.`id`,
    `list`.`name`,
    `list`.`description`,
    `list`.`isPublic`,
    `list`.`createdAt`,
    `list`.`updatedAt`
    FROM `list`
    JOIN bookmark_list ON bookmark_list.list_id   = list.id
    JOIN bookmark ON bookmark_list.bookmark_id    = bookmark_id
    JOIN bookmark_tag ON bookmark_tag.bookmark_id = bookmark.id
    WHERE bookmark_tag.tag_id                     = $TAG_ID
      AND bookmark.isPublic IS TRUE
      AND list.isPublic IS TRUE
    GROUP BY list.id
  ;

END
