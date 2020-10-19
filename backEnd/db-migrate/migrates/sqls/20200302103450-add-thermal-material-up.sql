CREATE TABLE formula.tmp_material_metal (
   material VARCHAR (200),
   density numeric,
   thickness numeric,
   price VARCHAR (200)
);

insert into formula.tmp_material_metal (material, density, thickness, price)values
('CU1100', 8.9, 1, '9.00'),
('CU1100', 8.9, 1.5, '9.00'),
('CU1100', 8.9, 2, '10.00'),
('CU1100', 8.9, 3, '11.00'),
('KU400i', 7.85, 0.5, '4.29');

insert into formula.material_metal ("name" , density)
select distinct material, density
from formula.tmp_material_metal on conflict do nothing;

insert into formula.material_thinkness (material_metal_id, thickness)
select ml.id, tmp.thickness
from formula.tmp_material_metal tmp
left join formula.material_metal ml on ml."name" = tmp.material on conflict do nothing;

insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select mt.id, tmp.price, 'number', 'material_thinkness', sd.id
from formula.tmp_material_metal tmp
left join formula.material_metal ml on ml."name" = tmp.material
left join formula.material_thinkness mt on mt.material_metal_id  = ml.id and mt.thickness = tmp.thickness,
formula.schedule_date sd where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'material') on conflict do nothing;

DROP TABLE IF EXISTS formula.tmp_material_metal;

insert into formula.thermal_category (category_type , metal_material_id)
select 'thermal_plate', mt.id
from formula.material_metal mt where mt."name" in (
'CU1100',
'C18400',
'KU400',
'KU400i',
'SECC',
'SGCC',
'SPCC',
'AL1050',
'AL5052',
'SUS301'
) on conflict do nothing;

insert into formula.thermal_category (category_type , metal_material_id)
select 'thermal_block', mt.id
from formula.material_metal mt where mt."name" in (
'CU1100',
'AL1050',
'AL6061',
'AL6063'
) on conflict do nothing;