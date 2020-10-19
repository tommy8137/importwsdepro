ALTER TABLE wiprocurement.bom_item ADD COLUMN suggestion_cost_type  character varying(20) DEFAULT null;
ALTER TABLE wiprocurement.bom_item ADD COLUMN spa_cost  numeric DEFAULT null;
ALTER TABLE wiprocurement.bom_item ADD COLUMN spa_cost_material_remark  character varying(24) DEFAULT null;