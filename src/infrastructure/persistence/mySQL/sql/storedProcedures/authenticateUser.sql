DROP PROCEDURE IF EXISTS authenticate_user;

-- Stored procedure to insert post and tags
CREATE PROCEDURE authenticate_user(
  IN user_data JSON
)
BEGIN
  -- Retrieve values from JSON
  SET @name = JSON_EXTRACT(user_data, '$.name');
  SET @password = JSON_EXTRACT(user_data, '$.password');

  -- Select user
  SET @user_id_name_pass = (
    SELECT `id` FROM `user`
    WHERE `name` = JSON_UNQUOTE(@name) AND `password` = JSON_UNQUOTE(@password)
  );

  SET @user_id_name = (
    SELECT `id` FROM `user`
    WHERE `name` = JSON_UNQUOTE(@name)
  );

  IF @user_id_name IS NOT NULL AND @user_id_name_pass IS NOT NULL THEN
    INSERT INTO user_log (result, user_id) VALUES("success", @user_id_name_pass);

    SELECT
      `id`,
      `name`,
      `level`,
      `email`,
      `status`,
      `statement`,
      `location`,
      `order`,
      `createdAt`,
      `updatedAt`
    FROM user
    WHERE `id` = @user_id_name_pass;

  ELSEIF @user_id_name IS NOT NULL AND @user_id_name_pass IS NULL THEN
    INSERT INTO user_log (result, user_id) VALUES("failure", @user_id_name);
    SELECT NULL LIMIT 0;

  ELSE
    SELECT NULL LIMIT 0;
  END IF;

END