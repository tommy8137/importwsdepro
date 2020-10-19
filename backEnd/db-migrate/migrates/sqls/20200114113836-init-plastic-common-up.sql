-- housing_plastic_material
update formula.parameter_value pv2
set value = '0'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'fcst_allowance'
) a
where a.id = pv2.id;
-- housing_plastic_management_and_profit
update formula.parameter_value pv2
set value = '0.15'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'management_and_profit'
) a
where a.id = pv2.id;
-- housing_plastic_paint
-- 噴漆塗料損耗
update formula.parameter_value pv2
set value = '0.2'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'paint_single_finishing_loss_rate'
) a
where a.id = pv2.id;
-- 固含量比例
update formula.parameter_value pv2
set value = '0.25'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'paint_printingable_amount_ratio'
) a
where a.id = pv2.id;
--UV_painting 固含量比例
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_uv_painting_ratio', '%', 'UV_painting固含量比例', '塗裝噴漆費_UV_painting 固含量比例', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'DT')),
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_uv_painting_ratio', '%', 'UV_painting固含量比例', '塗裝噴漆費_UV_painting 固含量比例', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'AIO'));

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_uv_painting_ratio') and product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and "name" = 'housing_plastic_dt_init'), '0.30', 'number', 'common_parameter', now()),
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_uv_painting_ratio') and product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and "name" = 'housing_plastic_aio_init'), '0.30', 'number', 'common_parameter', now());
-- 塗裝噴漆費 噴塗不良率
update formula.parameter_value pv2
set value = '0.2'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'paint_failure_rate'
) a
where a.id = pv2.id;
--Powder coating 固含量比例
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_power_coating_ratio', '%', 'Powder coating 固含量比例', '塗裝噴漆費_Powder coating 固含量比例', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'DT')),
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_power_coating_ratio', '%', 'Powder coating 固含量比例', '塗裝噴漆費_Powder coating 固含量比例', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'AIO'));

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_power_coating_ratio') and product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and "name" = 'housing_plastic_dt_init'), '1', 'number', 'common_parameter', now()),
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_power_coating_ratio') and product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and "name" = 'housing_plastic_aio_init'), '1', 'number', 'common_parameter', now());
--Powder coating 塗裝噴漆費 噴塗不良率
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_power_coating_failure_rate', '%', 'Powder coating 噴塗不良率', '塗裝噴漆費_Powder coating 噴塗不良率', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'DT')),
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_power_coating_failure_rate', '%', 'Powder coating 噴塗不良率', '塗裝噴漆費_Powder coating 噴塗不良率', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'AIO'));

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_power_coating_failure_rate') and product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and "name" = 'housing_plastic_dt_init'), '0.1', 'number', 'common_parameter', now()),
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_power_coating_failure_rate') and product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and "name" = 'housing_plastic_aio_init'), '0.1', 'number', 'common_parameter', now());
--密度
update formula.parameter_value pv2
set value = '1.05'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'paint_printingable_amount_density'
) a
where a.id = pv2.id;
--Powder coating密度
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_power_coating_density', 'g/cm3', 'Powder coating密度', '塗裝噴漆費_Powder coating密度', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'DT')),
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_power_coating_density', 'g/cm3', 'Powder coating密度', '塗裝噴漆費_Powder coating密度', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'AIO'));

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_power_coating_density') and product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and "name" = 'housing_plastic_dt_init'), '1.5', 'number', 'common_parameter', now()),
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_power_coating_density') and product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and "name" = 'housing_plastic_aio_init'), '1.5', 'number', 'common_parameter', now());
--面積寬放(L)
update formula.parameter_value pv2
set value = '15'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'paint_top_area_L'
) a
where a.id = pv2.id;
--面積寬放(W)
update formula.parameter_value pv2
set value = '15'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'paint_top_area_W'
) a
where a.id = pv2.id;
--面積寬放(W)
update formula.parameter_value pv2
set value = '20'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'paint_single_finishing_loss_rate'
) a
where a.id = pv2.id;
-- Cycle Time
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_cycle_time', 'sec', 'Cycle Time', '塗裝噴漆費_Cycle Time', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'DT')),
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_cycle_time', 'sec', 'Cycle Time', '塗裝噴漆費_Cycle Time', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'AIO'));

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_cycle_time') and product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and "name" = 'housing_plastic_dt_init'), '50', 'number', 'common_parameter', now()),
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_cycle_time') and product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and "name" = 'housing_plastic_aio_init'), '50', 'number', 'common_parameter', now());
-- housing_plastic_secondary_processing
-- all lost rate
update formula.parameter_value pv2
set value = '0'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp.part_type = 'housing_plastic_secondary_processing'
	and cp."label" like '%_loss_rate'
) a
where a.id = pv2.id;
--Bonding 單價
update formula.parameter_value pv2
set value = '0.3'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'bonding_cost'
) a
where a.id = pv2.id;
--NCVM製程 單價
update formula.parameter_value pv2
set value = '0.0004'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'NCVM_cost'
) a
where a.id = pv2.id;
--NCVM面積寬放(L)

update formula.parameter_value pv2
set value = '6'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'NCVM_paint_top_area_L'
) a
where a.id = pv2.id;
--NCVM面積寬放(W)

update formula.parameter_value pv2
set value = '6'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'NCVM_paint_top_area_W'
) a
where a.id = pv2.id;
--Polish應力痕 單價
update formula.parameter_value pv2
set value = '0.05'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'polish_strss_line_cost'
) a
where a.id = pv2.id;
--局部加工 CNC Area 單價
update formula.parameter_value pv2
set value = '0.065'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'cnc_processing_area_cost'
) a
where a.id = pv2.id;
--局部加工 CNC人工單價
update formula.parameter_value pv2
set value = '0.065'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'cnc_processing_manual_cost'
) a
where a.id = pv2.id;
--滾邊 or 去毛 單價
update formula.parameter_value pv2
set value = '0.05'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'edging_cost'
) a
where a.id = pv2.id;
--熱熔 單價
update formula.parameter_value pv2
set value = '0.03'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'hot_melt_cost'
) a
where a.id = pv2.id;
--鐳雕(icon) 單價
update formula.parameter_value pv2
set value = '0.045'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'laser_engraving_icon_cost'
) a
where a.id = pv2.id;
--除屑單價
update formula.parameter_value pv2
set value = '0.05'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'chip_removal_cost'
) a
where a.id = pv2.id;
--除料頭 CNC單價
update formula.parameter_value pv2
set value = '0.05'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'cnc_remove_area_cost'
) a
where a.id = pv2.id;
--除料頭 CNC人工單價
update formula.parameter_value pv2
set value = '0.05'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'cnc_remove_manual_cost'
) a
where a.id = pv2.id;

