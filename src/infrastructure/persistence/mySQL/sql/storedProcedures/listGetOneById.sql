DROP PROCEDURE IF EXISTS list_get_one;

/* DELIMITER $$ */

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
    (
      SELECT
        IF(
          COUNT(`user`.id) = 0,
          NULL,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', `user`.`id`,
              'userRole', `user_list`.`userRole`
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
    (
      SELECT
      JSON_ARRAYAGG(bookmark_list.bookmark_id)
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
    ) AS bookmarksIds

    FROM `list`
    LEFT JOIN user_list ON list.id = user_list.list_id
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

/* DELIMITER ;

CALL list_get_one(1, "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000"); */