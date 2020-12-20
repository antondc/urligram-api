INSERT INTO `bookmark` (
  `id`, `order`, `title`, `isPrivate`, `saved`, `vote`, `createdAt`, `updatedAt`, `user_id`, `link_id`
) VALUES (
  1, 0, "My bookmark 1", false, true, true, DEFAULT, DEFAULT, 'b95274c9-3d26-4ce3-98b2-77dce5bd7aae', 12
);

INSERT INTO `bookmark` (
  `id`, `order`, `title`, `isPrivate`, `saved`, `vote`, `createdAt`, `updatedAt`, `user_id`, `link_id`
) VALUES (
  2, 1, "My bookmark 2", true, true, false, DEFAULT, DEFAULT, '75442486-0878-440c-9db1-a7006c25a39f', 6
);

INSERT INTO `bookmark` (
  `id`, `order`, `title`, `isPrivate`, `saved`, `vote`, `createdAt`, `updatedAt`, `user_id`, `link_id`
) VALUES (
  3, 2, "My bookmark 3", false, true, NULL, DEFAULT, DEFAULT, '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000', 7
);

INSERT INTO `bookmark` (
  `id`, `order`, `title`, `isPrivate`, `saved`, `vote`, `createdAt`, `updatedAt`, `user_id`, `link_id`
) VALUES (
  4, 3, "My bookmark 4", false, true, true, DEFAULT, DEFAULT, 'e4e2bb46-c210-4a47-9e84-f45c789fcec1', 8
);

INSERT INTO `bookmark` (
  `id`, `order`, `title`, `isPrivate`, `saved`, `vote`, `createdAt`, `updatedAt`, `user_id`, `link_id`
) VALUES (
  5, 4, "My bookmark 4", false, true, true, DEFAULT, DEFAULT, 'e4e2bb46-c210-4a47-9e84-f45c789fcec1', 12
);
