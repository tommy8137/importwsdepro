update formula.parameter_value
set value = '0.017'
where parameter_id in (
	select id 
	from formula.common_parameter 
	where (label='laser_welding_cost')
	and product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO'))
);

update formula.parameter_value
set value = '0.0078'
where parameter_id in (
	select id 
	from formula.common_parameter 
	where (label='single_rivet_cost') 
	and product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO'))
);

update formula.parameter_value
set value = '0.2'
where parameter_id in (
	select id 
	from formula.common_parameter 
	where (label='drilling_hole_const') 
	and product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO'))
);

update formula.common_parameter
set label_name = '拉鉚釘單價'
where (label='single_rivet_cost') 
and product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO'));

update formula.common_parameter
set label_name = '一般清洗單價'
where (label='washing_cost') 
and product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO'));