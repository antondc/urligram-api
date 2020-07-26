DROP PROCEDURE IF EXISTS tag_list_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE tag_list_get_all(
  IN data JSON
)

BEGIN

  SET @tag_id    = JSON_UNQUOTE(JSON_EXTRACT(data, '$.tagId'));

  -- Returns a list if the list is public, or either the user is owner of the list or a participant
   SELECT
    `list`.`id`,
    `list`.`name`,
    `list`.`description`,
    `list`.`isPrivate`,
    `list`.`createdAt`,
    `list`.`updatedAt`
    FROM `list`
    JOIN bookmark_list ON bookmark_list.list_id   = list.id
    JOIN bookmark ON bookmark_list.bookmark_id    = bookmark_id
    JOIN bookmark_tag ON bookmark_tag.bookmark_id = bookmark.id
    WHERE bookmark_tag.tag_id                     = @tag_id
      AND bookmark.isPrivate IS NOT TRUE
      AND list.isPrivate IS NOT TRUE
    GROUP BY list.id
  ;

END