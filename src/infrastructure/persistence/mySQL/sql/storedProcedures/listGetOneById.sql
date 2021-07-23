DROP PROCEDURE IF EXISTS list_get_one;

-- DELIMITER $$

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_get_one(
  IN $LIST_ID INT,
  IN $SESSION_ID INT
)

BEGIN

  -- Returns a list if the list is public, or either the user is owner of the list or a participant
   SELECT
    `list`.`id`,
    `list`.`name`,
    `list`.`description`,
    `list`.`userId`,
    `list`.`isPrivate`,
    `list`.`createdAt`,
    `list`.`updatedAt`,
    list_bookmark_user.viewPending AS contentPending,
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
            'id', subQuery.id,
            'name', subQuery.name
          )
        )
      FROM (
        SELECT DISTINCT
          tag.id,
          tag.name
        FROM tag
        JOIN bookmark_tag ON bookmark_tag.tag_id = tag.id
        JOIN bookmark ON bookmark.id = bookmark_tag.bookmark_id
        JOIN bookmark_list ON bookmark_list.bookmark_id = bookmark.id
        WHERE bookmark_list.list_id = $LIST_ID
      ) subQuery
    ) AS tags,
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
    ) AS bookmarksIds
    FROM `list`
    LEFT JOIN user_list ON list.id = user_list.list_id
    LEFT JOIN list_bookmark_user ON
      list_bookmark_user.list_id = $LIST_ID
      AND
      list_bookmark_user.user_id = $SESSION_ID
      AND
      list_bookmark_user.viewPending = TRUE
    WHERE
      `list`.`id` = $LIST_ID
      AND
      (
        `list`.isPrivate IS NOT TRUE
        OR
        `list`.`userId` = $SESSION_ID
        OR
        $SESSION_ID IN(user_list.user_id)
      )
    GROUP BY list.id
  ;

END

-- DELIMITER ;

-- CALL list_get_one(1, "e4e2bb46-c210-4a47-9e84-f45c789fcec1");