DROP PROCEDURE IF EXISTS tags_get_all;

-- DELIMITER $$

CREATE PROCEDURE tags_get_all(
  IN $SESSION_ID VARCHAR(40),
  IN $SORT VARCHAR(40),
  IN $SIZE INT,
  IN $OFFSET INT,
  IN $FILTER JSON
)

BEGIN

  SET $SIZE = IFNULL($SIZE, -1);

  SET @filterName = JSON_UNQUOTE(JSON_EXTRACT($FILTER, '$.tags'));

  SELECT
    T.id,
    T.name,
    T.createdAt,
    T.updatedAt,
    COUNT(T.id) AS count
    FROM (
      SELECT
        tag.id,
        tag.name,
        tag.createdAt,
        tag.updatedAt
      FROM tag
      LEFT JOIN bookmark_tag ON bookmark_tag.tag_id = tag.id
      LEFT JOIN bookmark ON bookmark.id = bookmark_tag.bookmark_id
      WHERE
        (
         -- Case for only one name string, useful to search from partial strings with LIKE
         -- Convert(x USING uft8 removes the tildes)
         CASE WHEN @filterName IS NOT NULL THEN UPPER(tag.name) LIKE UPPER(CONCAT('%', CONVERT(JSON_UNQUOTE(JSON_EXTRACT(@filterName, '$[0]')) USING utf8), '%')) END
         -- Case for many tags, useful to search for full tag names/
          OR CASE WHEN @filterName IS NOT NULL AND JSON_CONTAINS(@filterName, JSON_QUOTE(tag.name)) THEN TRUE END
          OR CASE WHEN @filterName IS NULL THEN TRUE END
        )
        AND
          (
            bookmark.isPublic IS TRUE
            OR
            bookmark.user_id = $SESSION_ID
          )
    ) AS T
    GROUP BY T.id
      ORDER BY
      CASE WHEN $SORT = 'id'             THEN T.id      	  ELSE NULL END ASC,
      CASE WHEN $SORT = '-id'            THEN T.id      	  ELSE NULL END DESC,
      CASE WHEN $SORT = 'name'           THEN T.name	      ELSE NULL END ASC,
      CASE WHEN $SORT = '-name'          THEN T.name       ELSE NULL END DESC,
      CASE WHEN $SORT = 'count'          THEN COUNT(T.id)  ELSE NULL END ASC,
      CASE WHEN $SORT = '-count'         THEN COUNT(T.id)  ELSE NULL END DESC,
      CASE WHEN $SORT IS NULL            THEN COUNT(T.name)  ELSE NULL END DESC
    LIMIT $OFFSET , $SIZE
  ;

END

-- DELIMITER ;

-- CALL tags_get_all('e4e2bb46-c210-4a47-9e84-f45c789fcec1', NULL, NULL, NULL, '{"tags": ["foo" , "sociedad"]}');
