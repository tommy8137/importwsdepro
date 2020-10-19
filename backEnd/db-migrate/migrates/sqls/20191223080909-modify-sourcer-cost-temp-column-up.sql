ALTER TABLE wiprocurement.bom_sourcer_cost_temp
DROP COLUMN IF EXISTS bom_id,
ADD COLUMN IF NOT EXISTS bom_id varchar(64)