INSERT INTO `list` (
  `id`, `name`, `description`, `isPrivate`, `createdAt`, `updatedAt`, `listType`
) VALUES (
  1, 'My fantastic list', 'This is our list', false, DEFAULT, DEFAULT, "public"
);

INSERT INTO `list` (
  `id`, `name`, `description`, `isPrivate`, `createdAt`, `updatedAt`, `listType`
) VALUES (
  2, 'Our links', 'Links for the workplace', true, DEFAULT, DEFAULT, "public"
);

INSERT INTO `list` (
  `id`, `name`, `description`, `isPrivate`, `createdAt`, `updatedAt`, `listType`
) VALUES (
  3, 'Third list', 'More links', false, DEFAULT, DEFAULT, "public"
);

INSERT INTO `list` (
  `id`, `name`, `description`, `isPrivate`, `createdAt`, `updatedAt`, `listType`
) VALUES (
  4, 'Fourth list', 'More links', true, DEFAULT, DEFAULT, "private"
);
