
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'thermal_module')), 'thermal_module_components', 'thermal_plate', 'thermal_plate_riveting_loss_rate', '%', 'thermal plate 鉚接 loss rate', '零件費_thermal_plate_鉚接_lossrate', (select id from formula.product_type where type_name = 'NB')) on conflict do nothing ;


insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select cp.id, '0.03', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'thermal_module')
and cp.part_type = 'thermal_module_components'
and cp.label = 'thermal_plate_riveting_loss_rate' on conflict do nothing ;