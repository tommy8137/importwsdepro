INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic')), 'housing_plastic_paint', null, 'paint_piece_number_at_a_time', 'pcs', '一次可噴成品數量(pcs)', '塗裝噴漆費_一次可噴成品數量(pcs)', (select id from formula.product_type where type_name = 'NB')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic')), 'housing_plastic_paint', null, 'paint_piece_number_at_a_time', 'pcs', '一次可噴成品數量(pcs)', '塗裝噴漆費_一次可噴成品數量(pcs)', (select id from formula.product_type where type_name = 'DT')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic')), 'housing_plastic_paint', null, 'paint_piece_number_at_a_time', 'pcs', '一次可噴成品數量(pcs)', '塗裝噴漆費_一次可噴成品數量(pcs)', (select id from formula.product_type where type_name = 'AIO'))
on conflict do nothing;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '1', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'housing_plastic_paint'
and cp."label" = 'paint_piece_number_at_a_time'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'housing_plastic')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;