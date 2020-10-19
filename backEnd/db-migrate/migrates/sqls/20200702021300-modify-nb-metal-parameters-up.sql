select formula.fn_common_paramter_add('housing_metal', 'housing_metal_secondary_processing', 'ultrasonic_cleaning_cost_aluminum', 'AL 超音波清洗', 'USD/次', '二次加工費_Aluminum超音波清洗單價', 'NB', '0.00160', false);

update formula.common_parameter cp
set unit = 'USD/次'
where cp.label_name = '超音波清洗'
and cp.formula_type_id = (select id from formula.formula_type where "name" = 'housing_metal')
and cp.product_type_id in (select id from formula.product_type where type_name in ('NB'))
;

update formula.parameter_value pv
set value = '0.00029'
where pv.parameter_id = (
	select id
	from formula.common_parameter
	where formula_type_id = (select id from formula.formula_type where "name" = 'housing_metal')
	and product_type_id in (select id from formula.product_type where type_name in ('NB'))
	and "label" = 'ultrasonic_cleaning_cost'
);

update formula.parameter_value pv
set value = '0.1590'
where pv.parameter_id = (
	select id
	from formula.common_parameter
	where formula_type_id = (select id from formula.formula_type where "name" = 'housing_metal')
	and product_type_id in (select id from formula.product_type where type_name in ('NB'))
	and "label" = 'sand_blast_cost'
);

update formula.common_parameter cp
set unit = 'USD/次'
where cp.label_name = '噴砂單價'
and cp.formula_type_id = (select id from formula.formula_type where "name" = 'housing_metal')
and cp.product_type_id in (select id from formula.product_type where type_name in ('NB'))
;