CREATE TABLE domain (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `domain` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  `updatedAt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `domain` (`domain` ASC)
);
