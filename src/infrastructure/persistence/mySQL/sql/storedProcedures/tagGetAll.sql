DROP PROCEDURE IF EXISTS tag_get_all;

CREATE PROCEDURE tag_get_all()
BEGIN

  SELECT
    `tag`.`id`,
    `tag`.`name`
  FROM `tag`;

END