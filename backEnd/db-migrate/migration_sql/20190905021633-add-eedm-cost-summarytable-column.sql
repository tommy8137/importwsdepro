ALTER TABLE wiprocurement.eebom_projects
ADD COLUMN IF NOT EXISTS platform character varying;

ALTER TABLE wiprocurement.eedm_cost_summarytable
ADD COLUMN IF NOT EXISTS platform character varying,
ADD COLUMN IF NOT EXISTS panel_size character varying;
