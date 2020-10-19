/* Replace with your SQL commands */
drop view view_common_parts;

ALTER TABLE wiprocurement.eedm_common_parts ALTER COLUMN partnumber TYPE varchar(40) USING partnumber::varchar;
ALTER TABLE wiprocurement.eedm_common_parts ALTER COLUMN cate TYPE varchar(40) USING cate::varchar;
ALTER TABLE wiprocurement.eedm_common_parts ALTER COLUMN description TYPE varchar(200) USING description::varchar;

CREATE VIEW wiprocurement.view_common_parts AS
  SELECT distinct partnumber from (
  SELECT ecp.partnumber
    FROM wiprocurement.eedm_common_parts ecp
    UNION ALL SELECT dcp.partnumber
      FROM wiprocurement.database_common_parts dcp
  ) a;
