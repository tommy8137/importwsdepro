/* Replace with your SQL commands */
ALTER TABLE wiprocurement.sapalt DROP CONSTRAINT sapalt_pkey;
ALTER TABLE wiprocurement.sapalt RENAME TO sapalt_2020_07_16;
ALTER TABLE wiprocurement.sapalt_2020_07_16 ADD CONSTRAINT sapalt_tmp_pkey PRIMARY KEY (mfg_num, item_num, alt_num);

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
  expiry_date timestamp with time zone,
  sap_tran_status varchar(5),
  tran_status varchar(5),
  fg_rev varchar(10),
  fg_seq varchar(10),
  creator varchar(50),
  last_update timestamp with time zone,
  last_modifier varchar(50),
  update_time timestamp with time zone,
  update_by character varying COLLATE pg_catalog."default",
  CONSTRAINT sapalt_pkey PRIMARY KEY (run_serial, mfg_num, item_num, alt_num)
);
