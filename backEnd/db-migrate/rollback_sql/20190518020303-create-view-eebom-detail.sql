DROP VIEW wiprocurement.view_eebom_detail;

ALTER TABLE wiprocurement.eebom_detail
ADD COLUMN IF NOT EXISTS suggestion_cost numeric,
ADD COLUMN IF NOT EXISTS sub_total_suggestion_cost numeric;