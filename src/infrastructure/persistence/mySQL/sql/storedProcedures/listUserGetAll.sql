DROP PROCEDURE IF EXISTS list_user_get_all;

-- DELIMITER $$

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_get_all(
  IN $SESSION_ID TEXT,
  IN $LIST_ID INT
)

BEGIN

 SELECT
    user.id,
    user.name,
    user.accountType,
    user.level,
    user.status,
    user.image,
    user.statement,
    user.location,
    user.order,
    user.createdAt,
    user.updatedAt,
    user_list.userRole,
    user_list.userListStatus
  FROM `user`
  INNER JOIN user_list ON user_list.user_id = user.id
  INNER JOIN list ON user_list.list_id = list.id
  WHERE
    user_list.list_id           = $LIST_ID
    AND
    -- Return users in list if list is not private
    -- or $SESSION_ID is within user_list for this list id
    (
      list.isPublic IS TRUE
      OR
      list.userId = $SESSION_ID
      OR $SESSION_ID IN (
        SELECT user_id
        FROM user_list
        WHERE list_id = $LIST_ID
      )
    );

END

-- DELIMITER ;

-- CALL list_user_get_all("11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000", 1); */
