delete from formula.parameter_value pv
where pv.parameter_id in (select cp.id
from formula.common_parameter cp
where cp.part_type = 'housing_metal_secondary_processing'
and cp.label in ('cnc_core_side_trasnsfer_time', 'cnc_PL_trasnsfer_time', 'grinding_auto_trasnsfer_time', 'grinding_manual_trasnsfer_time')
and cp.product_type_id in (select id from formula.product_type where type_name in ('DT', 'AIO')));

delete from formula.common_parameter cp
where cp.part_type = 'housing_metal_secondary_processing'
and cp.label in ('cnc_core_side_trasnsfer_time', 'cnc_PL_trasnsfer_time', 'grinding_auto_trasnsfer_time', 'grinding_manual_trasnsfer_time')
and cp.product_type_id in (select id from formula.product_type where type_name in ('DT', 'AIO'));
