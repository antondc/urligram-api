DROP PROCEDURE IF EXISTS link_list_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_list_get_all(
  IN data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @link_id  = JSON_UNQUOTE(JSON_EXTRACT(data, '$.linkId'));
  SET @user_id  = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));

 -- Returns a list if the list is public, or either the user is owner of the list or a participant
   SELECT
    `list`.`id`,
    `list`.`name`
    FROM `list`
      JOIN user_list ON list.id = user_list.list_id
      JOIN bookmark_list ON bookmark_list.list_id = list.id
      JOIN bookmark ON bookmark_list.bookmark_id = bookmark.id
    WHERE
      (
        -- Select when list is public, user is owner of the list or user is within the list
        `list`.`isPrivate` IS NOT TRUE
        OR list.userId = @user_id
        OR user_list.user_id =  @user_id
      )
      AND (
        bookmark.isPrivate IS NOT TRUE
        OR  bookmark.user_id = @user_id
      )
      AND bookmark.link_id = @link_id
  ;

END