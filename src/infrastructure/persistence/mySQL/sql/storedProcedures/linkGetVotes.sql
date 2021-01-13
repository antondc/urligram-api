DROP PROCEDURE IF EXISTS link_get_votes;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_get_votes(
  IN $LINK_ID INT
)

BEGIN

  SELECT
    vote,
    user_id as userId
  FROM user_link
  WHERE user_link.link_id = $LINK_ID
  AND user_link.vote IS NOT NULL;

END