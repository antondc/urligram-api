DROP PROCEDURE IF EXISTS log_user_session;

-- Stored procedure to insert post and tags
CREATE PROCEDURE log_user_session(
  IN log_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @result = JSON_EXTRACT(log_data, '$.result');
  SET @type = JSON_EXTRACT(log_data, '$.type');
  SET @id = JSON_EXTRACT(log_data, '$.id');

  INSERT INTO user_session_log (
    `result`,
    `type`,
    `user_id`
  ) VALUES(
    JSON_UNQUOTE(@result),
    JSON_UNQUOTE(@type),
    JSON_UNQUOTE(@id)
  );

END