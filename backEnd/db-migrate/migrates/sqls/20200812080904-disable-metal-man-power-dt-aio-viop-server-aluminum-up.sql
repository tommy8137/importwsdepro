update formula.metal_paint_man_power
set disable_time = now()
where category_name = 'Aluminum'
and disable_time is null
and product_type_id in (
	select id from formula.product_type where type_name in ('DT', 'AIO', 'Server', 'VoIP')
);