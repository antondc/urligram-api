DROP PROCEDURE IF EXISTS list_get_one;

-- DELIMITER $$

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
    `list`.`isPublic`,
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
        INNER JOIN bookmark     ON bookmark.id = bookmark_list.bookmark_id
        INNER JOIN list subList ON subList.id     = bookmark_list.list_id
        WHERE
          bookmark_list.list_id = $LIST_ID
      ) AS derivedAlias
    ) AS bookmarksIds,
        -- Not grouped, return all duplicates
    (
      SELECT JSON_ARRAYAGG(link_id)
        FROM (
          SELECT
            bookmark.link_id
          FROM bookmark
          INNER JOIN bookmark_list ON bookmark.id = bookmark_list.bookmark_id
          WHERE
            bookmark_list.list_id = $LIST_ID
        ) AS derivedAlias
    ) AS linkIds
    FROM `list`
    LEFT JOIN user_list ON list.id = user_list.list_id
    WHERE
      `list`.`id` = $LIST_ID
      AND
      (
        `list`.isPublic IS TRUE
        OR
        `list`.`userId` = $SESSION_ID
        OR
        $SESSION_ID IN(user_list.user_id)
      )
    GROUP BY list.id
  ;

END

-- DELIMITER ;

-- CALL list_get_one(27, "b95274c9-3d26-4ce3-98b2-77dce5bd7aae", "2387463876");
