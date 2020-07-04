DROP PROCEDURE IF EXISTS list_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_get_one(
  IN list_data JSON
)

BEGIN
  -- Retrieve values from JSON
  SET @listId = JSON_EXTRACT(list_data, '$.listId');

  -- Select users related to the list and save them in a variable
  SET @users = (
      SELECT
        IF(
          COUNT(user.id) = 0,
          JSON_ARRAY(),
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', user.id,
              "name", user.name,
              "role", user_list_role.role
            )
          )
        ) users
      FROM LIST
      INNER JOIN user_list ON list.id = user_list.list_id
      INNER JOIN `user` ON user.id = user_list.user_id
      INNER JOIN user_list_role ON user_list.user_list_role_id = user_list_role.id

      WHERE list.id = 1
  );


  SELECT
      CAST(@users AS JSON) AS users, -- Make use of the @users and cast them as JSON
      list.id,
      list.name,
      list.description,
      list_type.type AS listType,
      IF(
        COUNT(link_user.id) = 0,
        JSON_ARRAY(),
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', link_user.id,
            'vote', link_user.vote,
            'url', CONCAT(domain.domain, link.path)
          )
        )
      ) links
    FROM LIST
    INNER JOIN list_type ON list.list_type_id = list_type.id
    LEFT JOIN link_user_list ON list.id = link_user_list.list_id
    LEFT JOIN link_user ON link_user.id = link_user_list.link_user_id
    LEFT JOIN link ON link_user.link_id = link.id
    LEFT JOIN domain ON link.domain_id = domain.id
    WHERE list.id = 1;

    SELECT @users;
END