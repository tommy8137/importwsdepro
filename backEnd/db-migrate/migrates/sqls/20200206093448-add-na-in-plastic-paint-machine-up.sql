insert into formula.plastic_paint_machine (machine_name) values ('N/A') on conflict do nothing;;

insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select a.id, sd.id, '0', 'number', 'plastic_paint_machine'
from formula.plastic_paint_machine a,
formula.schedule_date sd
where a.machine_name = 'N/A'
and sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_plastic')
and sd.product_type_id is null on conflict do nothing;