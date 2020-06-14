CREATE TABLE IF NOT EXISTS `user_log` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `result` TINYINT(1) NOT NULL DEFAULT '0',
  `type` ENUM('login', 'logout') NOT NULL,
  `order` INT(11) NULL DEFAULT '10000',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` CHAR(36) CHARACTER SET 'utf8' COLLATE 'utf8_bin' NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_log_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_log_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);