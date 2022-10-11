DROP PROCEDURE IF EXISTS link_users_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_users_get_all(
  IN $SESSION_ID VARCHAR(40),
  IN $LINK_ID INT
)

BEGIN

  SELECT
    `user`.`id`
  FROM bookmark
  INNER JOIN `user` ON `user`.`id` = bookmark.user_id
  WHERE
    bookmark.link_id = $LINK_ID
    AND
      (
          bookmark.isPrivate IS NOT TRUE
        OR
          bookmark.user_id = $SESSION_ID
      )
  ;

END