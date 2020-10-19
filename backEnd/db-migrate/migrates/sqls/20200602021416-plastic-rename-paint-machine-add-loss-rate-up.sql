update formula.plastic_paint_machine
set machine_name = 'ABB_ROBOT'
where machine_name = 'Robot'; 

insert into formula.plastic_material_loss_rate (loss_rate_name) values
('RHCM (一般塑料)')
on conflict do nothing;

insert into formula.plastic_material_loss_rate_product_type (product_type_id, plastic_material_loss_rate_id)
select product.id, loss_rate.id
from formula.product_type product,
formula.plastic_material_loss_rate loss_rate
where product.type_name in ('NB', 'DT', 'AIO', 'VoIP', 'Server')
and loss_rate.loss_rate_name = 'RHCM (一般塑料)'
on conflict do nothing;

insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select link.id, sd.id, '0.08', 'number', 'plastic_material_loss_rate_product_type'
from formula.plastic_material_loss_rate_product_type link
left join formula.plastic_material_loss_rate rate on rate.id = link.plastic_material_loss_rate_id,
formula.schedule_date sd
where rate.loss_rate_name = 'RHCM (一般塑料)'
and sd.formula_type_id = (select id from formula.formula_type where "name" = 'housing_plastic')
and sd.product_type_id  is null
on conflict do nothing;