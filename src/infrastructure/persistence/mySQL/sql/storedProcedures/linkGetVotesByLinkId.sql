DROP PROCEDURE IF EXISTS link_get_votes_by_link_id;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_get_votes_by_link_id(
    IN data JSON
)

BEGIN

  -- Retrieve values from JSON
  SET @link_id  = JSON_UNQUOTE(JSON_EXTRACT(data, '$.linkId'));

  SELECT JSON_ARRAYAGG(vote) as votes FROM user_link
    WHERE user_link.link_id = @link_id
    AND user_link.vote IS NOT NULL;

END