ALTER TABLE wiprocurement.bom_item_upload_temp ADD COLUMN need_part_list BOOLEAN DEFAULT FALSE;
ALTER TABLE wiprocurement.bom_item_upload_temp ADD COLUMN formate character varying(100) COLLATE pg_catalog."default";
ALTER TABLE wiprocurement.bom_partlist_value ADD COLUMN formate character varying(100) COLLATE pg_catalog."default";

