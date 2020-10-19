INSERT INTO formula.common_parameter 
(id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark)
values
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )), 'thermal_graphite_components', NULL, 'graphite_l_side_constant', NULL, '石墨片 L 邊料常數', '石墨片_L_邊料常數', now(), NULL),
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )), 'thermal_graphite_components', NULL, 'graphite_w_side_constant', NULL, '石墨片 W 邊料常數', '石墨片_W_邊料常數', now(), NULL);

-- INSERT INTO formula.parameter_value 
-- (parameter_id, activate_date_id, value, value_type, source_table, create_time) 
-- values
-- ((SELECT id FROM formula.common_parameter WHERE (part_type = 'thermal_graphite_components') AND (label = 'graphite_l_side_constant')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 8, 'number', 'common_parameter', now()),
-- ((SELECT id FROM formula.common_parameter WHERE (part_type = 'thermal_graphite_components') AND (label = 'graphite_w_side_constant')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 8, 'number', 'common_parameter', now()),
-- ((SELECT id FROM formula.common_parameter WHERE (part_type = 'thermal_graphite_components') AND (label = 'graphite_l_side_constant')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite')), 8, 'number', 'common_parameter', now()),
-- ((SELECT id FROM formula.common_parameter WHERE (part_type = 'thermal_graphite_components') AND (label = 'graphite_w_side_constant')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite')), 8, 'number', 'common_parameter', now());

insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select (SELECT id FROM formula.common_parameter WHERE (part_type = 'thermal_graphite_components') AND (label = 'graphite_l_side_constant')), sd.id, 8, 'number', 'common_parameter' from formula.schedule_date sd WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) on conflict do nothing;
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select (SELECT id FROM formula.common_parameter WHERE (part_type = 'thermal_graphite_components') AND (label = 'graphite_w_side_constant')), sd.id, 8, 'number', 'common_parameter' from formula.schedule_date sd WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) on conflict do nothing;