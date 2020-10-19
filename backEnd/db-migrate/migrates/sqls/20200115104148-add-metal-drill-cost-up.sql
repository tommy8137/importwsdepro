INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '0.005', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')) a,
(select * from formula.common_parameter cp where cp."label" = 'drill_cutting_cost' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name in ('DT'))) b  on conflict do nothing;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select b.id, a.id, '0.005', 'number', 'common_parameter' from
(select * from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO')) a,
(select * from formula.common_parameter cp where cp."label" = 'drill_cutting_cost' and cp.product_type_id = (select id from formula.product_type pt where pt.type_name in ('AIO'))) b  on conflict do nothing;