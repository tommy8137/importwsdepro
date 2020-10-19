insert into formula.common_parameter (formula_type_id, part_type, "label", label_name, unit, system_remark, product_type_id) values
(
  (select id from formula.formula_type where "name"= 'housing_metal'), 'housing_metal_material',
  'material_aluminum_l_side_constant', 'Aluminum 邊料尺寸 L', 'mm', '材料費_Aluminum_material 邊料尺寸 L',
  (select id from formula.product_type where type_name = 'NB')
),
(
  (select id from formula.formula_type where "name"= 'housing_metal'), 'housing_metal_material',
  'material_aluminum_w_side_constant', 'Aluminum 邊料尺寸 W', 'mm', '材料費_Aluminum_material 邊料尺寸 W',
  (select id from formula.product_type where type_name = 'NB')
),
(
  (select id from formula.formula_type where "name"= 'housing_metal'), 'housing_metal_material',
  'material_metal_l_side_constant', 'Metal 邊料尺寸 L', 'mm', '材料費_Metal_material 邊料尺寸 L',
  (select id from formula.product_type where type_name = 'NB')
),
(
  (select id from formula.formula_type where "name"= 'housing_metal'), 'housing_metal_material',
  'material_metal_w_side_constant', 'Metal 邊料尺寸 W', 'mm', '材料費_Metal_material 邊料尺寸 W',
  (select id from formula.product_type where type_name = 'NB')
) on conflict do nothing;

insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp.id, sd.id, '5', 'number', 'common_parameter'
from formula.common_parameter cp
right join formula.schedule_date sd on sd.product_type_id = cp.product_type_id and sd.formula_type_id = (select id from formula.formula_type where "name" = 'housing_metal')
where cp."label" in ('material_metal_w_side_constant', 'material_metal_l_side_constant') on conflict do nothing;

insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp.id, sd.id, '10', 'number', 'common_parameter'
from formula.common_parameter cp
right join formula.schedule_date sd on sd.product_type_id = cp.product_type_id and sd.formula_type_id = (select id from formula.formula_type where "name" = 'housing_metal')
where cp."label" in ('material_aluminum_w_side_constant', 'material_aluminum_l_side_constant') on conflict do nothing;
