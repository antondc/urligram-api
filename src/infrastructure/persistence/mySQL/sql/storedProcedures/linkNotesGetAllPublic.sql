DROP PROCEDURE IF EXISTS link_notes_get_all_public;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_notes_get_all_public(
  IN $LINK_ID INT
)

BEGIN

 -- Returns a notes if the notes is public, or either the user is owner of the notes or a participant
   SELECT
      bookmark.id as bookmarkId,
      bookmark.user_id as userId,
      bookmark.notes as notes
    FROM `bookmark`
    WHERE bookmark.link_id = $LINK_ID
      AND bookmark.isPrivate IS NOT TRUE
  ;

END