/* Replace with your SQL commands */

-- diecut_material
-- -- T0.1Absorber
INSERT INTO formula.diecut_material (material_name, diecut_material_spec_id, remark)
VALUES('磁導率50u', (select id from formula.diecut_material_spec where material_spec_name = 'T0.1Absorber'), ''),
('磁導率80u', (select id from formula.diecut_material_spec where material_spec_name = 'T0.1Absorber'), ''),
('磁導率120u', (select id from formula.diecut_material_spec where material_spec_name = 'T0.1Absorber'), ''),
('磁導率180u', (select id from formula.diecut_material_spec where material_spec_name = 'T0.1Absorber'), '');

-- -- T0.2Absorber
INSERT INTO formula.diecut_material (material_name, diecut_material_spec_id, remark)
VALUES('磁導率50u', (select id from formula.diecut_material_spec where material_spec_name = 'T0.2Absorber'), ''),
('磁導率80u', (select id from formula.diecut_material_spec where material_spec_name = 'T0.2Absorber'), ''),
('磁導率120u', (select id from formula.diecut_material_spec where material_spec_name = 'T0.2Absorber'), ''),
('磁導率180u', (select id from formula.diecut_material_spec where material_spec_name = 'T0.2Absorber'), '');

-- -- T0.3Absorber
INSERT INTO formula.diecut_material (material_name, diecut_material_spec_id, remark)
VALUES('磁導率50u', (select id from formula.diecut_material_spec where material_spec_name = 'T0.3Absorber'), ''),
('磁導率80u', (select id from formula.diecut_material_spec where material_spec_name = 'T0.3Absorber'), ''),
('磁導率120u', (select id from formula.diecut_material_spec where material_spec_name = 'T0.3Absorber'), ''),
('磁導率180u', (select id from formula.diecut_material_spec where material_spec_name = 'T0.3Absorber'), '');


-- parameter_value
-- -- T0.1Absorber
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 30, 'number', 'diecut_material' from formula.diecut_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where material_name = '磁導率50u' AND diecut_material_spec_id = (select id from formula.diecut_material_spec where material_spec_name = 'T0.1Absorber') order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 40, 'number', 'diecut_material' from formula.diecut_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where material_name = '磁導率80u' AND diecut_material_spec_id = (select id from formula.diecut_material_spec where material_spec_name = 'T0.1Absorber') order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 45, 'number', 'diecut_material' from formula.diecut_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where material_name = '磁導率120u' AND diecut_material_spec_id = (select id from formula.diecut_material_spec where material_spec_name = 'T0.1Absorber') order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 65, 'number', 'diecut_material' from formula.diecut_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where material_name = '磁導率180u' AND diecut_material_spec_id = (select id from formula.diecut_material_spec where material_spec_name = 'T0.1Absorber') order by tm.id;

-- -- T0.2Absorber
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 45, 'number', 'diecut_material' from formula.diecut_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where material_name = '磁導率50u' AND diecut_material_spec_id = (select id from formula.diecut_material_spec where material_spec_name = 'T0.2Absorber') order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 60, 'number', 'diecut_material' from formula.diecut_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where material_name = '磁導率80u' AND diecut_material_spec_id = (select id from formula.diecut_material_spec where material_spec_name = 'T0.2Absorber') order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 68, 'number', 'diecut_material' from formula.diecut_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where material_name = '磁導率120u' AND diecut_material_spec_id = (select id from formula.diecut_material_spec where material_spec_name = 'T0.2Absorber') order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 98, 'number', 'diecut_material' from formula.diecut_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where material_name = '磁導率180u' AND diecut_material_spec_id = (select id from formula.diecut_material_spec where material_spec_name = 'T0.2Absorber') order by tm.id;

-- -- T0.3Absorber
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 70, 'number', 'diecut_material' from formula.diecut_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where material_name = '磁導率50u' AND diecut_material_spec_id = (select id from formula.diecut_material_spec where material_spec_name = 'T0.3Absorber') order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 90, 'number', 'diecut_material' from formula.diecut_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where material_name = '磁導率80u' AND diecut_material_spec_id = (select id from formula.diecut_material_spec where material_spec_name = 'T0.3Absorber') order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 100, 'number', 'diecut_material' from formula.diecut_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where material_name = '磁導率120u' AND diecut_material_spec_id = (select id from formula.diecut_material_spec where material_spec_name = 'T0.3Absorber') order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 145, 'number', 'diecut_material' from formula.diecut_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where material_name = '磁導率180u' AND diecut_material_spec_id = (select id from formula.diecut_material_spec where material_spec_name = 'T0.3Absorber') order by tm.id;
