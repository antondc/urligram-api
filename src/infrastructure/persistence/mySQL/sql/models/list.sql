CREATE TABLE IF NOT EXISTS `list` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `isPublic` TINYINT(1) NULL DEFAULT '0',
  `order` INT(11) NULL DEFAULT '10000',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `list_type_id` INT(11) NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`),
  UNIQUE `unique_index`(`name`, `list_type_id`),
  INDEX `fk_list_list_type1_idx` (`list_type_id` ASC) VISIBLE,
  CONSTRAINT `fk_list_list_type1`
    FOREIGN KEY (`list_type_id`)
    REFERENCES `list_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);