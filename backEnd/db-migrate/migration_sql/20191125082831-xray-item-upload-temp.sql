
CREATE TABLE wiprocurement.xray_item_upload_temp (
  upload_id uuid NOT NULL,
  "file_name" varchar(50) NOT NULL,
  "no" int NULL,
  pur_group varchar(20) NULL,
  oem_odm varchar(20) NULL,
  type1 varchar(20) NULL,
  type2 varchar(20) NULL,
  wistron_pn varchar(20) NOT NULL,
  description varchar(200) NULL,
  vendor_name varchar(100) NULL,
  manufacturer varchar(100) NULL,
  vendor_pn varchar(100) NULL,
  upload_time timestamptz NOT NULL DEFAULT now(),
  last_price numeric ,
  currency varchar(20) NULL,
  pass bool NULL DEFAULT false,
  vaild_from varchar(50) NULL
);


