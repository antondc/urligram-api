-- SELECT ALL POSTS
DROP PROCEDURE IF EXISTS select_all_posts;

CREATE PROCEDURE select_all_posts()
BEGIN
  SELECT
    p.id,
    p.title,
    p.body,
  IF(
    COUNT(t.id) = 0,
    JSON_ARRAY(),
    JSON_ARRAYAGG(
      JSON_OBJECT('id', t.id, 'tag', t.tag)
      )
    ) tags
  FROM post p
    LEFT JOIN post_tag pt ON p.id = pt.post_id
    LEFT JOIN tag t ON t.id = pt.tag_id
  GROUP BY p.id, p.title;
END