DROP PROCEDURE IF EXISTS bookmark_list_get_all;

-- Stored procedure to insert post and lists
CREATE PROCEDURE bookmark_list_get_all(
  IN $BOOKMARK_ID INT
)

BEGIN

  -- Return lists where a bookmark is in
  SELECT
    list.id,
    list.name,
    list.description,
    list.isPrivate,
    list.userId,
    list.createdAt,
    list.updatedAt,
    (
      SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', user.id,
            'name', user.name
          )
        )
      FROM user_list
      JOIN `user` ON user.id = user_list.user_id
      WHERE list.id = user_list.list_id
    ) AS users
  FROM `list`
  JOIN bookmark_list ON bookmark_list.list_id = list.id
  WHERE bookmark_list.bookmark_id = $BOOKMARK_ID
  ORDER BY list.id
  ;


END