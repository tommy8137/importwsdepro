ALTER TABLE wiprocurement.bom_item_upload_temp ADD COLUMN sku0 numeric;
ALTER TABLE wiprocurement.bom_item_upload_temp ADD COLUMN sku1 numeric;
ALTER TABLE wiprocurement.bom_item_upload_temp ADD COLUMN sku2 numeric;
ALTER TABLE wiprocurement.bom_item_upload_temp ADD COLUMN sku3 numeric;
ALTER TABLE wiprocurement.bom_item_upload_temp ADD COLUMN sku4 numeric;
ALTER TABLE wiprocurement.bom_item_upload_temp ADD COLUMN sku5 numeric;
ALTER TABLE wiprocurement.bom_item_upload_temp ADD COLUMN odm_oem uuid;
ALTER TABLE wiprocurement.bom_item_upload_temp ADD COLUMN initAddModiDel uuid;
ALTER TABLE wiprocurement.bom_item_upload_temp ADD COLUMN part_number character varying(64) COLLATE pg_catalog."default";

ALTER TABLE wiprocurement.bom_item ADD COLUMN sku0 numeric;
ALTER TABLE wiprocurement.bom_item ADD COLUMN sku1 numeric;
ALTER TABLE wiprocurement.bom_item ADD COLUMN sku2 numeric;
ALTER TABLE wiprocurement.bom_item ADD COLUMN sku3 numeric;
ALTER TABLE wiprocurement.bom_item ADD COLUMN sku4 numeric;
ALTER TABLE wiprocurement.bom_item ADD COLUMN sku5 numeric;
ALTER TABLE wiprocurement.bom_item ADD COLUMN odm_oem uuid;
ALTER TABLE wiprocurement.bom_item ADD COLUMN initAddModiDel uuid;
ALTER TABLE wiprocurement.bom_item ADD COLUMN part_number character varying(64) COLLATE pg_catalog."default";


INSERT INTO wiprocurement.drop_down_item VALUES ('7e9a2be0-8105-11e9-9d03-0242ac110002', 'ODM', 'ODMTYPE', 'odm_oem', 'bom_item', '2019-05-28 13:00:21.035933+08', NULL, NULL);
INSERT INTO wiprocurement.drop_down_item VALUES ('842921b0-8105-11e9-9d03-0242ac110002', 'OEM', 'OEMTYPE', 'odm_oem', 'bom_item', '2019-05-28 13:00:30.361605+08', NULL, NULL);
INSERT INTO wiprocurement.drop_down_item VALUES ('27990340-810d-11e9-a346-0242ac110002', 'TBD', 'TBDTYPE', 'odm_oem', 'bom_item', '2019-05-28 13:55:11.038126+08', NULL, NULL);
INSERT INTO wiprocurement.drop_down_item VALUES ('dc2c04fc-8116-11e9-a328-0242ac110002', 'Modify', 'MODIFY', 'initaddmodidel', 'bom_item', '2019-05-28 15:04:39.461298+08', NULL, NULL);
INSERT INTO wiprocurement.drop_down_item VALUES ('e3c5ba82-8116-11e9-a328-0242ac110002', 'Delete', 'DELETE', 'initaddmodidel', 'bom_item', '2019-05-28 15:04:52.215831+08', NULL, NULL);
INSERT INTO wiprocurement.drop_down_item VALUES ('e8dff5c8-8116-11e9-a328-0242ac110002', 'Add', 'ADD', 'initaddmodidel', 'bom_item', '2019-05-28 15:05:00.776341+08', NULL, NULL);
INSERT INTO wiprocurement.drop_down_item VALUES ('ef54198e-8116-11e9-a328-0242ac110002', 'Initial', 'INITIAL', 'initaddmodidel', 'bom_item', '2019-05-28 15:05:11.603777+08', NULL, NULL);

ALTER TABLE wiprocurement.bom_item ALTER COLUMN qty DROP NOT NULL;
ALTER TABLE wiprocurement.bom_item_upload_temp ALTER COLUMN qty DROP NOT NULL;

ALTER TABLE  wiprocurement.bom_item ALTER COLUMN qty SET DEFAULT 0;
ALTER TABLE  wiprocurement.bom_item_upload_temp ALTER COLUMN qty SET DEFAULT 0;
