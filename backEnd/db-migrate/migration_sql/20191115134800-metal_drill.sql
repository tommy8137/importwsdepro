SET search_path TO formula, public, wiprocurement;
drop view if exists v_metal_material_drill_power_button_cutting;
drop view if exists v_metal_material_drill_tp_cutting;
drop view if exists v_metal_material_drill_fingerprint_hole_cutting;
drop view if exists v_metal_material_drill_power_hole_cutting;
drop view if exists v_metal_material_drill_allside_cutting;
drop view if exists v_tooling_plastic_tax;
drop view if exists v_metal_anode;
drop view if exists v_metal_sand_process;
drop view if exists v_metal_glue_cycle_time;
DROP TABLE IF EXISTS metal_material_drill_feature;
DROP TABLE IF EXISTS metal_material_drill_feature_type;
DROP TABLE IF EXISTS metal_material_drill_type;

CREATE TABLE IF NOT EXISTS metal_material_drill_type (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	name varchar(200) NOT NULL,
	remark varchar(400) NULL,
	drill_type varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT metal_material_drill_type_pk PRIMARY KEY (id),
	CONSTRAINT metal_material_drill_type_un UNIQUE (name)
);


CREATE TABLE IF NOT EXISTS metal_material_drill_feature_type (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	name varchar(200) NOT NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT metal_material_drill_feature_type_pk PRIMARY KEY (id),
	CONSTRAINT metal_material_drill_feature_type_un UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS metal_material_drill_feature (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	material_drill_id uuid NOT NULL,
	material_drill_feature_id uuid NULL,
    remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
    CONSTRAINT tmetal_material_drill_feature_fk FOREIGN KEY (material_drill_id) REFERENCES metal_material_drill_type(id),
	CONSTRAINT metal_material_drill_feature_pk PRIMARY KEY (id),
	CONSTRAINT metal_material_drill_feature_un UNIQUE (material_drill_id, material_drill_feature_id)
);

---metal_material_drill_type
 INSERT INTO formula.metal_material_drill_type (id, name, create_time, drill_type) VALUES (uuid_generate_v1(), 'Power button 鑽切', now(), 'power_button_cutting');
 INSERT INTO formula.metal_material_drill_type (id, name, create_time, drill_type) VALUES (uuid_generate_v1(), 'TP鑽切', now(), 'tp_cutting');
 INSERT INTO formula.metal_material_drill_type (id, name, create_time, drill_type) VALUES (uuid_generate_v1(), '指紋孔鑽切', now(), 'fingerprint_hole_cutting');
 INSERT INTO formula.metal_material_drill_type (id, name, create_time, drill_type) VALUES (uuid_generate_v1(), '電源孔鑽切', now(),'power_hole_cutting');
 INSERT INTO formula.metal_material_drill_type (id, name, create_time, drill_type) VALUES (uuid_generate_v1(), '全週4週邊鑽切', now(),'allside_cutting');

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='drill_cutting_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) ) AND (name = 'housing_metal_init')), 0, 'number', 'common_parameter', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='drill_cutting_loss_rate')), (SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where activate_date <= now() and formula_type_id = (SELECT id FROM formula.formula_type where name='housing_metal')) and name in('housing_metal', 'housing_metal_init')), 0, 'number', 'common_parameter', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='drill_cutting_loss_rate')), (SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where formula_type_id = (SELECT id FROM formula.formula_type where name='housing_metal')) and name in('housing_metal', 'housing_metal_init')), 0, 'number', 'common_parameter', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;

--metal_material_drill_feature_type
INSERT INTO formula.metal_material_drill_feature_type(id, "name", create_time) VALUES(uuid_generate_v1(), '13"', now());
INSERT INTO formula.metal_material_drill_feature_type(id, "name", create_time) VALUES(uuid_generate_v1(), '14"', now());
INSERT INTO formula.metal_material_drill_feature_type(id, "name", create_time) VALUES(uuid_generate_v1(), '15"', now());
INSERT INTO formula.metal_material_drill_feature_type(id, "name", create_time) VALUES(uuid_generate_v1(), '17"', now());


---metal_material_drill_feature
INSERT INTO formula.metal_material_drill_feature (id, material_drill_id, material_drill_feature_id, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'Power button 鑽切')), (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '13"')), now());
 INSERT INTO formula.metal_material_drill_feature (id, material_drill_id, material_drill_feature_id, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'Power button 鑽切')), (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '14"')), now());
 INSERT INTO formula.metal_material_drill_feature (id, material_drill_id, material_drill_feature_id, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'Power button 鑽切')), (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '15"')), now());
 INSERT INTO formula.metal_material_drill_feature (id, material_drill_id, material_drill_feature_id, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'Power button 鑽切')), (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '17"')), now());
 INSERT INTO formula.metal_material_drill_feature (id, material_drill_id, material_drill_feature_id, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'TP鑽切')), (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '13"')), now());
 INSERT INTO formula.metal_material_drill_feature (id, material_drill_id, material_drill_feature_id, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'TP鑽切')), (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '14"')), now());
 INSERT INTO formula.metal_material_drill_feature (id, material_drill_id, material_drill_feature_id, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'TP鑽切')), (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '15"')), now());
 INSERT INTO formula.metal_material_drill_feature (id, material_drill_id, material_drill_feature_id, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'TP鑽切')), (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '17"')), now());
 INSERT INTO formula.metal_material_drill_feature (id, material_drill_id, material_drill_feature_id, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.metal_material_drill_type WHERE (name = '指紋孔鑽切')), (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '指紋孔鑽切')), now());
 INSERT INTO formula.metal_material_drill_feature (id, material_drill_id, material_drill_feature_id, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.metal_material_drill_type WHERE (name = '電源孔鑽切')), (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '電源孔鑽切')), now());
 INSERT INTO formula.metal_material_drill_feature (id, material_drill_id, material_drill_feature_id, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.metal_material_drill_type WHERE (name = '全週4週邊鑽切')), (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '13"')), now());
 INSERT INTO formula.metal_material_drill_feature (id, material_drill_id, material_drill_feature_id, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.metal_material_drill_type WHERE (name = '全週4週邊鑽切')), (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '14"')), now());
 INSERT INTO formula.metal_material_drill_feature (id, material_drill_id, material_drill_feature_id, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.metal_material_drill_type WHERE (name = '全週4週邊鑽切')), (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '15"')), now());
 INSERT INTO formula.metal_material_drill_feature (id, material_drill_id, material_drill_feature_id, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.metal_material_drill_type WHERE (name = '全週4週邊鑽切')), (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '17"')), now());

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'Power button 鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '13"')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) ) AND (name = 'housing_metal_init')), 0.12, 'number', 'metal_material_drill_feature', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'Power button 鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '14"')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) ) AND (name = 'housing_metal_init')), 0.12, 'number', 'metal_material_drill_feature', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'Power button 鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '15"')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) ) AND (name = 'housing_metal_init')), 0.14, 'number', 'metal_material_drill_feature', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'Power button 鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '17"')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) ) AND (name = 'housing_metal_init')), 0.15, 'number', 'metal_material_drill_feature', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'TP鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '13"')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) ) AND (name = 'housing_metal_init')), 0.22, 'number', 'metal_material_drill_feature', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'TP鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '14"')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) ) AND (name = 'housing_metal_init')), 0.22, 'number', 'metal_material_drill_feature', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'TP鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '15"')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) ) AND (name = 'housing_metal_init')), 0.23, 'number', 'metal_material_drill_feature', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'TP鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '17"')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) ) AND (name = 'housing_metal_init')), 0.27, 'number', 'metal_material_drill_feature', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '指紋孔鑽切'))) AND (material_drill_feature_id is null)), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) ) AND (name = 'housing_metal_init')), 0.11, 'number', 'metal_material_drill_feature', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '電源孔鑽切'))) AND (material_drill_feature_id is null)), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) ) AND (name = 'housing_metal_init')), 0.11, 'number', 'metal_material_drill_feature', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '全週4週邊鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '13"')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) ) AND (name = 'housing_metal_init')), 0.8, 'number', 'metal_material_drill_feature', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '全週4週邊鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '14"')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) ) AND (name = 'housing_metal_init')), 0.85, 'number', 'metal_material_drill_feature', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '全週4週邊鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '15"')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) ) AND (name = 'housing_metal_init')), 0.85, 'number', 'metal_material_drill_feature', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '全週4週邊鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '17"')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) ) AND (name = 'housing_metal_init')), 1, 'number', 'metal_material_drill_feature', now());


  INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'Power button 鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '13"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where activate_date <= now() and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')), 0.12, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'Power button 鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '14"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where activate_date <= now() and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')), 0.12, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'Power button 鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '15"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where activate_date <= now() and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')), 0.14, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'Power button 鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '17"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where activate_date <= now() and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')), 0.15, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'TP鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '13"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where activate_date <= now() and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')), 0.22, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'TP鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '14"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where activate_date <= now() and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')), 0.22, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'TP鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '15"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where activate_date <= now() and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')), 0.23, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'TP鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '17"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where activate_date <= now() and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')), 0.27, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '指紋孔鑽切'))) AND (material_drill_feature_id is null)), (SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where activate_date <= now() and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal') ), 0.11, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '電源孔鑽切'))) AND (material_drill_feature_id is null)), (SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where activate_date <= now() and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')), 0.11, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '全週4週邊鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '13"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where activate_date <= now() and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal') ), 0.8, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '全週4週邊鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '14"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where activate_date <= now() and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')), 0.85, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '全週4週邊鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '15"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where activate_date <= now() and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')), 0.85, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '全週4週邊鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '17"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where activate_date <= now() and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')), 1, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;

 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'Power button 鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '13"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and name in ('housing_metal', 'housing_metal_init')), 0.12, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'Power button 鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '14"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and name in ('housing_metal', 'housing_metal_init')), 0.12, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'Power button 鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '15"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and name in ('housing_metal', 'housing_metal_init')), 0.14, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'Power button 鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '17"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and name in ('housing_metal', 'housing_metal_init')), 0.15, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'TP鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '13"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and name in ('housing_metal', 'housing_metal_init')), 0.22, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'TP鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '14"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and name in ('housing_metal', 'housing_metal_init')), 0.22, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'TP鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '15"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and name in ('housing_metal', 'housing_metal_init')), 0.23, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = 'TP鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '17"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and name in ('housing_metal', 'housing_metal_init')), 0.27, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '指紋孔鑽切'))) AND (material_drill_feature_id is null)), (SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and name in ('housing_metal', 'housing_metal_init')), 0.11, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '電源孔鑽切'))) AND (material_drill_feature_id is null)), (SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and name in ('housing_metal', 'housing_metal_init')), 0.11, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '全週4週邊鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '13"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and name in ('housing_metal', 'housing_metal_init')), 0.8, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '全週4週邊鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '14"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and name in ('housing_metal', 'housing_metal_init')), 0.85, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '全週4週邊鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '15"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and name in ('housing_metal', 'housing_metal_init')), 0.85, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.metal_material_drill_feature WHERE (material_drill_id = (SELECT id FROM formula.metal_material_drill_type WHERE (name = '全週4週邊鑽切'))) AND (material_drill_feature_id = (SELECT id FROM formula.metal_material_drill_feature_type WHERE (name = '17"')))),(SELECT id FROM formula.schedule_date where activate_date = (SELECT max(activate_date) FROM formula.schedule_date where formula_type_id = (SELECT id FROM formula.formula_type where "name"='housing_metal')) and name in ('housing_metal', 'housing_metal_init')), 1, 'number', 'metal_material_drill_feature', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;


delete from formula.parameter_value where parameter_id in (select id from formula.common_parameter where part_type='housing_metal_secondary_processing' and label='drill_cutting_cost');
delete from formula.common_parameter  where part_type='housing_metal_secondary_processing' and label='drill_cutting_cost';

---cableffc_connector_vendor
update formula.cableffc_connector_vendor set vendor_name='HDD CN FFC ST13113-11101', vendor_pn='ST13113-11101加錫' where connector_type_id=(select id from formula.cableffc_connector_type where type_name='HDD Connector');
update formula.cableffc_connector_vendor set vendor_name='ODD CN FFC ST12113G41100', vendor_pn='ST12113G41100' where connector_type_id=(select id from formula.cableffc_connector_type where type_name='ODD Connector');

GRANT SELECT on all tables in schema formula to emdm;
ALTER DEFAULT PRIVILEGES IN SCHEMA formula GRANT SELECT ON TABLES TO emdm;

drop table if exists formula.me_spec;

CREATE TABLE IF NOT EXISTS formula.me_spec (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	spec_category varchar(200) not null,
    spec_name varchar(200) not null,
    spec_value varchar(200) null,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT me_spec_pk PRIMARY KEY (id),
	CONSTRAINT me_spec_un UNIQUE (spec_category,spec_name)
);

--Material Spec for double_injection  -> getHousingPlasticDoubleInjection
CREATE OR REPLACE VIEW formula.v_double_injection_material_spec as
select ms.id, ms.material_spec_name as name, ms.disable_time from formula.material_spec ms where ms.material_spec_name in ('PC', 'TPEE', 'TPU');

--Material for double_injection -> getHousingPlasticDoubleInjection
CREATE OR REPLACE VIEW formula.v_double_injection_material as
select m.id as material_id, m.material_spec_id, ms.material_spec_name, m.material_name as material_name, m.disable_time from formula.material m, formula.material_spec ms where 
m.material_spec_id = ms.id and
m.material_spec_id in (select ms.id from formula.material_spec ms where ms.material_spec_name in ('PC', 'TPEE', 'TPU'));

-- 保稅/非保稅
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_tooling_tax', '保稅', '');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_tooling_tax', '非保稅', '');

CREATE OR REPLACE VIEW formula.v_tooling_plastic_tax as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'plastic_tooling_tax';

--陽極顏色 -> getFirstAnodeColor, getSecondAnodeColor 
CREATE OR REPLACE VIEW formula.v_metal_andoe_color as
select mac.id, mac."name", mac.disable_time from formula.metal_anode_color mac;
--陽極製程 -> YAML
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('metal_anode_process', '二陽', '1');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('metal_anode_process', '預陽', '0.5');

CREATE OR REPLACE VIEW formula.v_metal_anode as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'metal_anode_process';

--噴砂面數 -> YAML
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('metal_sand_process', '單面', '1');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('metal_sand_process', '雙面', '2');

CREATE OR REPLACE VIEW formula.v_metal_sand_process as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'metal_sand_process';

--噴漆顏色 -> getMetalPaint
CREATE OR REPLACE VIEW formula.v_metal_painting as
select mp.id, mp.painting_name as name, mp.disable_time from formula.metal_painting mp;

--熱壓膠水型號 -> getGlue
CREATE OR REPLACE VIEW formula.v_metal_glue as
select mg.id, mg.glue_name as name, mg.disable_time from formula.metal_glue mg;
--針筒內徑 -> getGlueSyringeDiameter
CREATE OR REPLACE VIEW formula.v_metal_glue_syringe_diameter as
select ms.id, ms.syringe_name as name, ms.disable_time from formula.metal_syringe ms;
--鑽切 電源鈕 -> getMetalDrill
CREATE OR REPLACE VIEW formula.v_metal_material_drill_power_button_cutting as
select mmdf.id, concat(mmdt."name", mmdft."name") as name, mmdf.disable_time from formula.metal_material_drill_type mmdt, formula.metal_material_drill_feature mmdf
left join formula.metal_material_drill_feature_type mmdft on mmdft.id = mmdf.material_drill_feature_id
where mmdf.material_drill_id = mmdt.id
and mmdt.drill_type = 'power_button_cutting';

--鑽切 TP -> getMetalDrill
CREATE OR REPLACE VIEW formula.v_metal_material_drill_tp_cutting as
select mmdf.id, concat(mmdt."name", mmdft."name") as name, mmdf.disable_time from formula.metal_material_drill_type mmdt, formula.metal_material_drill_feature mmdf
left join formula.metal_material_drill_feature_type mmdft on mmdft.id = mmdf.material_drill_feature_id
where mmdf.material_drill_id = mmdt.id
and mmdt.drill_type = 'tp_cutting';

--鑽切 電源孔 -> getMetalDrill
CREATE OR REPLACE VIEW formula.v_metal_material_drill_power_hole_cutting as
select mmdf.id, concat(mmdt."name", mmdft."name") as name, mmdf.disable_time from formula.metal_material_drill_type mmdt, formula.metal_material_drill_feature mmdf
left join formula.metal_material_drill_feature_type mmdft on mmdft.id = mmdf.material_drill_feature_id
where mmdf.material_drill_id = mmdt.id
and mmdt.drill_type = 'power_hole_cutting';

--鑽切 指紋孔 -> getMetalDrill
CREATE OR REPLACE VIEW formula.v_metal_material_drill_fingerprint_hole_cutting as
select mmdf.id, concat(mmdt."name", mmdft."name") as name, mmdf.disable_time from formula.metal_material_drill_type mmdt, formula.metal_material_drill_feature mmdf
left join formula.metal_material_drill_feature_type mmdft on mmdft.id = mmdf.material_drill_feature_id
where mmdf.material_drill_id = mmdt.id
and mmdt.drill_type = 'fingerprint_hole_cutting';

--鑽切 四周 -> getMetalDrill
CREATE OR REPLACE VIEW formula.v_metal_material_drill_allside_cutting as
select mmdf.id, concat(mmdt."name", mmdft."name") as name, mmdf.disable_time from formula.metal_material_drill_type mmdt, formula.metal_material_drill_feature mmdf
left join formula.metal_material_drill_feature_type mmdft on mmdft.id = mmdf.material_drill_feature_id
where mmdf.material_drill_id = mmdt.id
and mmdt.drill_type = 'allside_cutting';

--cycle time
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('metal_glue_cycle_time', '90sec', '90');

CREATE OR REPLACE VIEW formula.v_metal_glue_cycle_time as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'metal_glue_cycle_time';


--plastic 噴漆類型type =>
CREATE OR REPLACE VIEW formula.v_plastic_painting_type as
select ppt.id, ppt.type_name as name, ppt.disable_time from formula.plastic_paint_type ppt;

--plastic color色系
CREATE OR REPLACE VIEW formula.v_plastic_painting_color as
select ppc.id as color_id, ppc.color_name as name, ppc.disable_time, pptc.paint_type_id from formula.plastic_paint_color ppc, formula.plastic_paint_type_color pptc where pptc.paint_color_id = ppc.id;

--plastic paint vendor
CREATE OR REPLACE VIEW formula.v_plastic_painting_vendor as
select ppv.id, ppv.vendor_name as name, ppv.disable_time from formula.plastic_paint_vendor ppv;


--update product type
update formula.product_type set type_name='AIO' where type_name='OTHERS';

