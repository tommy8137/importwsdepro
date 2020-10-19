ALTER TABLE wiprocurement.bom_item ADD COLUMN shipping_check_cost  numeric DEFAULT null;
ALTER TABLE wiprocurement.bom_item_complete_version ADD COLUMN shipping_check_cost  numeric DEFAULT null;