-- housing_plastic_paint
--UV_painting 固含量比例
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_uv_painting_ratio', '%', 'UV_painting固含量比例', '塗裝噴漆費_UV_painting 固含量比例', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'NB'));

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '0.3', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_uv_painting_ratio' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')) b;

--Powder coating 固含量比例
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_power_coating_ratio', '%', 'Powder coating 固含量比例', '塗裝噴漆費_Powder coating 固含量比例', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'NB'));

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '1', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_power_coating_ratio' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')) b;
--Powder coating 塗裝噴漆費 噴塗不良率
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_power_coating_failure_rate', '%', 'Powder coating 噴塗不良率', '塗裝噴漆費_Powder coating 噴塗不良率', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'NB'));

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '0.1', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_power_coating_failure_rate' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')) b;
--Powder coating密度
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_power_coating_density', 'g/cm3', 'Powder coating密度', '塗裝噴漆費_Powder coating密度', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'NB'));

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '1.5', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_power_coating_density' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')) b;

-- Cycle Time
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_cycle_time', 'sec', 'Cycle Time', '塗裝噴漆費_Cycle Time', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'NB'));

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '50', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')) a,
(select * from formula.common_parameter cp where cp."label" = 'paint_cycle_time' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')) b;

