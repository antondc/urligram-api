DROP PROCEDURE IF EXISTS list_user_get_one_by_list_id;

-- DELIMITER $$

CREATE PROCEDURE list_user_get_one_by_list_id(
  IN $USER_ID TEXT,
  IN $LIST_ID TEXT
)

BEGIN

 SELECT

  IFNULL(user.id, user2.id) AS `id`,
  IFNULL(user.name, user2.name) AS `name`,
  IFNULL(user.level, user2.level) AS `level`,
  IFNULL(user.accountType, user2.accountType) AS `accountType`,
  IFNULL(user.image, user2.image) AS `image`,
  IFNULL(user.status, user2.status) AS `status`,
  IFNULL(user.statement, user2.statement) AS `statement`,
  IFNULL(user.location, user2.location) AS `location`,
  IFNULL(user.order, user2.order) AS `order`,
  IFNULL(user.createdAt, user2.createdAt) AS `createdAt`,
  IFNULL(user.updatedAt, user2.updatedAt) AS `updatedAt`,
  IF(user.id IS NULL, user_list.userRole, "admin") AS `userRole`,
  IF(user.id IS NULL, user_list.userListStatus, "active") AS `userListStatus`
  FROM `list`
  LEFT JOIN `user` ON user.id = list.userId AND list.userId = $USER_ID
  LEFT JOIN `user_list` ON list.id = user_list.list_id AND user_list.list_id = $LIST_ID AND user_list.user_id = $USER_ID
  LEFT JOIN `user` user2 ON user_list.user_id = user2.id
  WHERE
    (
      list.id = $LIST_ID
      AND
      list.userId = $USER_ID
    )
    OR
    (
      list.id = $LIST_ID
      AND
      user_list.user_id = $USER_ID
    )
  ;

END

-- DELIMITER ;

/* CALL list_user_get_one_by_list_id("e4e2bb46-c210-4a47-9e84-f45c789fcec1", 8) */
