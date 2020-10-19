INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'die_cut')), 'die_cut_machine', null, 'm1_effective_area_L', 'mm', 'M1有效面積長度', 'M1有效面積長度', (select id from formula.product_type where type_name = 'NB')),
((SELECT id FROM formula.formula_type WHERE (name= 'die_cut')), 'die_cut_machine', null, 'm2_effective_area_L', 'mm', 'M2有效面積長度', 'M2有效面積長度', (select id from formula.product_type where type_name = 'NB')),
((SELECT id FROM formula.formula_type WHERE (name= 'die_cut')), 'die_cut_machine', null, 'm3_effective_area_L', 'mm', 'M3有效面積長度', 'M3有效面積長度', (select id from formula.product_type where type_name = 'NB')),
((SELECT id FROM formula.formula_type WHERE (name= 'die_cut')), 'die_cut_machine', null, 'm1_effective_area_W', 'mm', 'M1有效面積寬度', 'M1有效面積寬度', (select id from formula.product_type where type_name = 'NB')),
((SELECT id FROM formula.formula_type WHERE (name= 'die_cut')), 'die_cut_machine', null, 'm2_effective_area_W', 'mm', 'M2有效面積寬度', 'M2有效面積寬度', (select id from formula.product_type where type_name = 'NB')),
((SELECT id FROM formula.formula_type WHERE (name= 'die_cut')), 'die_cut_machine', null, 'm3_effective_area_W', 'mm', 'M3有效面積寬度', 'M3有效面積寬度', (select id from formula.product_type where type_name = 'NB')),
((SELECT id FROM formula.formula_type WHERE (name= 'die_cut')), 'die_cut_machine', null, 'm1_machine_price', 'USD', 'M1機台沖工費(沖)', 'M1機台沖工費(沖)', (select id from formula.product_type where type_name = 'NB')),
((SELECT id FROM formula.formula_type WHERE (name= 'die_cut')), 'die_cut_machine', null, 'm2_machine_price', 'USD', 'M2機台沖工費(沖)', 'M2機台沖工費(沖)', (select id from formula.product_type where type_name = 'NB')),
((SELECT id FROM formula.formula_type WHERE (name= 'die_cut')), 'die_cut_machine', null, 'm3_machine_price', 'USD', 'M3機台沖工費(沖)', 'M3機台沖工費(沖)', (select id from formula.product_type where type_name = 'NB'));

-- 有效面積長度

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '300', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'die_cut_machine'
and cp."label" = 'm1_effective_area_L'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'die_cut')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '600', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'die_cut_machine'
and cp."label" = 'm2_effective_area_L'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'die_cut')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '900', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'die_cut_machine'
and cp."label" = 'm3_effective_area_L'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'die_cut')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;


-- 有效面積寬度

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '200', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'die_cut_machine'
and cp."label" = 'm1_effective_area_W'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'die_cut')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '400', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'die_cut_machine'
and cp."label" = 'm2_effective_area_W'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'die_cut')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '500', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'die_cut_machine'
and cp."label" = 'm3_effective_area_W'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'die_cut')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;

-- 沖工費

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '0.012', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'die_cut_machine'
and cp."label" = 'm1_machine_price'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'die_cut')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '0.012', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'die_cut_machine'
and cp."label" = 'm2_machine_price'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'die_cut')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '0.013', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'die_cut_machine'
and cp."label" = 'm3_machine_price'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'die_cut')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;