DROP PROCEDURE IF EXISTS user_create;

-- DELIMITER $$

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_create(
  IN $NAME VARCHAR(40),
  IN $EMAIL VARCHAR(40),
  IN $PASSWORD_ VARCHAR(40),
  IN $IMAGE_ VARCHAR(200),
  IN $ACTIVATION_TOKEN TEXT
)

BEGIN

  SET @id = uuid();

  -- Insert user
  INSERT INTO user (
    `id`,
    `name`,
    `email`,
    `password`,
    `image`,
    `activationToken`,
    `createdAt`,
    `updatedAt`
  ) VALUES (
    @id,
    $NAME,
    $EMAIL,
    $PASSWORD_,
    $IMAGE_,
    $ACTIVATION_TOKEN,
    UNIX_TIMESTAMP(),
    UNIX_TIMESTAMP()
  );

  -- Retrieve user
  SELECT
    `id`,
    `name`,
    `email`,
    `status`,
    `createdAt`,
    `activationToken`
  FROM user
  WHERE id = @id;

END 

-- DELIMITER ;