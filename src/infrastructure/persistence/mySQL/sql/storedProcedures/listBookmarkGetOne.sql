DROP PROCEDURE IF EXISTS list_bookmark_get_one;

-- Stored procedure to insert post and tags
CREATE PROCEDURE list_bookmark_get_one(
  IN data JSON
)
BEGIN

  SET @session_id  = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.sessionId'));
  SET @list_id     = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.listId'));
  SET @bookmark_id = JSON_UNQUOTE(JSON_EXTRACT(DATA, '$.bookmarkId'));

  SELECT
    bookmark.id,
    bookmark.title AS bookmarkTitle,
    bookmark.user_id AS userId,
    CONCAT(domain.domain, link.path) AS url,
    bookmark.isPrivate,
    bookmark.saved,
    bookmark.vote
  FROM bookmark_list
  JOIN bookmark ON bookmark_list.bookmark_id  = bookmark.id
  JOIN link ON bookmark.link_id               = link.id
  JOIN domain ON link.domain_id               = domain.id
  JOIN `list` ON bookmark_list.list_id        = list.id
  LEFT JOIN user_list ON user_list.list_id    = list.id
  WHERE
    (
     `list`.`isPrivate` 					            != 1
     AND `bookmark`.`isPrivate`               != 1
     AND `bookmark_list`.`list_id`            = @list_id
     AND `bookmark_list`.`bookmark_id`        = @bookmark_id
    )
    OR (
      `bookmark_list`.`list_id`               = @list_id
      AND `bookmark_list`.`bookmark_id`       = @bookmark_id
      AND (
        user_list.user_id IN (
          SELECT
            `user_list`.`user_id`
          FROM `user_list`
          WHERE
            `user_list`.`list_id`             = @list_id
        AND user_list.user_id                 = @user_id
      ) OR bookmark.user_id                   = @user_id
     )
    )
  ;

END