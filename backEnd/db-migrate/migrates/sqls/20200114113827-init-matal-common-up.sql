-- housing_metal_material
update formula.parameter_value pv2
set value = '0.15'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'material_AL_loss_rate'
) a
where a.id = pv2.id;

update formula.parameter_value pv2
set value = '0.03'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'material_Metal_loss_rate'
) a
where a.id = pv2.id;

-- housing_metal_stamping
update formula.parameter_value pv2
set value = '0'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'stage_stamping_loss_rate'
) a
where a.id = pv2.id;

update formula.parameter_value pv2
set value = '0'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'riveting die_loss_rate'
) a
where a.id = pv2.id;

update formula.parameter_value pv2
set value = '0'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'progressive_stamping_loss_rate'
) a
where a.id = pv2.id;

-- housing_metal_secondary_processing
-- all lost rate
update formula.parameter_value pv2
set value = '0'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp.part_type = 'housing_metal_secondary_processing'
	and cp."label" like '%_loss_rate'
	and cp."label" not in ('paint_loss_rate')
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.003'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'cnc_PL_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.003'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'cnc_core_side_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.05'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'pad_printing_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.05'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'pad_printing_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.05'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'screen_printing_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.05'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'silk_print_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.00303'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'thermal_bonding_heat_pressing_machining_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '1'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'two_anodization_treatment_qty'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '35'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'spraying_const'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.0078'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'single_tapping_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.00000084'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'paint_cost_const'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.0078'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'single_rivet_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.0078'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'single_spot_welding_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '5'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'sand_blast_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.0039'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" in ('multi_rivet_cost', 'multi_spot_welding_cost', 'multi_tapping_cost')
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.09'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'paint_black_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '2500'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'paint_black_cycle_ time_area'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '40'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'paint_black_cycle_ time_sec'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.0047'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'grinding_manual_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.0021'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'grinding_auto_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.00078'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'blind_rivet_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.3529'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'ultrasonic_cleaning_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.0017'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'laser_engraving_icon_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '46.61'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'laser_engraving_core_side_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.000071'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'drilling_hole_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.02'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'drilling_hole_const'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.02'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'anode_point_cutting_cost'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '0.5'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'anode_treatment_qty'
) a
where a.id = pv2.id;
--
update formula.parameter_value pv2
set value = '5'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'hair_cost'
) a
where a.id = pv2.id;

-- housing_metal_management_and_profit
--
update formula.parameter_value pv2
set value = '15'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'management_and_profit'
) a
where a.id = pv2.id;
