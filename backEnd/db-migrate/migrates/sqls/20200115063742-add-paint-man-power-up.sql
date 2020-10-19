-- Metal
INSERT INTO formula.plastic_paint_man_power (product_type_id, category_name, create_time)
select a.id, 'Metal', now()
from (select id from formula.product_type pt where pt.type_name in ('NB', 'DT', 'AIO')) a;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select a.id, b.id, '12', 'number', 'plastic_paint_man_power'
from (select id from formula.plastic_paint_man_power pmp where pmp.category_name = 'Metal') a,
(select id from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and sd.product_type_id is null ) b;

-- Aluminum
INSERT INTO formula.plastic_paint_man_power (product_type_id, category_name, create_time)
select a.id, 'Aluminum', now()
from (select id from formula.product_type pt where pt.type_name in ('NB', 'DT', 'AIO')) a;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select a.id, b.id, '12', 'number', 'plastic_paint_man_power'
from (select id from formula.plastic_paint_man_power pmp where pmp.category_name = 'Aluminum') a,
(select id from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and sd.product_type_id is null ) b;