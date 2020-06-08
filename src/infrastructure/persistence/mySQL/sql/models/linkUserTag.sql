CREATE TABLE IF NOT EXISTS `link_user_tag` (
  `order` INT(11) NULL DEFAULT '10000',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `link_user_id` INT(11) NOT NULL,
  `tag_id` INT(11) NOT NULL,
  PRIMARY KEY (`link_user_id`, `tag_id`),
  INDEX `fk_link_user_tag_link_user1_idx` (`link_user_id` ASC) VISIBLE,
  INDEX `fk_link_user_tag_tag1_idx` (`tag_id` ASC) VISIBLE,
  CONSTRAINT `fk_link_user_tag_link_user1`
    FOREIGN KEY (`link_user_id`)
    REFERENCES `link_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_link_user_tag_tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;