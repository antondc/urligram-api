DROP PROCEDURE IF EXISTS list_user_get_one_by_list_id;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_user_get_one_by_list_id(
  IN $USER_ID TEXT,
  IN $LIST_ID INT
)

BEGIN

 SELECT
    user.id,
    user.name,
    user.level,
    user.email,
    user.status,
    user.statement,
    user.location,
    user.order,
    user.createdAt,
    user.updatedAt,
    IFNULL(user_list.userRole, "admin") AS userRole,
    IFNULL(user_list.userListStatus, "active") AS userListStatus
  FROM `user`
  LEFT JOIN user_list ON user_list.user_id = `user`.id AND `user_list`.list_id = $LIST_ID
  LEFT JOIN `list` ON user.id = list.userId AND `list`.id = $LIST_ID
  WHERE
    (
      user_list.list_id      = $LIST_ID
      AND user_list.user_id  = $USER_ID
    )
    OR
    (
      list.id               = $LIST_ID
      AND list.userId       = $USER_ID
    )
  ;

END