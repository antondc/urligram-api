DROP PROCEDURE IF EXISTS deauthenticate_user;

-- Stored procedure to insert post and tags
CREATE PROCEDURE deauthenticate_user(
  IN user_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @id = JSON_EXTRACT(user_data, '$.id');

  -- Select user
  INSERT INTO `user_session_log` (
    `result`,
    `type`,
    `user_id`
  ) VALUES (
    1,
    "logout",
    JSON_UNQUOTE(@id)
  );

END