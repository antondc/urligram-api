-- Example CALL
-- CALL user_list_get_all('e4e2bb46-c210-4a47-9e84-f45c789fcec1',"e4e2bb46-c210-4a47-9e84-f45c789fcec1","id",NULL,NULL,'{"role": ["admin","reader","editor"]}');

DROP PROCEDURE IF EXISTS user_list_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_list_get_all(
  IN $USER_ID VARCHAR(40),
  IN $SESSION_ID VARCHAR(40),
  IN $SORT VARCHAR(40),
  IN $SIZE INT,
  IN $OFFSET INT,
  IN $FILTER JSON
)

BEGIN
  SET $SIZE = IFNULL($SIZE, -1);
  SET @filterRole  = JSON_UNQUOTE(JSON_EXTRACT($FILTER, '$.role'));

 SELECT
    list.id,
    list.order,
    list.name,
    list.description,
    list.name,
    user_list.user_id AS userId,
    list.createdAt,
    list.isPrivate,
    IFNULL(
      (
        SELECT
        user_list.userRole
        FROM user_list
        WHERE user_list.list_id = list.id AND user_list.user_id = $USER_ID
      ), "admin"
    ) userRole,
    (
      SELECT
        JSON_ARRAYAGG(bookmark_list.bookmark_id)
      FROM bookmark_list
      WHERE bookmark_list.list_id = list.id
    ) AS bookmarks,
    (
      SELECT
        JSON_ARRAYAGG(user.id)
      FROM user_list
      JOIN `user` ON user.id = user_list.user_id
      WHERE list.id = user_list.list_id
    ) AS members
  FROM `list`
  LEFT JOIN user_list ON user_list.list_id = list.id
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
    AND
    (
      CASE WHEN @filterRole IS NOT NULL AND JSON_CONTAINS(@filterRole, JSON_QUOTE("admin")) THEN list.userId = $USER_ID END
      OR
      CASE WHEN @filterRole IS NOT NULL THEN JSON_CONTAINS(@filterRole, JSON_QUOTE(user_list.userRole)) AND user_list.user_id = $USER_ID END
      OR CASE WHEN @filterRole IS NULL THEN TRUE END
    )
  GROUP BY list.id
  ORDER BY
    CASE WHEN $SORT = 'id'                              THEN `list`.id      	          ELSE NULL END ASC,
    CASE WHEN $SORT = '-id'                             THEN `list`.id      	          ELSE NULL END DESC,
    CASE WHEN $SORT = 'order'                           THEN `list`.order      	        ELSE NULL END ASC,
    CASE WHEN $SORT = '-order'                          THEN `list`.order      	        ELSE NULL END DESC,
    CASE WHEN $SORT = 'createdAt'                       THEN `list`.createdAt	          ELSE NULL END ASC,
    CASE WHEN $SORT = '-createdAt'                      THEN `list`.createdAt           ELSE NULL END DESC,
    CASE WHEN $SORT = 'updatedAt'                       THEN `list`.updatedAt           ELSE NULL END ASC,
    CASE WHEN $SORT = '-updatedAt'                      THEN `list`.updatedAt           ELSE NULL END DESC,
    CASE WHEN $SORT = 'bookmarks'                       THEN JSON_LENGTH(bookmarks)     ELSE NULL END ASC,
    CASE WHEN $SORT = '-bookmarks'                      THEN JSON_LENGTH(bookmarks)     ELSE NULL END DESC,
    CASE WHEN $SORT = 'members'                       THEN JSON_LENGTH(members)         ELSE NULL END ASC,
    CASE WHEN $SORT = '-members'                      THEN JSON_LENGTH(members)         ELSE NULL END DESC,
    CASE WHEN $SORT != 'order' AND $SORT != '-order'    THEN `list`.order               ELSE NULL END ASC
  LIMIT $OFFSET , $SIZE
  ;

END