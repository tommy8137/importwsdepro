ALTER TABLE wiprocurement.bom_item ADD COLUMN last_price  json DEFAULT '{}'::json;
ALTER TABLE wiprocurement.bom_item_upload_temp ADD COLUMN last_price  json DEFAULT '{}'::json;