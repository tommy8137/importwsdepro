update formula.common_parameter set disable_time = now() 
where part_type = 'housing_metal_stamping' and "label" in ('stage_stamping_loss_rate', 'progressive_stamping_loss_rate') 
and product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');