-- housing_metal_painting
--UV_painting 固含量比例
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', NULL, 'paint_uv_painting_ratio', '%', 'UV_painting固含量比例', '塗裝噴漆費_UV_painting 固含量比例', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'DT'));

INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', NULL, 'paint_uv_painting_ratio', '%', 'UV_painting固含量比例', '塗裝噴漆費_UV_painting 固含量比例', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'AIO'));

INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', NULL, 'paint_uv_painting_ratio', '%', 'UV_painting固含量比例', '塗裝噴漆費_UV_painting 固含量比例', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'Server'));

INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', NULL, 'paint_uv_painting_ratio', '%', 'UV_painting固含量比例', '塗裝噴漆費_UV_painting 固含量比例', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'VoIP'));


INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '0.3', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_uv_painting_ratio' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '0.3', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_uv_painting_ratio' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '0.3', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'Server')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_uv_painting_ratio' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'Server') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '0.3', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'VoIP')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_uv_painting_ratio' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'VoIP') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

--Powder coating 固含量比例
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_painting', NULL, 'paint_power_coating_ratio', '%', 'Powder coating 固含量比例', '塗裝噴漆費_Powder coating 固含量比例', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'DT'));

INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_painting', NULL, 'paint_power_coating_ratio', '%', 'Powder coating 固含量比例', '塗裝噴漆費_Powder coating 固含量比例', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'AIO'));

INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_painting', NULL, 'paint_power_coating_ratio', '%', 'Powder coating 固含量比例', '塗裝噴漆費_Powder coating 固含量比例', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'Server'));

INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_painting', NULL, 'paint_power_coating_ratio', '%', 'Powder coating 固含量比例', '塗裝噴漆費_Powder coating 固含量比例', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'VoIP'));

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '1', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_power_coating_ratio' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '1', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_power_coating_ratio' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '1', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'Server')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_power_coating_ratio' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'Server') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '1', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'VoIP')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_power_coating_ratio' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'VoIP') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

--Powder coating 塗裝噴漆費 噴塗不良率
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_painting', NULL, 'paint_power_coating_failure_rate', '%', 'Powder coating 噴塗不良率', '塗裝噴漆費_Powder coating 噴塗不良率', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'DT'));

INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_painting', NULL, 'paint_power_coating_failure_rate', '%', 'Powder coating 噴塗不良率', '塗裝噴漆費_Powder coating 噴塗不良率', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'AIO'));

INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_painting', NULL, 'paint_power_coating_failure_rate', '%', 'Powder coating 噴塗不良率', '塗裝噴漆費_Powder coating 噴塗不良率', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'Server'));

INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_painting', NULL, 'paint_power_coating_failure_rate', '%', 'Powder coating 噴塗不良率', '塗裝噴漆費_Powder coating 噴塗不良率', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'VoIP'));


INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '0.1', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_power_coating_failure_rate' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '0.1', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_power_coating_failure_rate' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '0.1', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'Server')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_power_coating_failure_rate' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'Server') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '0.1', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'VoIP')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_power_coating_failure_rate' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'VoIP') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

--Powder coating密度
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_painting', NULL, 'paint_power_coating_density', 'g/cm3', 'Powder coating密度', '塗裝噴漆費_Powder coating密度', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'DT'));

INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_painting', NULL, 'paint_power_coating_density', 'g/cm3', 'Powder coating密度', '塗裝噴漆費_Powder coating密度', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'AIO'));

INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_painting', NULL, 'paint_power_coating_density', 'g/cm3', 'Powder coating密度', '塗裝噴漆費_Powder coating密度', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'Server'));

INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_painting', NULL, 'paint_power_coating_density', 'g/cm3', 'Powder coating密度', '塗裝噴漆費_Powder coating密度', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'VoIP'));

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '1.5', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_power_coating_density' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '1.5', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_power_coating_density' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '1.5', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'Server')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_power_coating_density' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'Server') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '1.5', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'VoIP')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_power_coating_density' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'VoIP') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

-- Cycle Time
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_painting', NULL, 'paint_cycle_time', 'sec', 'Cycle Time', '塗裝噴漆費_Cycle Time', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'DT')),
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_painting', NULL, 'paint_cycle_time', 'sec', 'Cycle Time', '塗裝噴漆費_Cycle Time', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'AIO')),
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_painting', NULL, 'paint_cycle_time', 'sec', 'Cycle Time', '塗裝噴漆費_Cycle Time', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'Server')),
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_painting', NULL, 'paint_cycle_time', 'sec', 'Cycle Time', '塗裝噴漆費_Cycle Time', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'VoIP'));



INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '20', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_cycle_time' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '20', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_cycle_time' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '20', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'Server')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_cycle_time' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'Server') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '20', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'VoIP')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_cycle_time' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'VoIP') and cp.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')) b;


INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_piece_number_at_a_time', 'pcs', '一次可噴成品數量(pcs)', '塗裝噴漆費_一次可噴成品數量(pcs)', (select id from formula.product_type where type_name = 'DT')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_piece_number_at_a_time', 'pcs', '一次可噴成品數量(pcs)', '塗裝噴漆費_一次可噴成品數量(pcs)', (select id from formula.product_type where type_name = 'AIO')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_piece_number_at_a_time', 'pcs', '一次可噴成品數量(pcs)', '塗裝噴漆費_一次可噴成品數量(pcs)', (select id from formula.product_type where type_name = 'Server')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_piece_number_at_a_time', 'pcs', '一次可噴成品數量(pcs)', '塗裝噴漆費_一次可噴成品數量(pcs)', (select id from formula.product_type where type_name = 'VoIP')) on conflict do nothing;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '5', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'housing_metal_painting'
and cp."label" = 'paint_piece_number_at_a_time'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;

-- 噴漆塗料耗損
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_single_finishing_loss_rate', '%', '噴漆塗料損耗', '塗裝噴漆費_單件面漆_噴漆塗料損耗', (select id from formula.product_type where type_name = 'DT')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_single_finishing_loss_rate', '%', '噴漆塗料損耗', '塗裝噴漆費_單件面漆_噴漆塗料損耗', (select id from formula.product_type where type_name = 'AIO')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_single_finishing_loss_rate', '%', '噴漆塗料損耗', '塗裝噴漆費_單件面漆_噴漆塗料損耗', (select id from formula.product_type where type_name = 'Server')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_single_finishing_loss_rate', '%', '噴漆塗料損耗', '塗裝噴漆費_單件面漆_噴漆塗料損耗', (select id from formula.product_type where type_name = 'VoIP'))
on conflict do nothing;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '0.1', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'housing_metal_painting'
and cp."label" = 'paint_single_finishing_loss_rate'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;

-- 固含量比例

INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_printingable_amount_ratio', '%', '固含量比例', '塗裝噴漆費_printingable_amount_固含量比例', (select id from formula.product_type where type_name = 'DT')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_printingable_amount_ratio', '%', '固含量比例', '塗裝噴漆費_printingable_amount_固含量比例', (select id from formula.product_type where type_name = 'AIO')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_printingable_amount_ratio', '%', '固含量比例', '塗裝噴漆費_printingable_amount_固含量比例', (select id from formula.product_type where type_name = 'Server')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_printingable_amount_ratio', '%', '固含量比例', '塗裝噴漆費_printingable_amount_固含量比例', (select id from formula.product_type where type_name = 'VoIP'))
on conflict do nothing;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '0.25', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'housing_metal_painting'
and cp."label" = 'paint_printingable_amount_ratio'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;

-- 塗裝噴漆費_噴塗不良率

INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_failure_rate', '%', '塗裝噴漆費 噴塗不良率', '塗裝噴漆費_噴塗不良率', (select id from formula.product_type where type_name = 'DT')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_failure_rate', '%', '塗裝噴漆費 噴塗不良率', '塗裝噴漆費_噴塗不良率', (select id from formula.product_type where type_name = 'AIO')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_failure_rate', '%', '塗裝噴漆費 噴塗不良率', '塗裝噴漆費_噴塗不良率', (select id from formula.product_type where type_name = 'Server')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_failure_rate', '%', '塗裝噴漆費 噴塗不良率', '塗裝噴漆費_噴塗不良率', (select id from formula.product_type where type_name = 'VoIP'))
on conflict do nothing;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '0.2', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'housing_metal_painting'
and cp."label" = 'paint_failure_rate'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;

-- 塗裝噴漆費_printingable_amount_密度

INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_printingable_amount_density', NULL, '密度', '塗裝噴漆費_printingable_amount_密度', (select id from formula.product_type where type_name = 'DT')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_printingable_amount_density', NULL, '密度', '塗裝噴漆費_printingable_amount_密度', (select id from formula.product_type where type_name = 'AIO')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_printingable_amount_density', NULL, '密度', '塗裝噴漆費_printingable_amount_密度', (select id from formula.product_type where type_name = 'Server')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_printingable_amount_density', NULL, '密度', '塗裝噴漆費_printingable_amount_密度', (select id from formula.product_type where type_name = 'VoIP'))
on conflict do nothing;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '1.05', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'housing_metal_painting'
and cp."label" = 'paint_printingable_amount_density'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;

-- 面積寬放(L)
 
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_top_area_L', NULL, '面積寬放(L)', '塗裝噴漆費_頂面噴塗面積_L', (select id from formula.product_type where type_name = 'DT')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_top_area_L', NULL, '面積寬放(L)', '塗裝噴漆費_頂面噴塗面積_L', (select id from formula.product_type where type_name = 'AIO')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_top_area_L', NULL, '面積寬放(L)', '塗裝噴漆費_頂面噴塗面積_L', (select id from formula.product_type where type_name = 'Server')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_top_area_L', NULL, '面積寬放(L)', '塗裝噴漆費_頂面噴塗面積_L', (select id from formula.product_type where type_name = 'VoIP'))
on conflict do nothing;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '10', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'housing_metal_painting'
and cp."label" = 'paint_top_area_L'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;

-- 面積寬放(W)

INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_top_area_W', NULL, '面積寬放(W)', '塗裝噴漆費_頂面噴塗面積_W', (select id from formula.product_type where type_name = 'DT')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_top_area_W', NULL, '面積寬放(W)', '塗裝噴漆費_頂面噴塗面積_W', (select id from formula.product_type where type_name = 'AIO')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_top_area_W', NULL, '面積寬放(W)', '塗裝噴漆費_頂面噴塗面積_W', (select id from formula.product_type where type_name = 'Server')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_painting', null, 'paint_top_area_W', NULL, '面積寬放(W)', '塗裝噴漆費_頂面噴塗面積_W', (select id from formula.product_type where type_name = 'VoIP'))
on conflict do nothing;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '10', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'housing_metal_painting'
and cp."label" = 'paint_top_area_W'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;

-- NCVM面積寬放(L)

INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'NCVM_paint_top_area_L', NULL, 'NCVM面積寬放(L)', '二次加工費_NCVM面積寬放(L)', (select id from formula.product_type where type_name = 'DT')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'NCVM_paint_top_area_L', NULL, 'NCVM面積寬放(L)', '二次加工費_NCVM面積寬放(L)', (select id from formula.product_type where type_name = 'AIO')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'NCVM_paint_top_area_L', NULL, 'NCVM面積寬放(L)', '二次加工費_NCVM面積寬放(L)', (select id from formula.product_type where type_name = 'Server')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'NCVM_paint_top_area_L', NULL, 'NCVM面積寬放(L)', '二次加工費_NCVM面積寬放(L)', (select id from formula.product_type where type_name = 'VoIP'))
on conflict do nothing;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '6', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'housing_metal_secondary_processing'
and cp."label" = 'NCVM_paint_top_area_L'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;

-- NCVM面積寬放(W)

INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'NCVM_paint_top_area_W', NULL, 'NCVM面積寬放(W)', '二次加工費_NCVM面積寬放(W)', (select id from formula.product_type where type_name = 'DT')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'NCVM_paint_top_area_W', NULL, 'NCVM面積寬放(W)', '二次加工費_NCVM面積寬放(W)', (select id from formula.product_type where type_name = 'AIO')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'NCVM_paint_top_area_W', NULL, 'NCVM面積寬放(W)', '二次加工費_NCVM面積寬放(W)', (select id from formula.product_type where type_name = 'Server')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'NCVM_paint_top_area_W', NULL, 'NCVM面積寬放(W)', '二次加工費_NCVM面積寬放(W)', (select id from formula.product_type where type_name = 'VoIP'))
on conflict do nothing;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '6', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'housing_metal_secondary_processing'
and cp."label" = 'NCVM_paint_top_area_W'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;