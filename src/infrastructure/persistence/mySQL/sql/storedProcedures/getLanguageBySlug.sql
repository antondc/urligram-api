DROP PROCEDURE IF EXISTS get_language_by_slug;

CREATE PROCEDURE get_language_by_slug(
    IN language_data JSON
)
BEGIN

  SET @slug = JSON_EXTRACT(language_data, '$.slug');

 SELECT
    l.id,
    l.order,
    l.name,
    l.isDefault,
    l.slug,
    json_object(
      'id', g.id,
      'home', g.home,
      'login', g.login,
      'logout', g.logout,
      'control', g.control,
      'notFound', g.notFound,
      'tags', g.tags,
      'trending', g.trending,
      'lists', g.lists
    ) glossary
  FROM language l
  INNER JOIN glossary g ON l.id = g.id
  WHERE l.slug = JSON_UNQUOTE(@slug);
END