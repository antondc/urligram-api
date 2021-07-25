DROP PROCEDURE IF EXISTS bookmark_get_by_ids;

-- DELIMITER $$

CREATE PROCEDURE bookmark_get_by_ids(
  IN $SESSION_ID VARCHAR(40),
  IN $BOOKMARK_IDS JSON
)

BEGIN

  SELECT
    count(*) OVER() as totalItems,
    bookmark.id,
    bookmark.order,
    link.image as img,
    `link`.`favicon`,
    bookmark.title,
    CONCAT(domain.domain, link.path) AS url,
    link.id AS linkId,
    bookmark.user_id AS userId,
    bookmark.isPrivate,
    bookmark.saved,
    bookmark.createdAt,
    bookmark.updatedAt,
    (
      SELECT
        SUM(IF(user_link.vote IS NULL, 0, IF(user_link.vote = 0, -1, 1))) AS aaa
      FROM user_link
      WHERE user_link.link_id = link.id
    ) AS totalVote,
    (
      SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', tag.id,
            'name', tag.name
          )
        )
      FROM bookmark_tag
      JOIN tag
      ON bookmark_tag.tag_id = tag.id
      WHERE bookmark.id = bookmark_tag.bookmark_id
    ) AS tags,
    /*
    Returns only public lists or those where user is in
    Unsorted
    */
    (
      SELECT
        CAST(
          CONCAT('[',
            GROUP_CONCAT(
              DISTINCT JSON_OBJECT(
                'id', list.id,
                'name', list.name
              ) SEPARATOR ','
          ), ']'
        ) AS JSON
      ) AS lists
      FROM bookmark_list
      JOIN `list` ON bookmark_list.list_id = list.id
      JOIN user_list ON user_list.list_id = list.id
      WHERE bookmark.id = bookmark_list.bookmark_id AND list.isPrivate != 1
    ) AS lists,
    (
      SELECT
        IF(COUNT(bookmark.user_id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(bookmark.user_id))
      FROM bookmark
      WHERE bookmark.link_id = link.id
    ) AS users,
    (
      SELECT
        JSON_OBJECT(
          'id', link.id,
          'title', link.title
        )
    ) AS link,
    (
      SELECT
        IF(
          COUNT(bookmark.id) = 0,
          JSON_ARRAY(),
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', `bookmark`.`id`,
              'title', `bookmark`.`title`,
              'userId', `bookmark`.`user_id`
            )
          )
        )
      FROM `bookmark`
      WHERE
        bookmark.link_id = link.id
        AND (
          bookmark.isPrivate IS NOT TRUE
          OR
          bookmark.user_id = $SESSION_ID
        )
    ) AS bookmarksRelated
  FROM bookmark
  INNER JOIN `link` ON bookmark.link_id = link.id
  LEFT JOIN bookmark_tag ON bookmark.id = bookmark_tag.bookmark_id
  LEFT JOIN tag ON tag.id = bookmark_tag.tag_id
  INNER JOIN domain ON link.domain_id = domain.id
  WHERE
    JSON_CONTAINS($BOOKMARK_IDS, JSON_QUOTE(CONVERT(bookmark.id, CHAR)))
    AND
      (
        bookmark.isPrivate IS NOT TRUE
        OR
        bookmark.`user_id` = $SESSION_ID
      )
  GROUP BY link.id
  ;

END

-- DELIMITER ;

-- CALL bookmark_get_by_ids("e4e2bb46-c210-4a47-9e84-f45c789fcec1", '["1", "2", "3", "4"]');