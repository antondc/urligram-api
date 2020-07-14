CREATE TABLE IF NOT EXISTS `bookmark_list` (
  `order` INT(11) NULL DEFAULT '10000',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `list_id` INT(11) NOT NULL,
  `bookmark_id` INT(11) NOT NULL,
  PRIMARY KEY (`list_id`, `bookmark_id`),
  INDEX `fk_bookmark_list_list1_idx` (`list_id` ASC) VISIBLE,
  INDEX `fk_bookmark_list_bookmark1_idx` (`bookmark_id` ASC) VISIBLE,
  CONSTRAINT `fk_bookmark_list_list1`
    FOREIGN KEY (`list_id`)
    REFERENCES `list` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bookmark_list_bookmark1`
    FOREIGN KEY (`bookmark_id`)
    REFERENCES `bookmark` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);