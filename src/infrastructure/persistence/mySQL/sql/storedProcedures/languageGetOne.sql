DROP PROCEDURE IF EXISTS language_get_one;

CREATE PROCEDURE language_get_one(
    IN language_data JSON
)
BEGIN

  SET @slug = JSON_UNQUOTE(JSON_EXTRACT(language_data, '$.slug'));

 SELECT
    l.id,
    l.order,
    l.name,
    l.isDefault,
    l.slug,
    JSON_OBJECT(
      'id', g.id,
      'home', g.home,
      'login', g.login,
      'logout', g.logout,
      'control', g.control,
      'notFound', g.notFound,
      'tags', g.tags,
      'trending', g.trending,
      'lists', g.lists,
      'bookmarks', g.bookmarks
    ) glossary
  FROM language l
  INNER JOIN glossary g ON l.id = g.id
  WHERE l.slug = @slug;

END