insert into formula.turning_material(material_name, density)
select 'SUS416', res.density
from formula.turning_material res
where res.material_name = 'SUS410'
on conflict do nothing;

insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select (select id from formula.turning_material where material_name = 'SUS416'), pv.activate_date_id, pv.value, pv.value_type, pv.source_table
from formula.parameter_value pv
where pv.parameter_id = (select id from formula.turning_material where material_name = 'SUS410')
on conflict do nothing;

insert into formula.part_category_turning_material(material_id, part_category_2_id, nut_type_id)
select (select id from formula.turning_material where material_name = 'SUS416'), pm.part_category_2_id, pm.nut_type_id
from formula.part_category_turning_material pm
where pm.material_id = (select id from formula.turning_material where material_name = 'SUS410')
and pm.part_category_2_id = (select id from formula.part_category_2 where category_name = 'Nut')
on conflict do nothing;

insert into formula.turning_heat_treatment(turning_material_id)
select (select id from formula.turning_material where material_name = 'SUS416')
on conflict do nothing;

insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select (select tht.id from formula.turning_heat_treatment tht join formula.turning_material tm on tm.id = tht.turning_material_id where tm.material_name = 'SUS416'), pv.activate_date_id, pv.value, pv.value_type, pv.source_table
from formula.parameter_value pv
where pv.parameter_id = (select tht.id from formula.turning_heat_treatment tht join formula.turning_material tm on tm.id = tht.turning_material_id where tm.material_name = 'SUS410')
on conflict do nothing;
