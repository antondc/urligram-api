CREATE TABLE IF NOT EXISTS `bookmark` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `order` INT(11) NULL DEFAULT '10000',
  `title` VARCHAR(255) NOT NULL,
  `isPublic` TINYINT(1) NULL DEFAULT '1',
  `saved` TINYINT(1) NULL DEFAULT '0',
  `notes` TEXT DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  `updatedAt` int(11) DEFAULT NULL,
  `user_id` CHAR(36) CHARACTER SET 'utf8' COLLATE 'utf8_bin' NOT NULL,
  `link_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE `unique_index`(`user_id`, `link_id`),
  INDEX `fk_bookmark_user1_idx` (`user_id` ASC),
  INDEX `fk_bookmark_link1_idx` (`link_id` ASC),
  CONSTRAINT `fk_bookmark_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bookmark_link1`
    FOREIGN KEY (`link_id`)
    REFERENCES `link` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
