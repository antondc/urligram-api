DROP PROCEDURE IF EXISTS link_users_get_all_public;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_users_get_all_public(
  IN $LINK_ID INT
)

BEGIN

   SELECT
    user.id,
    user.name,
    user.level,
    user.email,
    user.status,
    user.image,
    user.statement,
    user.location,
    user.order,
    user.createdAt,
    user.updatedAt
    FROM bookmark
    INNER JOIN user on user.id = bookmark.user_id
    WHERE
      bookmark.link_id = $LINK_ID
        AND
      bookmark.isPrivate IS NOT TRUE
  ;

END