DROP PROCEDURE IF EXISTS user_list_get_all_public;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_list_get_all_public(
  IN $USER_ID VARCHAR(40),
  IN $SESSION_ID VARCHAR(40),
  IN $SORT VARCHAR(40),
  IN $SIZE INT,
  IN $OFFSET INT
)

BEGIN

  SELECT
    list.id,
    list.order,
    list.name,
    list.description,
    list.name,
    user_list.userRole,
    user.id AS userId,
    list.createdAt,
    list.isPrivate,
    user_list.userRole,
    (
      SELECT
        JSON_ARRAYAGG(
          bookmark_list.bookmark_id
        )
      FROM bookmark_list
      WHERE bookmark_list.list_id = list.id
    ) AS bookmarks
  FROM `list`
  INNER JOIN user_list ON user_list.list_id = list.id
  INNER JOIN `user` ON user_list.user_id = user.id
  WHERE
      (
        list.userId = $USER_ID
        OR
        user_list.user_id = $USER_ID
      )
      AND
      (
        list.isPrivate IS NOT TRUE
        OR
          (
            list.userId = $SESSION_ID
            OR
            user_list.user_id = $SESSION_ID
          )
      )
    GROUP BY list.id
      ORDER BY
      CASE WHEN $SORT = 'id'          THEN `list`.id      	        ELSE NULL END ASC,
      CASE WHEN $SORT = '-id'         THEN `list`.id      	        ELSE NULL END DESC,
      CASE WHEN $SORT = 'order'       THEN `list`.order      	        ELSE NULL END ASC,
      CASE WHEN $SORT = '-order'      THEN `list`.order      	        ELSE NULL END DESC,
      CASE WHEN $SORT = 'createdAt'   THEN `list`.createdAt	        ELSE NULL END ASC,
      CASE WHEN $SORT = '-createdAt'  THEN `list`.createdAt         ELSE NULL END DESC,
      CASE WHEN $SORT = 'updatedAt'   THEN `list`.updatedAt         ELSE NULL END ASC,
      CASE WHEN $SORT = '-updatedAt'  THEN `list`.updatedAt         ELSE NULL END DESC,
      CASE WHEN $SORT = 'bookmarks'   THEN JSON_LENGTH(bookmarks)         ELSE NULL END ASC,
      CASE WHEN $SORT = '-bookmarks'  THEN JSON_LENGTH(bookmarks)         ELSE NULL END DESC,
      CASE WHEN $SORT != 'order' AND $SORT != '-order'      THEN `user`.order        ELSE NULL END ASC
    LIMIT $OFFSET , $SIZE
  ;

END