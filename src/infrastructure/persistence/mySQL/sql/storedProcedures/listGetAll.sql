DROP PROCEDURE IF EXISTS list_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_get_all(
  IN data JSON
)

BEGIN

  -- Retrieve values from JSON
  SET @user_id        = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.userId'));

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
    WHERE
      (
        `list`.`isPrivate` != 1
      )
    OR (
        `list`.`isPrivate` = 1
        AND `user_list`.`user_id` IN (
          SELECT
            `user_list`.`user_id`
          FROM `user_list`
          WHERE user_list.user_id = @user_id
        )
      )
    OR (
      `list`.`isPrivate` = 1
      AND list.userId        = @user_id
    )
  ;

END