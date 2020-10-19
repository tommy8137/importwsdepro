-- DT
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_stamping', NULL, 'stage_stamping_convex_hull_loss_rate', '%', '工程模(凸包)費loss rate', '沖壓費工程模(凸包)費 loss rate', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'DT'));

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_stamping') AND (label='stage_stamping_convex_hull_loss_rate') and product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and "name" = 'housing_metal_dt_init'), '0', 'number', 'common_parameter', now());

INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'laser_welding_loss_rate', '%', '雷焊loss rate', '二次加工費_雷焊 loss rate', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'DT')),
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'laser_welding_cost', null, '雷焊單價', '二次加工費_雷焊單價', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'DT')),
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'washing_loss_rate', '%', '一般清洗loss rate', '二次加工費_一般清洗 loss rate', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'DT')),
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'washing_cost', null, '一般清洗', '二次加工費_一般清洗', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'DT')),
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'drill_cutting_cost', null, '鑽切(高光) 單價', '二次加工費_鑽切(高光) 單價', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'DT'));

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='laser_welding_loss_rate')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and "name" = 'housing_metal_dt_init' ), '0', 'number', 'common_parameter', now());

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='laser_welding_cost')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and "name" = 'housing_metal_dt_init' ), '0.0141', 'number', 'common_parameter', now());

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='washing_loss_rate')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and "name" = 'housing_metal_dt_init' ), '0', 'number', 'common_parameter', now());

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='washing_cost')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and "name" = 'housing_metal_dt_init' ), '0.0074', 'number', 'common_parameter', now());
-- AIO
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_stamping', NULL, 'stage_stamping_convex_hull_loss_rate', '%', '工程模(凸包)費loss rate', '沖壓費工程模(凸包)費 loss rate', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'AIO'));

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_stamping') AND (label='stage_stamping_convex_hull_loss_rate') and product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and "name" = 'housing_metal_aio_init' ), '0', 'number', 'common_parameter', now());

INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time, product_type_id) VALUES
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'laser_welding_loss_rate', '%', '雷焊loss rate', '二次加工費_雷焊 loss rate', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'AIO')),
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'laser_welding_cost', null, '雷焊單價', '二次加工費_雷焊單價', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'AIO')),
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'washing_loss_rate', '%', '一般清洗loss rate', '二次加工費_一般清洗 loss rate', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'AIO')),
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'washing_cost', null, '一般清洗', '二次加工費_一般清洗', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'AIO')),
(uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'drill_cutting_cost', null, '鑽切(高光) 單價', '二次加工費_鑽切(高光) 單價', now(), NULL, null, (select id from formula.product_type pt where pt.type_name = 'AIO'));


INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='laser_welding_loss_rate') and product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and "name" = 'housing_metal_aio_init' ), '0', 'number', 'common_parameter', now());

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='laser_welding_cost') and product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and "name" = 'housing_metal_aio_init' ), '0.0141', 'number', 'common_parameter', now());

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='washing_loss_rate') and product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and "name" = 'housing_metal_aio_init' ), '0', 'number', 'common_parameter', now());

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES
((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='washing_cost') and product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO')),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and "name" = 'housing_metal_aio_init' ), '0.0074', 'number', 'common_parameter', now());