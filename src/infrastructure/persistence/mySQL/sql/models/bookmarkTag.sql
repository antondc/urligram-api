CREATE TABLE IF NOT EXISTS `bookmark_tag` (
  `order` INT(11) NULL DEFAULT '10000',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bookmark_id` INT(11) NOT NULL,
  `tag_id` INT(11) NOT NULL,
  PRIMARY KEY (`bookmark_id`, `tag_id`),
  INDEX `fk_bookmark_tag_bookmark1_idx` (`bookmark_id` ASC),
  INDEX `fk_bookmark_tag_tag1_idx` (`tag_id` ASC),
  CONSTRAINT `fk_bookmark_tag_bookmark1`
    FOREIGN KEY (`bookmark_id`)
    REFERENCES `bookmark` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bookmark_tag_tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);