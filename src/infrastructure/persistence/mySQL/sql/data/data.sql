INSERT INTO user (id, name, surname) VALUES (1, 'Foo', "Bar");
INSERT INTO post (id, title, body) VALUES (1, 'post 1', "Post body");
INSERT INTO post (id, title, body) VALUES (2, 'post 2', "Post body");
INSERT INTO tag (id, tag) VALUES (1, 'tag 1');
INSERT INTO tag (id, tag) VALUES (2, 'tag 2');
INSERT INTO post_tag (post_id, tag_id) VALUES (1, 1);
INSERT INTO post_tag (post_id, tag_id) VALUES (1, 2);
INSERT INTO post_tag (post_id, tag_id) VALUES (2, 1);
