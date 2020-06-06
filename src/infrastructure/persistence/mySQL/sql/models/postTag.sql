CREATE TABLE post_tag (
  post_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (post_id, tag_id),
  INDEX fk_post_tag_tag1_idx (tag_id ASC) VISIBLE,
  INDEX fk_post_tag_post_idx (post_id ASC) VISIBLE,
  CONSTRAINT fk_post_tag_post
    FOREIGN KEY (post_id)
    REFERENCES post (id),
  CONSTRAINT fk_post_tag_tag1
    FOREIGN KEY (tag_id)
    REFERENCES tag (id));