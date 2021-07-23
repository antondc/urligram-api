DROP PROCEDURE IF EXISTS list_get_all;

-- DELIMITER $$

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_get_all(
  IN $SESSION_ID TEXT,
  IN $SORT TEXT,
  IN $SIZE INT,
  IN $OFFSET INT,
  IN $FILTER JSON
)

BEGIN
  SET $SIZE = IFNULL($SIZE, -1);
  SET @filterTags  = JSON_UNQUOTE(JSON_EXTRACT($FILTER, '$.tags'));

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
    ) AS bookmarksIds,
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
    LEFT JOIN user_list   ON `list`.id = user_list.list_id
    WHERE
      `list`.`isPrivate` IS NOT TRUE
      OR `list`.`userId`       = $SESSION_ID
      OR `user_list`.`user_id` = $SESSION_ID
    GROUP BY list.id
    HAVING
      (
        CASE WHEN @filterTags IS NOT NULL AND JSON_CONTAINS(UPPER(JSON_EXTRACT(tags, '$[*].name')), UPPER(@filterTags)) THEN TRUE END
        OR
        CASE WHEN @filterTags IS NULL THEN TRUE END
      )
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

-- CALL list_get_all('e4e2bb46-c210-4a47-9e84-f45c789fcec1', '-members', NULL, NULL, '{"tags": ["wishlist"]}');