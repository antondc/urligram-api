CREATE TABLE IF NOT EXISTS userBookmarkUser (
  `id` CHAR(40) CHARACTER SET 'utf8' COLLATE 'utf8_bin' NOT NULL,
  `user_id1` CHAR(36) CHARACTER SET 'utf8' COLLATE 'utf8_bin' NOT NULL,
  `bookmark_id` INT(11) NOT NULL,
  `user_id2` CHAR(36) CHARACTER SET 'utf8' COLLATE 'utf8_bin' NOT NULL,
  `viewed` TINYINT(1) NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE `unique_index`(`user_id1`, `bookmark_id`, `user_id2`),
  INDEX `fk_user1_idx` (`user_id1` ASC),
  INDEX `fk_bookmark1_idx` (`bookmark_id` ASC),
  INDEX `fk_user2_idx` (`user_id2` ASC),
  CONSTRAINT `fk_user1`
    FOREIGN KEY (`user_id1`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bookmark1`
    FOREIGN KEY (`bookmark_id`)
    REFERENCES `bookmark` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user2`
    FOREIGN KEY (`user_id2`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);