update formula.common_parameter cp
set disable_time = now()
where cp."label" in ('paint_single_bottom_failure_rate', 'paint_single_finishing_failure_rate');

update formula.common_parameter cp
set disable_time = now()
where cp."label" in ('cnc_PL_cycle_time_numerator', 'cnc_5_axis_core_side_cost', 'grinding_auto_speed', 'grinding_manual_speed', 'drill_cuttin_cycle_time_numerator')
and cp.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO'));