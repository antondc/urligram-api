DROP PROCEDURE IF EXISTS user_bookmark_user_received_get_all;

/* DELIMITER $$ */

CREATE PROCEDURE user_bookmark_user_received_get_all(
  IN $SESSION_ID VARCHAR(40)
)

BEGIN

  SELECT DISTINCT
    count(*) OVER() as totalItems,
    bookmark.id as bookmarkId,
    userBookmarkUser.viewed,
    bookmark.title,
    CONCAT(domain.domain, link.path) AS url,
    `link`.`favicon`,
    userBookmarkUser.user_id1 as senderId,
    $SESSION_ID as receiverId
  FROM bookmark
  INNER JOIN link ON bookmark.link_id = link.id
  INNER JOIN domain ON link.domain_id = domain.id
  INNER JOIN userBookmarkUser ON bookmark.id = userBookmarkUser.bookmark_id
  WHERE
      bookmark.isPrivate IS NOT TRUE
      AND userBookmarkUser.user_id2 = $SESSION_ID
  GROUP BY bookmark.id
  ;

END

/* DELIMITER ; */
/* CALL user_bookmark_user_received_get_all('b95274c9-3d26-4ce3-98b2-77dce5bd7aae', 'b95274c9-3d26-4ce3-98b2-77dce5bd7aae', NULL, NULL, NULL, NULL); */