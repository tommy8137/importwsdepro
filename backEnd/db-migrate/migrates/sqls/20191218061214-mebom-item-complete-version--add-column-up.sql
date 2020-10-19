ALTER TABLE wiprocurement.bom_item_complete_version
ADD COLUMN IF NOT EXISTS sourcer_shipping numeric,
ADD COLUMN IF NOT EXISTS sourcer_pl numeric,
ADD COLUMN IF NOT EXISTS sourcer_assembly numeric,
ADD COLUMN IF NOT EXISTS sourcer_remark varchar,
ADD COLUMN IF NOT EXISTS sourcer_cost_up numeric,
ADD COLUMN IF NOT EXISTS ce_pl numeric;