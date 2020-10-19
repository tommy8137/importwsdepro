CREATE TABLE wiprocurement.sapalt(
  sync_id numeric,
  sync_op varchar(20),
  sync_ts varchar(50),
  run_serial varchar(20),
  ecn_no varchar(15),
  bom_change_type varchar(5),
  mfg_num varchar(20),
  item_num varchar(20),
  position numeric,
  alt_num varchar(20),
  expiry_date date,
  sap_tran_status varchar(5),
  tran_status varchar(5),
  fg_rev varchar(10),
  fg_seq varchar(10),
  creator varchar(50),
  last_update date,
  last_modifier varchar(50),
  update_time timestamp with time zone,
  update_by character varying COLLATE pg_catalog."default",
  CONSTRAINT sapalt_pkey PRIMARY KEY (mfg_num, item_num, alt_num)
);

CREATE INDEX idx_sapalt ON wiprocurement.sapalt(mfg_num, item_num, alt_num);

CREATE TABLE wiprocurement.sapalt_filter (
  itemnum varchar(18) NOT NULL,
  altnum varchar(18) NOT NULL,
  CONSTRAINT sapalt_filter_pk PRIMARY KEY (itemnum, altnum)
);
CREATE INDEX sapalt_filter_altnum_idx ON wiprocurement.sapalt_filter USING btree (altnum);
CREATE INDEX sapalt_filter_itemnum_idx ON wiprocurement.sapalt_filter USING btree (itemnum);

CREATE TABLE wiprocurement.sapalt_price(
  item_num varchar(20),
  alt_num varchar(20),
  lowest_price numeric,
  origin_lowest_price numeric,
  currency varchar(20),
  origin_currency varchar(20),
  valid_from date,
  manufacturer varchar(50),
  grouping json,
  update_time timestamp with time zone,
  update_by character varying COLLATE pg_catalog."default",
  CONSTRAINT sapalt_price_pkey PRIMARY KEY (item_num)
);

CREATE INDEX idx_sapalt_price ON wiprocurement.sapalt_price(item_num);
