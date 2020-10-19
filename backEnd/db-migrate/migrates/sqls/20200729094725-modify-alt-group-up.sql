/* Replace with your SQL commands */
/* Replace with your SQL commands */

CREATE TABLE wiprocurement.sapalt_group_tmp (
  item_num varchar(18) NOT NULL,
  item_group uuid,
  update_time timestamptz,
  group_update_time timestamptz default NOW()
);

-- CREATE INDEX sapalt_group_tmp_idx ON wiprocurement.sapalt_group_tmp USING btree (item_group);

insert into wiprocurement.sapalt_group_tmp (item_num, item_group, update_time, group_update_time)
SELECT distinct item_num, item_group, max(update_time) as update_time, now()
FROM wiprocurement.sapalt_group
group by item_group, item_num;

DROP TABLE IF EXISTS wiprocurement.sapalt_group;
ALTER TABLE wiprocurement.sapalt_group_tmp RENAME TO sapalt_group;

ALTER TABLE wiprocurement.sapalt_group ADD CONSTRAINT sapalt_group_pk PRIMARY KEY (item_num);
CREATE INDEX sapalt_group_idx ON wiprocurement.sapalt_group USING btree (item_group);
