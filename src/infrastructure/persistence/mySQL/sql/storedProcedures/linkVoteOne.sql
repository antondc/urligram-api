DROP PROCEDURE IF EXISTS link_vote_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_vote_one(
  IN data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @user_id  = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.userId'));
  SET @link_id  = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.linkId'));
  SET @vote  = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.vote'));

    -- Upsert into list
  INSERT INTO user_link (
    user_id,
    link_id,
    vote
  ) VALUES (
    @user_id,
    @link_id,
    @vote
  ) ON DUPLICATE KEY UPDATE
    user_id      = @user_id,
    link_id      = @link_id,
    vote         = @vote,
    updatedAt    = CURRENT_TIMESTAMP
  ;

  SELECT
    user_id,
    link_id AS id,
    vote
  FROM user_link
  WHERE
    user_id = @user_id
    AND
    link_id = @link_id
  ;

END