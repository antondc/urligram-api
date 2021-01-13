DROP PROCEDURE IF EXISTS link_vote_one;

CREATE PROCEDURE link_vote_one(
  IN LINK_ID INT,
  IN USER_ID TEXT,
  IN VOTE BOOLEAN
)

BEGIN

  INSERT INTO user_link (
    link_id,
    user_id,
    vote
  ) VALUES (
    LINK_ID,
    USER_ID,
    VOTE
  ) ON DUPLICATE KEY UPDATE
    link_id      = LINK_ID,
    user_id      = USER_ID,
    vote         = VOTE,
    updatedAt    = CURRENT_TIMESTAMP
  ;

  SELECT
    link_id AS id,
    user_id,
    vote
  FROM user_link
  WHERE
    user_id = USER_ID
    AND
    link_id = LINK_ID
  ;


END