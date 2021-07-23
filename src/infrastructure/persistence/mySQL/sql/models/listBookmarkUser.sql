CREATE TABLE IF NOT EXISTS `list_bookmark_user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `createdAt` int(11) DEFAULT NULL,
  `updatedAt` int(11) DEFAULT NULL,
  `list_id` INT(11) NOT NULL,
  `bookmark_id` INT(11) NOT NULL,
  `user_id` CHAR(36) CHARACTER SET 'utf8' COLLATE 'utf8_bin' NOT NULL,
  `viewPending` TINYINT(1) NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE `unique_index`(`list_id`, `bookmark_id`, `user_id`),
  INDEX `fk_list_bookmark_user_list1_idx` (`list_id` ASC),
  INDEX `fk_list_bookmark_user_bookmark1_idx` (`bookmark_id` ASC),
  INDEX `fk_list_bookmark_user_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_list_bookmark_user_list1`
    FOREIGN KEY (`list_id`)
    REFERENCES `list` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_list_bookmark_user_bookmark1`
    FOREIGN KEY (`bookmark_id`)
    REFERENCES `bookmark` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_list_bookmark_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
