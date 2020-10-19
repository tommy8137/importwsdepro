/* Replace with your SQL commands */
CREATE TABLE wiprocurement.sapalt_filter (
  itemnum varchar(18) NOT NULL,
  altnum varchar(18) NOT NULL,
  CONSTRAINT sapalt_filter_pk PRIMARY KEY (itemnum, altnum)
);
CREATE INDEX sapalt_filter_altnum_idx ON wiprocurement.sapalt_filter USING btree (altnum);
CREATE INDEX sapalt_filter_itemnum_idx ON wiprocurement.sapalt_filter USING btree (itemnum);


CREATE INDEX sapalt_group_item_num_idx ON wiprocurement.sapalt_group USING btree (item_num);
CREATE INDEX sapalt_group_item_group_idx ON wiprocurement.sapalt_group USING btree (item_group);
