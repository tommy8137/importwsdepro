-- rollback wrong data metal
update formula.parameter_value
set activate_date_id = b.b_id
from (
 select pv2.id as a_id, sd2.activate_date as a_activate_date, sd2."name" as a_name
  from formula.parameter_value pv2
  inner join formula.schedule_date sd2 on (sd2.id = pv2.activate_date_id)
  where activate_date_id in (select id from formula.schedule_date where product_type_id is null and formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_metal'))
  and source_table in ('material_metal', 'metal_painting', 'module_machine_metal')
) as a
inner join (
 select sd.id as b_id, sd.activate_date as b_activate_date, sd."name" as b_name from formula.schedule_date sd where sd."name" in ('housing_metal', 'housing_metal_init')
) as b on (a.a_activate_date = b.b_activate_date)
where id = a.a_id;

delete from formula.schedule_date sd where sd."name"='hosuing_metal_common';

-- insert currect data
INSERT INTO formula.schedule_date ("name", formula_type_id, activate_date, product_type_id)
select 'hosuing_metal_common', (select id from formula.formula_type ft where ft.name = 'housing_metal'),  activate_date, null 
 from formula.schedule_date 
 where product_type_id = 1 and formula_type_id = 2 and activate_date != '1970-01-01';
 
update formula.parameter_value
set activate_date_id = b.b_id
from (
 select pv2.id as a_id, sd2.activate_date as a_activate_date
  from formula.parameter_value pv2
  inner join formula.schedule_date sd2 on (sd2.id = pv2.activate_date_id)
  where activate_date_id in (select id from formula.schedule_date where product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB') and formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_metal'))
  and source_table in ('module_machine_metal')
) as a
inner join (
 select sd.id as b_id, sd.activate_date as b_activate_date from formula.schedule_date sd where product_type_id is null and formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_metal')
) as b on (a.a_activate_date = b.b_activate_date)
where id = a.a_id;


-- rollback wrong data plastic
update formula.parameter_value
set activate_date_id = b.b_id
from (
 select pv2.id as a_id, sd2.activate_date as a_activate_date, sd2."name" as a_name, pv2.source_table as source_table
  from formula.parameter_value pv2
  inner join formula.schedule_date sd2 on (sd2.id = pv2.activate_date_id)
  where activate_date_id in (select id from formula.schedule_date where product_type_id is null and formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_plastic'))
  and source_table in ('material')
) as a
inner join (
 select sd.id as b_id, sd.activate_date as b_activate_date, sd."name" as b_name from formula.schedule_date sd where sd."name" in ('housing_plastic', 'housing_plastic_init')
) as b on (a.a_activate_date = b.b_activate_date)
where id = a.a_id;