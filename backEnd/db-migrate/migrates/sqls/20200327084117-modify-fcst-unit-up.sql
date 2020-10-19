update formula.common_parameter cp 
set unit = '%'
where cp.part_type = 'housing_plastic_molding'
and cp."label" = 'fcst_allowance';

update wiprocurement.bom_project_parameter pp
set unit = '%',
label_name = '成型費FCST寬放值(%)'
where pp.part_type = 'housing_plastic_molding'
and pp."label" = 'fcst_allowance';
