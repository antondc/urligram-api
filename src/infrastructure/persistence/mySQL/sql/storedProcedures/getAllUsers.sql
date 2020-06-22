DROP PROCEDURE IF EXISTS get_all_users;

-- Stored procedure to insert post and tags
CREATE PROCEDURE get_all_users()
BEGIN
  -- Select user
  SELECT `id`, `name`, `level`, `email`, `status`, `statement`, `location`, `order`, `createdAt`,
`updatedAt` FROM `user`;

END