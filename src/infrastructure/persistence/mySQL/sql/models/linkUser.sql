CREATE TABLE IF NOT EXISTS `link_user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `order` INT(11) NULL DEFAULT '10000',
  `title` VARCHAR(255) NOT NULL,
  `isPrivate` TINYINT(1) NULL DEFAULT '0',
  `saved` TINYINT(1) NULL DEFAULT '0',
  `vote` TINYINT(1) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` CHAR(36) CHARACTER SET 'utf8' COLLATE 'utf8_bin' NOT NULL,
  `link_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE `unique_index`(`user_id`, `link_id`),
  INDEX `fk_link_user_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_link_user_link1_idx` (`link_id` ASC) VISIBLE,
  CONSTRAINT `fk_link_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_link_user_link1`
    FOREIGN KEY (`link_id`)
    REFERENCES `link` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);