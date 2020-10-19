update wiprocurement.bom_project_parameter
set remark = '專案參數_plastic成型費_FCST寬放值'
where remark = '專案參數_成型費_FCST寬放值';

-- WSD寬放值
insert into wiprocurement.bom_project_parameter (formula_type_id, product_type_id, part_type, "label", unit, label_name, default_value_parameter_id, remark)
select fl.id, pt.id, 'housing_plastic_molding', 'fcst_allowance', '%', '成型費FCST寬放值(%)', cp.id, '專案參數_plastic成型費_FCST寬放值'
from formula.formula_type fl,
formula.product_type pt,
formula.common_parameter cp
where fl."name" = 'housing_plastic'
and pt.type_name in ('VAD', 'VAD ACC', 'Smart Device')
and cp.formula_type_id = fl.id
and cp.product_type_id = pt.id
and cp.part_type = 'housing_plastic_molding'
and cp."label" = 'fcst_allowance'
on conflict do nothing ;

-- Metal FCST 工程模
insert into wiprocurement.bom_project_parameter (formula_type_id, product_type_id, part_type, "label", unit, label_name, default_value_parameter_id, remark)
select fl.id, pt.id, 'housing_metal_stamping', 'stage_stamping_fcst_allowance', '%', '工程模 FCST 寬放值(%)', cp.id, '專案參數_metal工程模 FCST 寬放值'
from formula.formula_type fl,
formula.product_type pt,
formula.common_parameter cp
where fl."name" = 'housing_metal'
and pt.type_name in ('DT', 'AIO')
and cp.formula_type_id = fl.id
and cp.product_type_id = pt.id
and cp.part_type = 'housing_metal_stamping'
and cp."label" = 'stage_stamping_fcst_allowance'
on conflict do nothing ;

-- Metal FCST 連續模
insert into wiprocurement.bom_project_parameter (formula_type_id, product_type_id, part_type, "label", unit, label_name, default_value_parameter_id, remark)
select fl.id, pt.id, 'housing_metal_stamping', 'progressive_stamping_fcst_allowance', '%', '連續模 FCST 寬放值(%)', cp.id, '專案參數_metal連續模 FCST 寬放值'
from formula.formula_type fl,
formula.product_type pt,
formula.common_parameter cp
where fl."name" = 'housing_metal'
and pt.type_name in ('DT', 'AIO')
and cp.formula_type_id = fl.id
and cp.product_type_id = pt.id
and cp.part_type = 'housing_metal_stamping'
and cp."label" = 'progressive_stamping_fcst_allowance'
on conflict do nothing ;

insert into wiprocurement.bom_project_parameter_value (bom_id, type_id, value, value_type)
select project.id, para.id, pv.value, pv.value_type 
from wiprocurement.bom_projects project,
wiprocurement.bom_project_parameter para,
formula.parameter_value pv
where para.product_type_id = (select id from formula.product_type where type_name = project.product_type)
and pv.parameter_id = para.default_value_parameter_id
and pv.activate_date_id = (SELECT MAX(id) FROM formula.schedule_date WHERE formula_type_id = para.formula_type_id and product_type_id = para.product_type_id)
on conflict do nothing ;