DROP PROCEDURE IF EXISTS link_upsert_one;

/* DELIMITER $$ */

CREATE PROCEDURE link_upsert_one(
  IN $PATH_ TEXT,
  IN $DOMAIN TEXT,
  IN $TITLE VARCHAR(255),
  IN $DESCRIPTION TEXT,
  IN $IMAGE TEXT,
  IN $FAVICON TEXT,
  IN $LANGUAGE VARCHAR(2)
)

BEGIN

  -- Upsert into domain
  INSERT INTO domain (
    `domain`
  ) VALUES (
    $DOMAIN
  ) ON DUPLICATE KEY UPDATE
    domain    = $DOMAIN,
    updatedAt = UNIX_TIMESTAMP()
  ;

  -- Retrieve the upserted id
  SET @domain_id = (
    SELECT domain.id
    FROM domain
    WHERE domain.domain = $DOMAIN
  );

  -- Upsert into link
  INSERT INTO link (
    `path`,
    `domain_id`,
    `title`,
    `description`,
    `image`,
    `favicon`,
    `language`
  ) VALUES (
    $PATH_,
    @domain_id,
    $TITLE,
    $DESCRIPTION,
    $IMAGE,
    $FAVICON,
    $LANGUAGE
  ) ON DUPLICATE KEY UPDATE
    path         = $PATH_,
    title        = $TITLE,
    description  = $DESCRIPTION,
    image        = $IMAGE,
    favicon      = $FAVICON,
    language     = $LANGUAGE,
    domain_id = @domain_id,
    updatedAt = UNIX_TIMESTAMP()
  ;


  -- Retrieve the upserted link_id
    SELECT
      link.id AS id
    FROM
      link
    WHERE
      link.path = $PATH_
      AND
      link.domain_id = @domain_id;

END

/* DELIMITER ; */

/* CALL link_upsert_one("/", "example.com", "Example page", "This is an example page", "/image1", "./favicon", "en"); */