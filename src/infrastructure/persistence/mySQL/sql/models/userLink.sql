CREATE TABLE IF NOT EXISTS `user_link` (
  `order` INT(11) NULL DEFAULT '10000',
  `createdAt` int(11) DEFAULT NULL,
  `updatedAt` int(11) DEFAULT NULL,
  `vote` TINYINT(1) NULL DEFAULT NULL,
  `user_id` CHAR(36) CHARACTER SET 'utf8' COLLATE 'utf8_bin' NOT NULL,
  `link_id` INT(11) NOT NULL,
  PRIMARY KEY (`user_id`, `link_id`),
  INDEX `fk_user_has_link_link1_idx` (`link_id` ASC),
  INDEX `fk_user_has_link_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_link_user1`
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
