INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'cable_ffc')), 'cable_ffc_components', null, 'connector_loss_rate', '%', 'Connector loss rate', '零件費_Connector_loss_rate', (select id from formula.product_type where type_name = 'NB'))
on conflict do nothing ;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '0.001', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'cable_ffc_components'
and cp."label" = 'connector_loss_rate'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'cable_ffc')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;