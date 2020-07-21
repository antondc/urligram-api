DROP PROCEDURE IF EXISTS list_get_all_public;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_get_all_public(
  /* IN data JSON */
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
    WHERE `list`.`isPrivate` != 1
  ;

END