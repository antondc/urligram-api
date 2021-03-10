DROP PROCEDURE IF EXISTS user_get_all;

/* DELIMITER $$ */

CREATE PROCEDURE user_get_all(
  IN $SESSION_ID VARCHAR(40),
  IN $SORT VARCHAR(40),
  IN $SIZE INT,
  IN $OFFSET INT,
  IN $FILTER JSON
)

BEGIN

  SET $SIZE = IFNULL($SIZE, -1);
  SET @filterName  = JSON_UNQUOTE(JSON_EXTRACT($FILTER, '$.name'));

  SELECT
    count(*) OVER() as totalItems,
    `user`.`id`,
    `user`.`order`,
    `user`.`name`,
    `user`.`level`,
    `user`.`email`,
    `user`.`image`,
    `user`.`status`,
    `user`.`statement`,
    `user`.`location`,
    `user`.`createdAt`,
    `user`.`updatedAt`,
    (
      SELECT
        IF(COUNT(bookmark.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(bookmark.id))
      FROM bookmark
      WHERE user.id = bookmark.user_id
        AND
          (
            bookmark.isPrivate IS NOT TRUE
            OR
            bookmark.user_id = $SESSION_ID
          )
    ) AS bookmarksIds,
    JSON_MERGE(
      (
        SELECT
          IF(
            COUNT(list.id) = 0,
            JSON_ARRAY(),
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'id', list.id,
                'userRole', "admin"
              )
            )
          )
        FROM `list`
        WHERE
          list.userId = user.id
          AND
          (
            list.isPrivate IS NOT TRUE
            OR
            list.userId = $SESSION_ID
          )
      ),
      (
        SELECT
          IF(
            COUNT(`user_list`.list_id) = 0,
            JSON_ARRAY(),
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'id', `user_list`.list_id,
                'userRole', `user_list`.userRole
              )
            )
          )
        FROM `user_list`
        INNER JOIN `list` ON user_list.list_id = `list`.id
        WHERE
          `user_list`.user_id = user.id
          AND
          (
            list.isPrivate IS NOT TRUE
            OR
            `user_list`.user_id = $SESSION_ID
          )
      )
    ) AS lists,
    (
      SELECT
        IF(COUNT(user_user.user_id1) = 0, JSON_ARRAY(), JSON_ARRAYAGG(user_user.user_id1))
      FROM user_user
      WHERE user_user.user_id = user.id
    ) AS followers,
    (
      SELECT
        IF(COUNT(user_user.user_id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(user_user.user_id))
      FROM user_user
      WHERE user_user.user_id1 = user.id
    ) AS following
    FROM `user`
    WHERE
      CASE WHEN @filterName IS NOT NULL THEN CONVERT(UPPER(`user`.name) USING utf8) = CONVERT(UPPER(@filterName) USING utf8) END
      OR
      CASE WHEN @filterName IS NULL THEN TRUE END
    GROUP BY `user`.`id`
    ORDER BY
      CASE WHEN $SORT = 'order'          THEN `user`.order      	                ELSE NULL END ASC,
      CASE WHEN $SORT = '-order'         THEN `user`.order      	                ELSE NULL END DESC,
      CASE WHEN $SORT = 'name'           THEN `user`.name      	                  ELSE NULL END ASC,
      CASE WHEN $SORT = '-name'          THEN `user`.name      	                  ELSE NULL END DESC,
      CASE WHEN $SORT = 'createdAt'      THEN `user`.createdAt	                  ELSE NULL END ASC,
      CASE WHEN $SORT = '-createdAt'     THEN `user`.createdAt                    ELSE NULL END DESC,
      CASE WHEN $SORT = 'followers'      THEN JSON_LENGTH(followers)              ELSE NULL END ASC,
      CASE WHEN $SORT = '-followers'     THEN JSON_LENGTH(followers)              ELSE NULL END DESC,
      CASE WHEN $SORT = 'following'      THEN JSON_LENGTH(following)              ELSE NULL END ASC,
      CASE WHEN $SORT = '-following'     THEN JSON_LENGTH(following)              ELSE NULL END DESC,
      CASE WHEN $SORT = 'bookmarks'      THEN JSON_LENGTH(bookmarksIds)           ELSE NULL END ASC,
      CASE WHEN $SORT = '-bookmarks'     THEN JSON_LENGTH(bookmarksIds)           ELSE NULL END DESC,

      CASE WHEN $SORT != 'order' AND $SORT != '-order'      THEN `user`.order     ELSE NULL END ASC
    LIMIT $OFFSET , $SIZE
  ;

END

/* DELIMITER ; */

/* CALL user_get_all('e4e2bb46-c210-4a47-9e84-f45c789fcec1', '-following', NULL, NULL, '{"name": "antonio"}'); */