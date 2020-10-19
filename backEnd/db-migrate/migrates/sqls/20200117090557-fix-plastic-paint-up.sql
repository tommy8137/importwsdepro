--面積寬放(L)
update formula.parameter_value pv2
set value = '0'
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
set value = '0'
from (
	select pv.id from formula.parameter_value pv
	left join formula.common_parameter cp on pv.parameter_id = cp.id
	where pv.activate_date_id in (select id from formula.schedule_date sd where sd.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
	and pv.source_table = 'common_parameter'
	and cp."label" = 'paint_top_area_W'
) a
where a.id = pv2.id;

update formula.common_parameter
set label_name = '噴漆塗料耗損'
where (label='paint_single_finishing_loss_rate') 
and product_type_id in (select id from formula.product_type pt where pt.type_name in ('NB', 'DT', 'AIO'));
