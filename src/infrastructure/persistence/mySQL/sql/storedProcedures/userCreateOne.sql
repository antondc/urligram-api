DROP PROCEDURE IF EXISTS user_create;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_create(
  IN $NAME VARCHAR(40),
  IN $EMAIL VARCHAR(40),
  IN $PASSWORD_ VARCHAR(40)
)

BEGIN

  SET @uuid = uuid();

  -- Insert user
  INSERT INTO user (
    `id`,
    `name`,
    `email`,
    `password`
  ) VALUES (
    @uuid,
    $NAME,
    $EMAIL,
    $PASSWORD_
  );

  -- Retrieve user
  SELECT
    `id`,
    `name`,
    `email`,
    `status`,
    `createdAt`
  FROM user
  WHERE id = @uuid;

END