DROP PROCEDURE IF EXISTS link_get_votes;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_get_votes(
    IN data JSON
)

BEGIN

  -- Retrieve values from JSON
  SET @link_id  = JSON_UNQUOTE(JSON_EXTRACT(data, '$.linkId'));

  SELECT
    vote,
    user_id as userId
  FROM user_link
  WHERE user_link.link_id = @link_id
  AND user_link.vote IS NOT NULL;

END