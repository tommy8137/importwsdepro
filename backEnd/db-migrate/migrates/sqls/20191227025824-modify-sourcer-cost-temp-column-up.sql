ALTER TABLE wiprocurement.bom_sourcer_cost_temp 
ALTER COLUMN bom_id TYPE integer Using bom_id::integer,
ALTER COLUMN bom_item_id TYPE VARCHAR(64),
ALTER COLUMN sourcer_remark TYPE VARCHAR