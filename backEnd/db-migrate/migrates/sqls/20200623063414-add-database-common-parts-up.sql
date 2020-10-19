/* Replace with your SQL commands */

CREATE TABLE if not exists wiprocurement.database_common_parts (
  id uuid NOT NULL,
  version_id uuid NOT NULL,
  partnumber varchar
);


CREATE VIEW wiprocurement.view_common_parts AS
  select distinct partnumber from (
  SELECT ecp.partnumber
    FROM wiprocurement.eedm_common_parts ecp
    UNION ALL SELECT dcp.partnumber
      FROM wiprocurement.database_common_parts dcp
  ) a;
