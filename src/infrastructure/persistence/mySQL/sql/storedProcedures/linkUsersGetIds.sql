DROP PROCEDURE IF EXISTS link_users_get_ids;

-- DELIMITER $$

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_users_get_ids(
  IN $SESSION_ID VARCHAR(40),
  IN $LINK_ID INT,
  IN $SORT VARCHAR(40),
  IN $SIZE INT,
  IN $OFFSET INT
)

BEGIN

  SET $SIZE = IFNULL($SIZE, -1);

  SELECT
    $SORT as sort,
    count(*) OVER() as totalItems,
    `user`.`id`,
    `user`.`order`,
    `user`.`createdAt`,
    `user`.`updatedAt`

  FROM bookmark
  INNER JOIN `user` ON `user`.`id` = bookmark.user_id
  WHERE
    bookmark.link_id = $LINK_ID
    AND
      (
          bookmark.isPublic IS TRUE
        OR
          bookmark.user_id = $SESSION_ID
      )
  ORDER BY
    CASE WHEN $SORT = 'order'          THEN `user`.order      	                ELSE NULL END ASC,
    CASE WHEN $SORT = '-order'         THEN `user`.order      	                ELSE NULL END DESC,
    CASE WHEN $SORT = 'createdAt'      THEN `user`.createdAt	                  ELSE NULL END ASC,
    CASE WHEN $SORT = '-createdAt'     THEN `user`.createdAt                    ELSE NULL END DESC,
    CASE WHEN $SORT = 'updatedAt'      THEN `user`.updatedAt	                  ELSE NULL END ASC,
    CASE WHEN $SORT = '-updatedAt'     THEN `user`.updatedAt                    ELSE NULL END DESC,
    CASE WHEN $SORT != 'order' AND $SORT != '-order'      THEN `user`.order     ELSE NULL END ASC
  LIMIT $OFFSET , $SIZE
  ;

END

-- DELIMITER ;
