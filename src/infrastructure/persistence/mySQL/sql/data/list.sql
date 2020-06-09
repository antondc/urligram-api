INSERT INTO `list` (
  `id`, `name`, `description`, `isPublic`, `createdAt`, `updatedAt`, `list_type_id`
) VALUES (
  1, 'My fantastic list', 'This is our list', true, DEFAULT, DEFAULT, 1
);

INSERT INTO `list` (
  `id`, `name`, `description`, `isPublic`, `createdAt`, `updatedAt`, `list_type_id`
) VALUES (
  2, 'Our links', 'Links for the workplace', false, DEFAULT, DEFAULT, 2
);

INSERT INTO `list` (
  `id`, `name`, `description`, `isPublic`, `createdAt`, `updatedAt`, `list_type_id`
) VALUES (
  3, 'Third list', 'More links', true, DEFAULT, DEFAULT, 2
);

INSERT INTO `list` (
  `id`, `name`, `description`, `isPublic`, `createdAt`, `updatedAt`, `list_type_id`
) VALUES (
  4, 'Fourth list', 'More links', true, DEFAULT, DEFAULT, 1
);
