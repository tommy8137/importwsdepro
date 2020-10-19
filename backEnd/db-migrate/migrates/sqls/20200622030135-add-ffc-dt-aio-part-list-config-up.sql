insert into wiprocurement.bom_partlist_config_product_type(config_id, product_type_id)values
((select id from wiprocurement.bom_partlist_config where format = (select id from wiprocurement.bom_partlist_format where format_key = 'cable-ffc')), (select id from formula.product_type where type_name = 'DT')),
((select id from wiprocurement.bom_partlist_config where format = (select id from wiprocurement.bom_partlist_format where format_key = 'cable-ffc')), (select id from formula.product_type where type_name = 'AIO'))
on conflict do nothing;