CREATE TABLE IF NOT EXISTS `user_list` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `order` INT(11) NULL DEFAULT '10000',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `list_id` INT(11) NOT NULL,
  `user_list_role_id` INT(11) NOT NULL,
  `user_id` CHAR(36) CHARACTER SET 'utf8' COLLATE 'utf8_bin' NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_list_list1_idx` (`list_id` ASC) VISIBLE,
  INDEX `fk_user_list_user_list_role1_idx` (`user_list_role_id` ASC) VISIBLE,
  INDEX `fk_user_list_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_list_list1`
    FOREIGN KEY (`list_id`)
    REFERENCES `list` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_list_user_list_role1`
    FOREIGN KEY (`user_list_role_id`)
    REFERENCES `user_list_role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_list_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);