DROP PROCEDURE IF EXISTS list_similar_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_similar_get_all(
  IN $SESSION_ID TEXT,
  IN $LIST_ID INT,
  IN $BOOKMARKS_IDS JSON,
  IN $TAGS_IDS JSON,
  IN $SORT TEXT,
  IN $SIZE INT,
  IN $OFFSET INT
)

BEGIN
  SET $SIZE = IFNULL($SIZE, -1);

  -- Returns a collection of public lists or those where user is member, along with the number of users in each list
SELECT DISTINCT
    `list`.`id`,
    `list`.`name`,
    `list`.`description`,
    `list`.`isPrivate`,
    `list`.`userId`,
    `list`.`createdAt`,
    `list`.`updatedAt`,
    -- Not grouped, return all duplicates
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
      ) AS derivedAlias
    ) AS bookmarksIds,
    (
      SELECT JSON_ARRAYAGG(link_id)
        FROM (
          SELECT
            bookmark.link_id
          FROM bookmark
          INNER JOIN bookmark_list ON bookmark.id = bookmark_list.bookmark_id
          WHERE
            bookmark_list.list_id = list.id
        ) AS derivedAlias
    ) AS linkIds,
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
    ) AS members
    FROM `list`
    INNER JOIN bookmark_list ON bookmark_list.list_id = list.id
    INNER JOIN user_list ON user_list.list_id = list.id
    INNER JOIN bookmark ON bookmark.id = bookmark_list.bookmark_id
    INNER JOIN bookmark_tag ON bookmark_tag.bookmark_id = bookmark.id
    WHERE
      (
        JSON_CONTAINS($BOOKMARKS_IDS, CONVERT(bookmark_list.bookmark_id, CHAR))
        OR
        JSON_CONTAINS($TAGS_IDS, CONVERT(bookmark_tag.tag_id, CHAR))
      )
      AND
        (
          `list`.`isPrivate` IS NOT TRUE
          OR
            (
              `list`.`userId`       = $SESSION_ID
              OR
              `user_list`.`user_id` = $SESSION_ID
            )
        )
    GROUP BY list.id
      ORDER BY
      CASE WHEN $SORT = 'id'           THEN `list`.id      	           ELSE NULL END ASC,
      CASE WHEN $SORT = '-id'          THEN `list`.id      	           ELSE NULL END DESC,
      CASE WHEN $SORT = 'order'        THEN `list`.order      	       ELSE NULL END ASC,
      CASE WHEN $SORT = '-order'       THEN `list`.order      	       ELSE NULL END DESC,
      CASE WHEN $SORT = 'createdAt'    THEN `list`.createdAt	         ELSE NULL END ASC,
      CASE WHEN $SORT = '-createdAt'   THEN `list`.createdAt           ELSE NULL END DESC,
      CASE WHEN $SORT = 'updatedAt'    THEN `list`.updatedAt           ELSE NULL END ASC,
      CASE WHEN $SORT = '-updatedAt'   THEN `list`.updatedAt           ELSE NULL END DESC,
      CASE WHEN $SORT = 'bookmarks'    THEN JSON_LENGTH(bookmarksIds)  ELSE NULL END ASC,
      CASE WHEN $SORT = '-bookmarks'   THEN JSON_LENGTH(bookmarksIds)  ELSE NULL END DESC,
      CASE WHEN $SORT = 'members'      THEN JSON_LENGTH(members)    ELSE NULL END ASC,
      CASE WHEN $SORT = '-members'     THEN JSON_LENGTH(members)    ELSE NULL END DESC
    LIMIT $OFFSET , $SIZE
;

END

/* DELIMITER ;

/* CALL list_similar_get_all("e4e2bb46-c210-4a47-9e84-f45c789fcec1", 1, '[1]', '[9]', NULL, NULL); */