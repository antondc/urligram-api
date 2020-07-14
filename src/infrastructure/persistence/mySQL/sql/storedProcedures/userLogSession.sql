DROP PROCEDURE IF EXISTS user_log_session;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_log_session(
  IN log_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @user_id     = JSON_UNQUOTE(JSON_EXTRACT(log_data, '$.userId'));
  SET @result      = JSON_UNQUOTE(JSON_EXTRACT(log_data, '$.result'));
  SET @type        = JSON_UNQUOTE(JSON_EXTRACT(log_data, '$.type'));

  INSERT INTO user_session_log (
    `result`,
    `type`,
    `user_id`
  ) VALUES(
    @result,
    @type,
    @user_id
  );

END