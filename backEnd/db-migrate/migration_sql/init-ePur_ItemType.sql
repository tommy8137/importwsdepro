CREATE TABLE IF NOT EXISTS wiprocurement.ePur_ItemType
(
  ITEM VARCHAR(60),
  TYPE1ID VARCHAR(20),
  TYPE2ID VARCHAR(20),
  ACT_FLAG  VARCHAR(3),
  INSDATE timestamp with time zone,
  update_time timestamp with time zone DEFAULT now(),
	update_by character varying(20),
  PRIMARY KEY (ITEM)
);
