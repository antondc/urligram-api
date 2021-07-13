DROP PROCEDURE IF EXISTS user_list_get_all;

-- DELIMITER $$

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
  SET @filterListName  = JSON_UNQUOTE(JSON_EXTRACT($FILTER, '$.lists'));
  SET @filterTags  = JSON_UNQUOTE(JSON_EXTRACT($FILTER, '$.tags'));

 SELECT
    count(*) OVER() as totalItems,
    list.id,
    list.order,
    list.name,
    list.description,
    list.name,
    list.userId,
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
    IFNULL(
      (
        SELECT
        user_list.userListStatus
        FROM user_list
        WHERE user_list.list_id = list.id AND user_list.user_id = $USER_ID
      ), "active"
    ) userListStatus,
    (
      SELECT
        IF(COUNT(bookmark_list.bookmark_id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(bookmark_list.bookmark_id))
      FROM bookmark_list
      WHERE bookmark_list.list_id = list.id
    ) AS bookmarksIds,
    (
      SELECT
        IF(
          COUNT(`user`.id) = 0,
          NULL,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', `user`.`id`,
              'userRole', `user_list`.`userRole`,
              'userListStatus', `user_list`.`userListStatus`
            )
          )
        )
      FROM user_list
      INNER JOIN `user` ON `user`.`id` = user_list.user_id
      WHERE user_list.list_id = list.id
    ) AS members,
    (
      SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', tag.id,
            'name', tag.name,
            'count', tag.count
          )
        )
      FROM
        (
          SELECT DISTINCT
          subTag.id,
          subTag.name,
          COUNT(bookmark.id) as count
          FROM tag as subTag
          JOIN bookmark_tag ON bookmark_tag.tag_id = subTag.id
          JOIN bookmark ON bookmark.id = bookmark_tag.bookmark_id
          JOIN bookmark_list ON bookmark_list.bookmark_id = bookmark.id
          WHERE bookmark_list.list_id = `list`.id
          AND
            (
              bookmark.isPrivate IS NOT TRUE
              OR
              bookmark.user_id = $SESSION_ID
            )
          GROUP BY subTag.id
          ORDER BY count DESC
        ) as tag
    ) AS tags
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
        list.userId = $SESSION_ID AND $SESSION_ID = $USER_ID
        OR
        user_list.user_id = $SESSION_ID AND $SESSION_ID = $USER_ID
      )
    )
    AND
    (
      CASE WHEN @filterRole IS NOT NULL AND JSON_CONTAINS(@filterRole, JSON_QUOTE("admin")) THEN list.userId = $USER_ID END
      OR
      CASE WHEN @filterRole IS NOT NULL THEN JSON_CONTAINS(@filterRole, JSON_QUOTE(user_list.userRole)) AND user_list.user_id = $USER_ID END
      OR CASE WHEN @filterRole IS NULL THEN TRUE END
    )
    AND
    (
      -- Case for only one name string, useful to search from partial strings with LIKE
      -- Convert(x USING uft8 removes the tildes)
      CASE WHEN @filterListName IS NOT NULL THEN UPPER(list.name) LIKE UPPER(CONCAT('%', CONVERT(JSON_UNQUOTE(JSON_EXTRACT(@filterListName, '$[0]')) USING utf8), '%')) END
      -- Case for many lists, useful to search for full list names/
      OR CASE WHEN @filterListName IS NOT NULL AND JSON_CONTAINS(@filterListName, JSON_QUOTE(list.name)) THEN TRUE END
      OR CASE WHEN @filterListName IS NULL THEN TRUE END
    )
  GROUP BY list.id
  HAVING
    (
      CASE WHEN @filterTags IS NOT NULL AND JSON_CONTAINS(UPPER(JSON_EXTRACT(tags, '$[*].name')), UPPER(@filterTags)) THEN TRUE END
      OR
      CASE WHEN @filterTags IS NULL THEN TRUE END
    )
  ORDER BY
    CASE WHEN $SORT = 'id'          THEN `list`.id      	          ELSE NULL END ASC,
    CASE WHEN $SORT = '-id'         THEN `list`.id      	          ELSE NULL END DESC,
    CASE WHEN $SORT = 'order'       THEN `list`.order      	        ELSE NULL END ASC,
    CASE WHEN $SORT = '-order'      THEN `list`.order      	        ELSE NULL END DESC,
    CASE WHEN $SORT = 'createdAt'   THEN `list`.createdAt	          ELSE NULL END ASC,
    CASE WHEN $SORT = '-createdAt'  THEN `list`.createdAt           ELSE NULL END DESC,
    CASE WHEN $SORT = 'updatedAt'   THEN `list`.updatedAt           ELSE NULL END ASC,
    CASE WHEN $SORT = '-updatedAt'  THEN `list`.updatedAt           ELSE NULL END DESC,
    CASE WHEN $SORT = 'bookmarks'   THEN JSON_LENGTH(bookmarksIds)  ELSE NULL END ASC,
    CASE WHEN $SORT = '-bookmarks'  THEN JSON_LENGTH(bookmarksIds)  ELSE NULL END DESC,
    CASE WHEN $SORT = 'members'     THEN JSON_LENGTH(members)       ELSE NULL END ASC,
    CASE WHEN $SORT = '-members'    THEN JSON_LENGTH(members)       ELSE NULL END DESC,
    CASE WHEN $SORT IS NULL         THEN `list`.id                  ELSE NULL END ASC
  LIMIT $OFFSET , $SIZE
  ;

END

-- DELIMITER ;

-- CALL user_list_get_all('e4e2bb46-c210-4a47-9e84-f45c789fcec1', "e4e2bb46-c210-4a47-9e84-f45c789fcec1", NULL, NULL,  NULL, NULL);