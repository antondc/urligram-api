DROP PROCEDURE IF EXISTS link_notes_get_all_public;

-- DELIMITER $$

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_notes_get_all_public(
  IN $LINK_ID INT,
  IN $SORT VARCHAR(40),
  IN $SIZE INT,
  IN $OFFSET INT
)

BEGIN

  SET $SIZE = IFNULL($SIZE, -1);

 -- Returns a notes if the notes is public, or either the user is owner of the notes or a participant
  SELECT
    count(*) OVER() as totalItems,
    bookmark.id as bookmarkId,
    bookmark.user_id as userId,
    user.name as userName,
    bookmark.notes as notes
  FROM `bookmark`
  INNER JOIN user ON user.id = bookmark.user_id
  WHERE bookmark.link_id      = $LINK_ID
    AND bookmark.isPublic     IS TRUE
    AND bookmark.notes        IS NOT NULL
    AND TRIM(bookmark.notes)  != ''
  ORDER BY
    CASE WHEN $SORT = 'createdAt'      THEN `bookmark`.createdAt	                  ELSE NULL END ASC,
    CASE WHEN $SORT = '-createdAt'     THEN `bookmark`.createdAt                    ELSE NULL END DESC,
    CASE WHEN $SORT = 'updatedAt'      THEN `bookmark`.updatedAt	                  ELSE NULL END ASC,
    CASE WHEN $SORT = '-updatedAt'     THEN `bookmark`.updatedAt                    ELSE NULL END DESC,
    CASE WHEN $SORT != 'updatedAt' AND $SORT != '-updatedAt'      THEN `bookmark`.updatedAt     ELSE NULL END ASC
  LIMIT $OFFSET , $SIZE
  ;

END

-- DELIMITER ;
