DROP PROCEDURE IF EXISTS list_user_get_one_by_list_name;

-- DELIMITER $$

CREATE PROCEDURE list_user_get_one_by_list_name(
  IN $USER_ID TEXT,
  IN $LIST_NAME TEXT
)

BEGIN

 SELECT
  IFNULL(user.id, user2.id) AS `id`,
  IFNULL(user.name, user2.name) AS `name`,
  IFNULL(user.level, user2.level) AS `level`,
  IFNULL(user.email, user2.email) AS `email`,
  IFNULL(user.status, user2.status) AS `status`,
  IFNULL(user.statement, user2.statement) AS `statement`,
  IFNULL(user.location, user2.location) AS `location`,
  IFNULL(user.order, user2.order) AS `order`,
  IFNULL(user.createdAt, user2.createdAt) AS `createdAt`,
  IFNULL(user.updatedAt, user2.updatedAt) AS `updatedAt`,
  IF(user.id IS NULL, user_list.userRole, "admin") AS `userRole`,
  user_list.userListStatus AS userListStatus

  FROM `list`
  LEFT JOIN `user` ON user.id = list.userId AND list.userId = $USER_ID
  LEFT JOIN user_list ON user_list.list_id = `list`.id AND user_list.user_id = $USER_ID
  LEFT JOIN `list` list2 ON list2.id = user_list.list_id
  LEFT JOIN `user` user2 ON list2.userId = user2.id
  WHERE
    (
      CONVERT(UPPER(list.name) USING utf8) = CONVERT(UPPER($LIST_NAME) USING utf8)
      AND
      list.userId = $USER_ID
    )
    OR
    (
      CONVERT(UPPER(list2.name) USING utf8) = CONVERT(UPPER($LIST_NAME) USING utf8)
      AND
      user_list.user_id = $USER_ID
    )
  ;

END

-- DELIMITER ;

-- CALL list_user_get_one_by_list_name("e4e2bb46-c210-4a47-9e84-f45c789fcec1", "Politica")