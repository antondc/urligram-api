DROP PROCEDURE IF EXISTS user_get_all;

-- Stored procedure to insert post and tags
CREATE PROCEDURE user_get_all()
BEGIN
  -- Select user
  SELECT `id`, `name`, `level`, `email`, `status`, `statement`, `location`, `order`, `createdAt`,
`updatedAt` FROM `user`;

END