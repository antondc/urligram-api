DROP PROCEDURE IF EXISTS link_vote_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE link_vote_one(
  IN data JSON
)

BEGIN

  DECLARE CASTED_VOTE INT;
  -- Retrieve values from JSON
  SET @user_id  = JSON_UNQUOTE(JSON_EXTRACT(data, '$.userId'));
  SET @link_id  = JSON_UNQUOTE(JSON_EXTRACT(data, '$.linkId'));
  SET @vote  = JSON_UNQUOTE(JSON_EXTRACT(data, '$.vote'));


  IF      @vote = "true"  THEN SET  CASTED_VOTE = 1;
  ELSEIF  @vote = "false" THEN SET  CASTED_VOTE = 0;
  ELSE SET                          CASTED_VOTE = NULL;
  END IF;

    -- Upsert into list
  INSERT INTO user_link (
    user_id,
    link_id,
    vote
  ) VALUES (
    @user_id,
    @link_id,
    CASTED_VOTE
  ) ON DUPLICATE KEY UPDATE
    user_id      = @user_id,
    link_id      = @link_id,
    vote         = CASTED_VOTE,
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