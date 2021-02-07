DROP PROCEDURE IF EXISTS user_tags_get_all;

CREATE PROCEDURE user_tags_get_all(
  IN $USER_ID VARCHAR(40),
  IN $SESSION_ID VARCHAR(40),
  IN $SORT VARCHAR(40),
  IN $SIZE INT,
  IN $OFFSET INT
)
BEGIN

  SET $SIZE = IFNULL($SIZE, -1);

  -- Return tags used by users
  SELECT
    T.id,
    T.name,
    COUNT(T.id) AS count
    FROM (
      SELECT
        tag.id,
        tag.name
      FROM tag
      JOIN bookmark_tag ON bookmark_tag.tag_id = tag.id
      JOIN bookmark ON bookmark.id = bookmark_tag.bookmark_id
      WHERE bookmark.user_id = $USER_ID
      AND
        (
          bookmark.isPrivate IS NOT TRUE
          OR
          bookmark.user_id = $SESSION_ID
        )
    ) AS T
    GROUP BY T.id
      ORDER BY
      CASE WHEN $SORT = 'id'      THEN T.id      	  ELSE NULL END ASC,
      CASE WHEN $SORT = '-id'     THEN T.id      	  ELSE NULL END DESC,
      CASE WHEN $SORT = 'name'    THEN T.name	      ELSE NULL END ASC,
      CASE WHEN $SORT = '-name'   THEN T.name       ELSE NULL END DESC,
      CASE WHEN $SORT = 'count'   THEN COUNT(T.id)  ELSE NULL END ASC,
      CASE WHEN $SORT = '-count'  THEN COUNT(T.id)  ELSE NULL END DESC,
      CASE WHEN $SORT IS NULL     THEN COUNT(T.id)  ELSE NULL END DESC
    LIMIT $OFFSET , $SIZE
  ;

END


/* CALL  user_tags_get_all("e4e2bb46-c210-4a47-9e84-f45c789fcec1", "e4e2bb46-c210-4a47-9e84-f45c789fcec1", "-count", "2", "1"); */