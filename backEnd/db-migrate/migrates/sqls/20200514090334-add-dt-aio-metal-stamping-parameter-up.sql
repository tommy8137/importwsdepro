insert into formula.common_parameter (formula_type_id, part_type, "label", label_name, unit, system_remark, product_type_id) values
(
  (select id from formula.formula_type where "name"= 'housing_metal'), 'housing_metal_stamping',
  'stage_stamping_convex_hull_fcst_allowance', '工程模(凸包) FCST 寬放值', '%', '沖壓_工程模(凸包) FCST 寬放值',
  (select id from formula.product_type where type_name = 'DT')
),
(
  (select id from formula.formula_type where "name"= 'housing_metal'), 'housing_metal_stamping',
  'stage_stamping_fcst_allowance', '工程模 FCST 寬放值', '%', '沖壓_工程模 FCST 寬放值',
  (select id from formula.product_type where type_name = 'DT')
),
(
  (select id from formula.formula_type where "name"= 'housing_metal'), 'housing_metal_stamping',
  'progressive_stamping_fcst_allowance', '連續模 FCST 寬放值', '%', '沖壓_連續模 FCST 寬放值',
  (select id from formula.product_type where type_name = 'DT')
),
(
  (select id from formula.formula_type where "name"= 'housing_metal'), 'housing_metal_stamping',
  'riveting_die_fcst_allowance', '鉚合模 FCST 寬放值', '%', '沖壓_鉚合模 FCST 寬放值',
  (select id from formula.product_type where type_name = 'DT')
),
(
  (select id from formula.formula_type where "name"= 'housing_metal'), 'housing_metal_stamping',
  'stage_stamping_convex_hull_fcst_allowance', '工程模(凸包) FCST 寬放值', '%', '沖壓_工程模(凸包) FCST 寬放值',
  (select id from formula.product_type where type_name = 'AIO')
),
(
  (select id from formula.formula_type where "name"= 'housing_metal'), 'housing_metal_stamping',
  'stage_stamping_fcst_allowance', '工程模 FCST 寬放值', '%', '沖壓_工程模 FCST 寬放值',
  (select id from formula.product_type where type_name = 'AIO')
),
(
  (select id from formula.formula_type where "name"= 'housing_metal'), 'housing_metal_stamping',
  'progressive_stamping_fcst_allowance', '連續模 FCST 寬放值', '%', '沖壓_連續模 FCST 寬放值',
  (select id from formula.product_type where type_name = 'AIO')
),
(
  (select id from formula.formula_type where "name"= 'housing_metal'), 'housing_metal_stamping',
  'riveting_die_fcst_allowance', '鉚合模 FCST 寬放值', '%', '沖壓_鉚合模 FCST 寬放值',
  (select id from formula.product_type where type_name = 'AIO')
) on conflict do nothing;

insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp.id, sd.id, '0', 'number', 'common_parameter'
from formula.common_parameter cp
right join formula.schedule_date sd on sd.product_type_id = cp.product_type_id and sd.formula_type_id = (select id from formula.formula_type where "name" = 'housing_metal')
where cp."label" in ('stage_stamping_convex_hull_fcst_allowance', 'stage_stamping_fcst_allowance', 'progressive_stamping_fcst_allowance', 'riveting_die_fcst_allowance') on conflict do nothing;