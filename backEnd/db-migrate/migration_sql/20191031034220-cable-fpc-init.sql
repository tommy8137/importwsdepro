SET search_path TO formula, public, wiprocurement;
drop table if exists cablefpc_material;
drop table if exists cablefpc_shielding;

CREATE TABLE IF NOT EXISTS cablefpc_shielding (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	shielding_name varchar(200) not NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT cablefpc_shielding_pk PRIMARY KEY (id),
	CONSTRAINT cablefpc_shielding_un UNIQUE (shielding_name)
);

CREATE TABLE IF NOT EXISTS cablefpc_material (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	material_name varchar(200) NULL,
    part_category_2_id uuid not null,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT cablefpc_material_pk PRIMARY KEY (id),
    CONSTRAINT cablefpc_material_fk FOREIGN KEY (part_category_2_id) REFERENCES part_category_2(id),
	CONSTRAINT cablefpc_material_un UNIQUE (material_name)
);

delete from formula.parameter_value as pv where activate_date_id in (select id from formula.schedule_date as sd where sd.formula_type_id = (select id from formula.formula_type as ft where ft."name" = 'cable_fpc'));
delete from formula.common_parameter as cp where cp.formula_type_id = (select id from formula.formula_type as ft where ft."name" = 'cable_fpc');
delete from formula.schedule_date as sd where sd.formula_type_id = (select id from formula.formula_type as ft where ft."name" = 'cable_fpc');

--formula_type
INSERT INTO formula.formula_type("name", remark, create_time) VALUES('cable_fpc', null, now()) on conflict do nothing;

--schedule_date
INSERT INTO formula.schedule_date("name", formula_type_id, activate_date, create_time) VALUES('cable_fpc_init', (select id from formula.formula_type where name='cable_fpc'), '1970-01-01', now());

-- INSERT INTO formula.schedule_date("name", formula_type_id, activate_date, create_time) VALUES('fpc', (select id from formula.formula_type where name='thermal_module'), '2019-10-26', now());

 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_management_and_profit', '', 'management_and_profit', '%', '管銷利潤', 'total管銷&利潤常數', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_auxiliary_materials', '', 'assembly_cost', 'USD/min', '每件組裝工時花費(USD/min)', '輔料費_每件組裝工時花費', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_auxiliary_materials', '', 'fpc_bend_cost', 'USD', 'FPC 折彎(次)U/P費', '輔料費_FPC折彎費', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_auxiliary_materials', '', 'fpc_print_cost', 'USD', 'FPC 印刷(面)U/P費', '輔料費_FPC印刷(面)費', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_auxiliary_materials', '', 'fpc_stop_line_cost', 'USD', 'FPC 停止線(條)U/P費', '輔料費_FPC停止線(條)費', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_auxiliary_materials', '', 'material_loss_rate', '%', '導體 Loss Rate(%)', '輔料費_lossrate', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_auxiliary_materials', '', 'shielding_assy_time', 'sec', 'Shielding Assy time', '輔料費_Shielding_assy_time', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_auxiliary_materials', '', 'stiffener_assy_time', 'sec', 'FPC 補強板Assy time', '輔料費_補強板_assy_time', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_auxiliary_materials', '', 'label_assy_time', 'sec', 'FPC Label Assy time', '輔料費_label_assy_time', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_auxiliary_materials', '', 'adhesive_assy_time', 'sec', 'FPC 背膠 Assy time', '輔料費_背膠_assy_time', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_auxiliary_materials', '', 'stiffener_cost', 'USD', 'FPC 補強板花費', '輔料費_補強板_花費', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_auxiliary_materials', '', 'label_cost', 'USD', 'FPC Label花費', '輔料費_label_花費', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_auxiliary_materials', '', 'adhesive_cost', 'USD', 'FPC 背膠花費', '輔料費_背膠_花費', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_auxiliary_materials', '', 'stiffener_loss_rate', '%', 'FPC 補強板 loss rate', '輔料費_補強板_loss rate', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_auxiliary_materials', '', 'label_loss_rate', '%', 'FPC Label loss rate', '輔料費_label_loss rate', now());
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_auxiliary_materials', '', 'adhesive_loss_rate', '%', 'FPC 背膠 loss rate', '輔料費_背膠_loss rate', now());
update formula.parameter_value set value='0.045' where parameter_id = (select id from formula.common_parameter where part_type='cable_fpc_auxiliary_materials' and label='assembly_cost');
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_auxiliary_materials', '', 'assembly_spend_time', 'sec', 'FPC 時間單位換算', '輔料費_時間單位換算', now());
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )), 'cable_fpc_auxiliary_materials', '', 'area_unit_transfer_constant', '', '面積單位換算常數', '加工費_面積單位換算常數', now());

--paramater value
  INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_management_and_profit') AND (label='management_and_profit')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 0.1, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_auxiliary_materials') AND (label='assembly_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 0, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_auxiliary_materials') AND (label='fpc_bend_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 0.02, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_auxiliary_materials') AND (label='fpc_print_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 0.004, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_auxiliary_materials') AND (label='fpc_stop_line_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 0.008, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_auxiliary_materials') AND (label='material_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 0.03, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_auxiliary_materials') AND (label='shielding_assy_time')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 0, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_auxiliary_materials') AND (label='stiffener_assy_time')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 4, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_auxiliary_materials') AND (label='label_assy_time')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 12, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_auxiliary_materials') AND (label='adhesive_assy_time')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 12, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_auxiliary_materials') AND (label='stiffener_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 0.01, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_auxiliary_materials') AND (label='label_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 0.001, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_auxiliary_materials') AND (label='adhesive_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 1.5, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_auxiliary_materials') AND (label='stiffener_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 0.015, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_auxiliary_materials') AND (label='label_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 0.015, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_auxiliary_materials') AND (label='adhesive_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 0.015, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_auxiliary_materials') AND (label='assembly_spend_time')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 60, 'number', 'common_parameter', now());
  INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'cable_fpc_auxiliary_materials') AND (label='area_unit_transfer_constant')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 1000000, 'number', 'common_parameter', now());
 
 --cablefpc_material
INSERT INTO formula.cablefpc_material (id, material_name, create_time, part_category_2_id) VALUES (uuid_generate_v1(), 'Single side (單面板、一般材料)', now(), (select id from formula.part_category_2 where category_name = 'FPC' and part_category_1_id = (select id from formula.part_category_1 where category_name='Cable')));
 INSERT INTO formula.cablefpc_material (id, material_name, create_time, part_category_2_id) VALUES (uuid_generate_v1(), 'Double side (雙面板、一般材料)', now(), (select id from formula.part_category_2 where category_name = 'FPC' and part_category_1_id = (select id from formula.part_category_1 where category_name='Cable')));
 INSERT INTO formula.cablefpc_material (id, material_name, create_time, part_category_2_id) VALUES (uuid_generate_v1(), '3層板 (單面板+雙面板 , 一般材料)', now(), (select id from formula.part_category_2 where category_name = 'FPC' and part_category_1_id = (select id from formula.part_category_1 where category_name='Cable')));

--parameter_value
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.cablefpc_material WHERE (material_name = 'Single side (單面板、一般材料)')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 170, 'number', 'cablefpc_material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.cablefpc_material WHERE (material_name = 'Double side (雙面板、一般材料)')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 300, 'number', 'cablefpc_material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.cablefpc_material WHERE (material_name = '3層板 (單面板+雙面板 , 一般材料)')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 670, 'number', 'cablefpc_material', now());
 
--cablefpc_shielding
INSERT INTO formula.cablefpc_shielding (id, shielding_name, create_time) VALUES (uuid_generate_v1(), 'NA', now());
 INSERT INTO formula.cablefpc_shielding (id, shielding_name, create_time) VALUES (uuid_generate_v1(), '銀漿+mask', now());
 INSERT INTO formula.cablefpc_shielding (id, shielding_name, create_time) VALUES (uuid_generate_v1(), '銀箔', now());

--cablefpc_shielding paramater value
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.cablefpc_shielding WHERE (shielding_name = 'NA')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 0, 'number', 'cablefpc_shielding', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.cablefpc_shielding WHERE (shielding_name = '銀漿+mask')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 26, 'number', 'cablefpc_shielding', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.cablefpc_shielding WHERE (shielding_name = '銀箔')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'cable_fpc' )) ) AND (name = 'cable_fpc_init')), 53, 'number', 'cablefpc_shielding', now());
