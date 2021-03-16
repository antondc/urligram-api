CREATE TABLE IF NOT EXISTS `link` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `path` VARCHAR(1000) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `favicon` VARCHAR(255) DEFAULT NULL,
  `language` VARCHAR(2) DEFAULT NULL,
  `image` VARCHAR(255) DEFAULT NULL,
  `order` INT(11) NULL DEFAULT '10000',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `domain_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_link_domain1_idx` (`domain_id` ASC),
  UNIQUE INDEX `mul_path_domain_id_idx` (`path` ASC, `domain_id` ASC),
  CONSTRAINT `fk_link_domain1`
    FOREIGN KEY (`domain_id`)
    REFERENCES `domain` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
