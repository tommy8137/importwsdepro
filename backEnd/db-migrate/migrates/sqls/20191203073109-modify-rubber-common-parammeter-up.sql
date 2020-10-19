/* Replace with your SQL commands */
update formula.common_parameter set label_name='成型加工費用(同心圓)' where part_type='me_others_screw_molding' and "label"='lathe_circularity_unit_price';
update formula.common_parameter set label_name='成型費(同心圓) 一班產能' where part_type='me_others_screw_molding' and "label"='lathe_circularity_capacity';
update formula.common_parameter set label_name='成型費(同心圓) Loss Rate' where part_type='me_others_screw_molding' and "label"='lathe_circularity_loss_rate';


INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_material', '', 'material_all_size_L', 'mm', '整版尺寸L', '材料費_整版尺寸L');
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_material', '', 'material_all_size_W', 'mm', '整版尺寸W', '材料費_整版尺寸W');

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_material') AND (label='material_all_size_L')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 350, 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_material') AND (label='material_all_size_W')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 350, 'number', 'common_parameter', now());