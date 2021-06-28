DROP PROCEDURE IF EXISTS list_get_all;

-- DELIMITER $$

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_get_all(
  IN $SESSION_ID TEXT,
  IN $SORT TEXT,
  IN $SIZE INT,
  IN $OFFSET INT
)

BEGIN
  SET $SIZE = IFNULL($SIZE, -1);

  -- Returns a collection of public lists or those where user is member, along with the number of users in each list
SELECT
    count(*) OVER() as totalItems,
    `list`.`id`,
    `list`.`name`,
    `list`.`description`,
    `list`.`isPrivate`,
    `list`.`userId`,
    `list`.`createdAt`,
    `list`.`updatedAt`,
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
      SELECT JSON_ARRAYAGG(bookmark_id)
      FROM (
        SELECT
          bookmark_list.bookmark_id
        FROM bookmark_list
        INNER JOIN bookmark ON bookmark.id = bookmark_list.bookmark_id
        WHERE
          bookmark_list.list_id = list.id
          -- If list is public, only return public bookmarks
          -- if list is private, return private bookmarks as well
          AND
          (
            (
              bookmark.isPrivate IS NOT TRUE
              AND
              bookmark.isPrivate IS NOT TRUE
            )
            OR
            (
              bookmark.isPrivate IS TRUE
              AND
              list.isPrivate IS TRUE
            )
          )
        GROUP BY bookmark.link_id
      ) AS derivedAlias
    ) AS bookmarksIds
    FROM `list`
    LEFT JOIN user_list   ON `list`.id = user_list.list_id
    WHERE
      `list`.`isPrivate` IS NOT TRUE
      OR `list`.`userId`       = $SESSION_ID
      OR `user_list`.`user_id` = $SESSION_ID
    GROUP BY list.id
      ORDER BY
      CASE WHEN $SORT = 'id'          THEN `list`.id      	         ELSE NULL END ASC,
      CASE WHEN $SORT = '-id'         THEN `list`.id      	         ELSE NULL END DESC,
      CASE WHEN $SORT = 'createdAt'   THEN `list`.createdAt	         ELSE NULL END ASC,
      CASE WHEN $SORT = '-createdAt'  THEN `list`.createdAt          ELSE NULL END DESC,
      CASE WHEN $SORT = 'updatedAt'   THEN `list`.updatedAt          ELSE NULL END ASC,
      CASE WHEN $SORT = '-updatedAt'  THEN `list`.updatedAt          ELSE NULL END DESC,
      CASE WHEN $SORT = "members"     THEN JSON_LENGTH(members) 	 ELSE NULL END ASC,
      CASE WHEN $SORT = "-members"    THEN JSON_LENGTH(members) 	 ELSE NULL END DESC,
      CASE WHEN $SORT = "bookmarks"   THEN JSON_LENGTH(bookmarksIds) ELSE NULL END ASC,
      CASE WHEN $SORT = "-bookmarks"  THEN JSON_LENGTH(bookmarksIds) ELSE NULL END DESC,
      CASE WHEN $SORT IS NULL         THEN `list`.id                 ELSE NULL END ASC

    LIMIT $OFFSET , $SIZE
  ;

END

-- DELIMITER ;

-- CALL list_get_all('e4e2bb46-c210-4a47-9e84-f45c789fcec1', '-members', NULL, NULL);