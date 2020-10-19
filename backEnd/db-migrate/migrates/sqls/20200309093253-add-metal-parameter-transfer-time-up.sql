INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'cnc_core_side_trasnsfer_time', 'sec', 'CNC(公模面) 基本取放時間', '二次加工費_CNC(公模面)_基本取放時間', (select id from formula.product_type where type_name = 'NB')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'cnc_PL_trasnsfer_time', 'sec', 'CNC(PL處) 基本取放時間', '二次加工費_CNC(PL處)_基本取放時間', (select id from formula.product_type where type_name = 'NB')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'grinding_auto_trasnsfer_time', 'sec', '打磨(自動加工) 基本取放時間', '二次加工費_打磨(自動加工)_基本取放時間', (select id from formula.product_type where type_name = 'NB')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'grinding_manual_trasnsfer_time', 'sec', '打磨(手動加工) 基本取放時間', '二次加工費_打磨(手動加工)_基本取放時間', (select id from formula.product_type where type_name = 'NB'))
on conflict do nothing ;

INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'cnc_core_side_trasnsfer_time', 'sec', 'CNC(公模面) 基本取放時間', '二次加工費_CNC(公模面)_基本取放時間', (select id from formula.product_type where type_name = 'DT')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'cnc_PL_trasnsfer_time', 'sec', 'CNC(PL處) 基本取放時間', '二次加工費_CNC(PL處)_基本取放時間', (select id from formula.product_type where type_name = 'DT')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'grinding_auto_trasnsfer_time', 'sec', '打磨(自動加工) 基本取放時間', '二次加工費_打磨(自動加工)_基本取放時間', (select id from formula.product_type where type_name = 'DT')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'grinding_manual_trasnsfer_time', 'sec', '打磨(手動加工) 基本取放時間', '二次加工費_打磨(手動加工)_基本取放時間', (select id from formula.product_type where type_name = 'DT'))
on conflict do nothing ;

INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'cnc_core_side_trasnsfer_time', 'sec', 'CNC(公模面) 基本取放時間', '二次加工費_CNC(公模面)_基本取放時間', (select id from formula.product_type where type_name = 'AIO')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'cnc_PL_trasnsfer_time', 'sec', 'CNC(PL處) 基本取放時間', '二次加工費_CNC(PL處)_基本取放時間', (select id from formula.product_type where type_name = 'AIO')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'grinding_auto_trasnsfer_time', 'sec', '打磨(自動加工) 基本取放時間', '二次加工費_打磨(自動加工)_基本取放時間', (select id from formula.product_type where type_name = 'AIO')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')), 'housing_metal_secondary_processing', null, 'grinding_manual_trasnsfer_time', 'sec', '打磨(手動加工) 基本取放時間', '二次加工費_打磨(手動加工)_基本取放時間', (select id from formula.product_type where type_name = 'AIO'))
on conflict do nothing ;

insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select cp.id, '20', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd.product_type_id in (select id from formula.product_type where type_name ='NB')
and cp.part_type = 'housing_metal_secondary_processing'
and cp.label in ('cnc_core_side_trasnsfer_time', 'cnc_PL_trasnsfer_time', 'grinding_auto_trasnsfer_time', 'grinding_manual_trasnsfer_time')
and cp.product_type_id in (select id from formula.product_type where type_name ='NB') on conflict do nothing ;

insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select cp.id, '20', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd.product_type_id in (select id from formula.product_type where type_name ='DT')
and cp.part_type = 'housing_metal_secondary_processing'
and cp.label in ('cnc_core_side_trasnsfer_time', 'cnc_PL_trasnsfer_time', 'grinding_auto_trasnsfer_time', 'grinding_manual_trasnsfer_time')
and cp.product_type_id in (select id from formula.product_type where type_name ='DT') on conflict do nothing ;

insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select cp.id, '20', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd.product_type_id in (select id from formula.product_type where type_name ='AIO')
and cp.part_type = 'housing_metal_secondary_processing'
and cp.label in ('cnc_core_side_trasnsfer_time', 'cnc_PL_trasnsfer_time', 'grinding_auto_trasnsfer_time', 'grinding_manual_trasnsfer_time')
and cp.product_type_id in (select id from formula.product_type where type_name ='AIO') on conflict do nothing ;