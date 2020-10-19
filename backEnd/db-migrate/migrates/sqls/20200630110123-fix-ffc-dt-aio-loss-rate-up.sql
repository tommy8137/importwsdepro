UPDATE formula.parameter_value pv
set value = '0.03'
where pv.parameter_id in (
	select id from formula.common_parameter cp
	where cp.formula_type_id = (select id from formula.formula_type where "name" = 'cable_ffc')
	and cp."label" in ('accessories_loss_rate', 'connector_loss_rate', 'reinforcement_board_loss_rate')
	and cp.product_type_id in (select id from formula.product_type where type_name in ('DT', 'AIO'))
);