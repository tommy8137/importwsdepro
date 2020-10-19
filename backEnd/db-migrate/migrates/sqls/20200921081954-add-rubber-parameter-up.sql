-- temp_rubber_material
create table if not exists formula.temp_rubber_material(
 material_spec_name varchar,
 material_name varchar,
 price varchar
);
insert into formula.temp_rubber_material (material_spec_name, material_name, price) values
('Silicon', 'Silicon_矽膠硬度50', '6'),
('Silicon', 'Silicon_矽膠硬度60', '6'),
('Silicon', 'Silicon_矽膠硬度70', '6'),
('Silicon', 'Silicon_矽膠硬度80', '6'),
('Silicon', 'Silicon_矽膠硬度90', '6');
insert into formula.rubber_material (spec_id, material_name)
select rms.id, trm.material_name
from formula.temp_rubber_material trm
left join formula.rubber_material_spec rms on rms.spec_name = trm.material_spec_name on conflict do nothing;

update formula.rubber_material set disable_time = now() where material_name = 'Silicon_矽膠';

insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) 
select rm.id as material_id, sd.id as activate_date_id, trm.price, 'number' as value_type, 'rubber_material' as source_table
from formula.temp_rubber_material trm
left join formula.rubber_material rm on rm.material_name = trm.material_name
inner join formula.schedule_date sd  on sd.formula_type_id = (select id from formula.formula_type ft where name = 'material') 
and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB') on conflict do nothing;
drop table if exists formula.temp_rubber_material;