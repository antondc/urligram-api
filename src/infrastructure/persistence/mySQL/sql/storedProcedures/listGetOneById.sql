DROP PROCEDURE IF EXISTS list_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_get_one(
  IN LIST_ID INT
)

BEGIN

  -- Returns a list if the list is public, or either the user is owner of the list or a participant
   SELECT
    `list`.`id`,
    `list`.`name`,
    `list`.`description`,
    `list`.`isPrivate`,
    `list`.`createdAt`,
    `list`.`updatedAt`
    FROM `list`
    LEFT JOIN user_list ON list.id = user_list.list_id
    WHERE `list`.`id` = LIST_ID
    GROUP BY list.id
  ;

END