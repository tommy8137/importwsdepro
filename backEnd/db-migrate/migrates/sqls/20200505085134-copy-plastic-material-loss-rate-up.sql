insert into formula.plastic_material_loss_rate_product_type (product_type_id, plastic_material_loss_rate_id)
select pt.id, cp.plastic_material_loss_rate_id
from formula.plastic_material_loss_rate_product_type cp,
formula.product_type pt
where cp.product_type_id = (select id from formula.product_type where type_name = 'DT')
and pt.type_name in ('Server', 'VoIP') on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, pv.activate_date_id , pv.value, pv.value_type, pv.source_table
from formula.plastic_material_loss_rate_product_type cp
left join formula.plastic_material_loss_rate_product_type cp_dt on cp.plastic_material_loss_rate_id = cp_dt.plastic_material_loss_rate_id and cp_dt.product_type_id  = (select id from formula.product_type pt where pt.type_name = 'VoIP')
right join formula.parameter_value pv on pv.parameter_id = cp.id
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
) on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, pv.activate_date_id , pv.value, pv.value_type, pv.source_table
from formula.plastic_material_loss_rate_product_type cp
left join formula.plastic_material_loss_rate_product_type cp_dt on cp.plastic_material_loss_rate_id = cp_dt.plastic_material_loss_rate_id and cp_dt.product_type_id  = (select id from formula.product_type pt where pt.type_name = 'Server')
right join formula.parameter_value pv on pv.parameter_id = cp.id
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
) on conflict do nothing;