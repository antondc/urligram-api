CREATE TABLE IF NOT EXISTS `link_user_list` (
  `order` INT(11) NULL DEFAULT '10000',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `list_id` INT(11) NOT NULL,
  `link_user_id` INT(11) NOT NULL,
  PRIMARY KEY (`list_id`, `link_user_id`),
  INDEX `fk_link_user_list_list1_idx` (`list_id` ASC) VISIBLE,
  INDEX `fk_link_user_list_link_user1_idx` (`link_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_link_user_list_list1`
    FOREIGN KEY (`list_id`)
    REFERENCES `list` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_link_user_list_link_user1`
    FOREIGN KEY (`link_user_id`)
    REFERENCES `link_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;