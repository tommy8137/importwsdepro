SET search_path TO formula, public, wiprocurement;
drop table if exists magnet_cut_loss_rate;
drop table if exists magnet_material;
drop table if exists magnet_manpower;

CREATE TABLE IF NOT EXISTS magnet_manpower (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	area_size_begin int not null,
	area_size_end int not null,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT magnet_manpower_pk PRIMARY KEY (id),
	CONSTRAINT magnet_manpower_un UNIQUE (area_size_begin,area_size_end)
);

CREATE TABLE IF NOT EXISTS magnet_material (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	material_name varchar(200) NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT magnet_material_pk PRIMARY KEY (id),
	CONSTRAINT magnet_material_un UNIQUE (material_name)
);

CREATE TABLE IF NOT EXISTS magnet_cut_loss_rate (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	cut_size_begin int not null,
	cut_size_end int not null,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT magnet_cut_loss_rate_pk PRIMARY KEY (id),
	CONSTRAINT magnet_cut_loss_rate_un UNIQUE (cut_size_begin,cut_size_end)
);


delete from formula.parameter_value as pv where activate_date_id in (select id from formula.schedule_date as sd where sd.formula_type_id = (select id from formula.formula_type as ft where ft."name" = 'emc_magnet'));
delete from formula.common_parameter as cp where cp.formula_type_id = (select id from formula.formula_type as ft where ft."name" = 'emc_magnet');
delete from formula.schedule_date as sd where sd.formula_type_id = (select id from formula.formula_type as ft where ft."name" = 'emc_magnet');

--formula_type
INSERT INTO formula.formula_type("name", remark, create_time) VALUES('emc_magnet', null, now()) on conflict do nothing;

--schedule_date
INSERT INTO formula.schedule_date("name", formula_type_id, activate_date, create_time) VALUES('emc_magnet_init', (select id from formula.formula_type where name='emc_magnet'), '1970-01-01', now());

--magnet common
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )), 'emc_magnet_management_and_profit', '', 'management_and_profit', '%', '管銷&利潤', '管銷&利潤', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )), 'emc_magnet_shipping_check', '', 'shipping_check', '%', '運包檢', '運包檢', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )), 'emc_magnet_material', '', 'material_loss_rate', '%', '材料 loss rate', '材料費_lossrate', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )), 'emc_magnet_material', '', 'material_density', 'g/cm3', '材料密度', '材料費_材料密度', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )), 'emc_magnet_secondary_processing', '', 'cut_side_loss_rate', '%', '裁切邊料耗損', '二次加工費_裁切邊料耗損', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )), 'emc_magnet_secondary_processing', '', 'cut_machining_cost', 'USD', '裁切加工費', '二次加工費_裁切加工費', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )), 'emc_magnet_secondary_processing', '', 'magnet_charger_spend_time', NULL, '加工時間(充磁費+人工費)', '二次加工費_加工時間(充磁費+人工費)', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )), 'emc_magnet_secondary_processing', '', 'adhesive_unit_transfer', NULL, '貼背膠 單位換算常數', '二次加工費_貼背膠_3M_9448 單位換算常數', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )), 'emc_magnet_secondary_processing', '', 'adhesive_loss_rate', '%', '貼背膠 loss rate', '二次加工費_貼背膠_3M_9448 單位換算常數', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )), 'emc_magnet_secondary_processing', '', 'adhesive_cost', 'USD', '貼背膠單價', '二次加工費_貼背膠單價', now());
 
 --magnet common paramater
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'emc_magnet_management_and_profit') AND (label = 'management_and_profit')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 0.1, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'emc_magnet_shipping_check') AND (label = 'shipping_check')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 0.1, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'emc_magnet_material') AND (label = 'material_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 0.1, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'emc_magnet_material') AND (label = 'material_density')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 7.58, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'emc_magnet_secondary_processing') AND (label = 'cut_side_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 0.4, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'emc_magnet_secondary_processing') AND (label = 'cut_machining_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 0.0001, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'emc_magnet_secondary_processing') AND (label = 'magnet_charger_spend_time')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 1.66, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'emc_magnet_secondary_processing') AND (label = 'adhesive_unit_transfer')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 100, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'emc_magnet_secondary_processing') AND (label = 'adhesive_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 0.1, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'emc_magnet_secondary_processing') AND (label = 'adhesive_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 0.0012, 'number', 'common_parameter', now());

 
--emc-magnet_manpower
INSERT INTO formula.magnet_manpower (id, area_size_begin, area_size_end, create_time) VALUES (uuid_generate_v1(), '0', '200', now());
 INSERT INTO formula.magnet_manpower (id, area_size_begin, area_size_end, create_time) VALUES (uuid_generate_v1(), '200', '300', now());
 INSERT INTO formula.magnet_manpower (id, area_size_begin, area_size_end, create_time) VALUES (uuid_generate_v1(), '300', '999999', now());

--magnet_manpower paramater
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.magnet_manpower WHERE (area_size_begin = '0') AND (area_size_end = '200')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 0.007, 'number', 'magnet_manpower', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.magnet_manpower WHERE (area_size_begin = '200') AND (area_size_end = '300')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 0.008, 'number', 'magnet_manpower', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.magnet_manpower WHERE (area_size_begin = '300') AND (area_size_end = '999999')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 0.01, 'number', 'magnet_manpower', now());

  --emc magnet_material
 INSERT INTO formula.magnet_material (id, material_name, create_time) VALUES (uuid_generate_v1(), 'N48磁鋼', now());
 INSERT INTO formula.magnet_material (id, material_name, create_time) VALUES (uuid_generate_v1(), 'N52磁鋼', now());

 --emc magnet_material paramater
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.magnet_material WHERE (material_name = 'N48磁鋼')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 35.81, 'number', 'magnet_material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.magnet_material WHERE (material_name = 'N52磁鋼')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 38.51, 'number', 'magnet_material', now());
 
--emc-magnet_cut_loss_rate
 INSERT INTO formula.magnet_cut_loss_rate (id, cut_size_begin, cut_size_end, create_time) VALUES (uuid_generate_v1(), '0', '60', now());
 INSERT INTO formula.magnet_cut_loss_rate (id, cut_size_begin, cut_size_end, create_time) VALUES (uuid_generate_v1(), '60', '100', now());
 INSERT INTO formula.magnet_cut_loss_rate (id, cut_size_begin, cut_size_end, create_time) VALUES (uuid_generate_v1(), '100', '999999', now());

--magnet_manpower cut_loss_rate
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.magnet_cut_loss_rate WHERE (cut_size_begin = '0') AND (cut_size_end = '60')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 0.45, 'number', 'magnet_cut_loss_rate', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.magnet_cut_loss_rate WHERE (cut_size_begin = '60') AND (cut_size_end = '100')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 0.4, 'number', 'magnet_cut_loss_rate', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.magnet_cut_loss_rate WHERE (cut_size_begin = '100') AND (cut_size_end = '999999')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 0.3, 'number', 'magnet_cut_loss_rate', now());
