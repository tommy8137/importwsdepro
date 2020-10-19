/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS wiprocurement.sapalt_group (
  item_num varchar(18) NOT NULL,
  item_group uuid,
  update_time timestamptz,
  group_update_time timestamptz default NOW()
);

DROP TABLE IF EXISTS wiprocurement.sapalt_filter;
