INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, product_type_id)
select formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, (select id from formula.product_type pt where pt.type_name = 'Server') 
	from formula.common_parameter cp where cp.formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_metal')
       and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT') and cp.disable_time is null on conflict do nothing;
       
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, product_type_id)
select formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, (select id from formula.product_type pt where pt.type_name = 'VoIP') 
	from formula.common_parameter cp where cp.formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_metal')
       and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT') and cp.disable_time is null on conflict do nothing;
      
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, product_type_id)
select formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, (select id from formula.product_type pt where pt.type_name = 'Server') 
	from formula.common_parameter cp where cp.formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_plastic')
       and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT') and cp.disable_time is null on conflict do nothing;
      
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, product_type_id)
select formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, (select id from formula.product_type pt where pt.type_name = 'VoIP') 
	from formula.common_parameter cp where cp.formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_plastic')
       and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT') and cp.disable_time is null on conflict do nothing;
       
INSERT INTO formula.schedule_date ("name", formula_type_id, activate_date, product_type_id) VALUES('housing_metal_server_init', (select id from formula.formula_type ft where ft.name = 'housing_metal'), '1970-01-01', (select id from formula.product_type pt where pt.type_name = 'Server')) on conflict do nothing;
INSERT INTO formula.schedule_date ("name", formula_type_id, activate_date, product_type_id) VALUES('housing_metal_voip_init', (select id from formula.formula_type ft where ft.name = 'housing_metal'), '1970-01-01', (select id from formula.product_type pt where pt.type_name = 'VoIP')) on conflict do nothing;
INSERT INTO formula.schedule_date ("name", formula_type_id, activate_date, product_type_id) VALUES('housing_plastic_server_init', (select id from formula.formula_type ft where ft.name = 'housing_plastic'), '1970-01-01', (select id from formula.product_type pt where pt.type_name = 'Server')) on conflict do nothing;
INSERT INTO formula.schedule_date ("name", formula_type_id, activate_date, product_type_id) VALUES('housing_plastic_voip_init', (select id from formula.formula_type ft where ft.name = 'housing_plastic'), '1970-01-01', (select id from formula.product_type pt where pt.type_name = 'VoIP')) on conflict do nothing;

-- housing metal server
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_server_init'), pv.value, pv.value_type, pv.source_table 
from formula.common_parameter cp
left join formula.common_parameter cp_dt on cp.formula_type_id = cp_dt.formula_type_id and cp.part_type = cp_dt.part_type and cp."label" = cp_dt."label"
right join formula.parameter_value pv 
	on pv.parameter_id = cp.id 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
		and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'Server'
) on conflict do nothing;

-- housing metal voip
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_voip_init'), pv.value, pv.value_type, pv.source_table 
from formula.common_parameter cp
left join formula.common_parameter cp_dt on cp.formula_type_id = cp_dt.formula_type_id and cp.part_type = cp_dt.part_type and cp."label" = cp_dt."label"
right join formula.parameter_value pv 
	on pv.parameter_id = cp.id 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
		and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'VoIP'
) on conflict do nothing;

-- housing plastic server
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_server_init'), pv.value, pv.value_type, pv.source_table 
from formula.common_parameter cp
left join formula.common_parameter cp_dt on cp.formula_type_id = cp_dt.formula_type_id and cp.part_type = cp_dt.part_type and cp."label" = cp_dt."label"
right join formula.parameter_value pv 
	on pv.parameter_id = cp.id 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_plastic'
		)
		and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'Server'
) on conflict do nothing;

-- housing plastic voip
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_voip_init'), pv.value, pv.value_type, pv.source_table 
from formula.common_parameter cp
left join formula.common_parameter cp_dt on cp.formula_type_id = cp_dt.formula_type_id and cp.part_type = cp_dt.part_type and cp."label" = cp_dt."label"
right join formula.parameter_value pv 
	on pv.parameter_id = cp.id 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_plastic'
		)
		and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'VoIP'
) on conflict do nothing;



-- metal --
-- metal_syringe
INSERT INTO formula.metal_syringe (syringe_name, product_type_id)
select syringe_name, pt.id 
from formula.metal_syringe cp,
formula.product_type pt
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')
 and cp.disable_time is null
and pt.type_name in ('Server', 'VoIP') on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.syringe_diameter, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_server_init'), pv.value, pv.value_type, pv.source_table
from formula.metal_syringe cp
left join formula.metal_syringe cp_dt on cp.syringe_name = cp_dt.syringe_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.syringe_diameter 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
		and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'Server'
) on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.syringe_diameter, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_voip_init'), pv.value, pv.value_type, pv.source_table
from formula.metal_syringe cp
left join formula.metal_syringe cp_dt on cp.syringe_name = cp_dt.syringe_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.syringe_diameter 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
		and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'VoIP'
) on conflict do nothing;

-- metal_glue
INSERT INTO formula.metal_glue (glue_name, usd_g, density, product_type_id)
select glue_name, uuid_generate_v1(), uuid_generate_v1(), pt.id 
from formula.metal_glue cp,
formula.product_type pt
where pt.type_name in ('Server', 'VoIP') and cp.disable_time is null
and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT');

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.usd_g, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_server_init'), pv.value, pv.value_type, pv.source_table
from formula.metal_glue cp
left join formula.metal_glue cp_dt on cp.glue_name = cp_dt.glue_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.usd_g 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'Server'
) on conflict do nothing;


INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.usd_g, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_voip_init'), pv.value, pv.value_type, pv.source_table
from formula.metal_glue cp
left join formula.metal_glue cp_dt on cp.glue_name = cp_dt.glue_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.usd_g 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'VoIP'
) on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.density, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_server_init'), pv.value, pv.value_type, pv.source_table
from formula.metal_glue cp
left join formula.metal_glue cp_dt on cp.glue_name = cp_dt.glue_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.density 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'Server'
) on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.density, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_voip_init'), pv.value, pv.value_type, pv.source_table
from formula.metal_glue cp
left join formula.metal_glue cp_dt on cp.glue_name = cp_dt.glue_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.density 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'VoIP'
) on conflict do nothing;

--

INSERT INTO formula.metal_anode_color (name, anode_time, ratio, usd_mm2, loss_rate, product_type_id)
select name, uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), pt.id 
from formula.metal_anode_color cp,
formula.product_type pt
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')
 and cp.disable_time is null
and pt.type_name in ('Server', 'VoIP') on conflict do nothing;


--anode_time Server
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.anode_time, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_server_init'), pv.value, pv.value_type, pv.source_table
from formula.metal_anode_color cp
left join formula.metal_anode_color cp_dt on cp.name = cp_dt.name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.anode_time 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'Server'
) on conflict do nothing;
--ratio Server
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.ratio, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_server_init'), pv.value, pv.value_type, pv.source_table
from formula.metal_anode_color cp
left join formula.metal_anode_color cp_dt on cp.name = cp_dt.name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.ratio 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'Server'
) on conflict do nothing;
--usd_mm2 Server
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.usd_mm2, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_server_init'), pv.value, pv.value_type, pv.source_table
from formula.metal_anode_color cp
left join formula.metal_anode_color cp_dt on cp.name = cp_dt.name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.usd_mm2 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'Server'
) on conflict do nothing;
--loss_rate Server
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.loss_rate, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_server_init'), pv.value, pv.value_type, pv.source_table
from formula.metal_anode_color cp
left join formula.metal_anode_color cp_dt on cp.name = cp_dt.name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.loss_rate 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'Server'
) on conflict do nothing;

--anode_time voip
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.anode_time, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_voip_init'), pv.value, pv.value_type, pv.source_table
from formula.metal_anode_color cp
left join formula.metal_anode_color cp_dt on cp.name = cp_dt.name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.anode_time 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'VoIP'
) on conflict do nothing;
--ratio voip
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.ratio, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_voip_init'), pv.value, pv.value_type, pv.source_table
from formula.metal_anode_color cp
left join formula.metal_anode_color cp_dt on cp.name = cp_dt.name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.ratio 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'VoIP'
) on conflict do nothing;
--usd_mm2 voip
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.usd_mm2, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_voip_init'), pv.value, pv.value_type, pv.source_table
from formula.metal_anode_color cp
left join formula.metal_anode_color cp_dt on cp.name = cp_dt.name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.usd_mm2 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'VoIP'
) on conflict do nothing;
--loss_rate voip
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.loss_rate, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_voip_init'), pv.value, pv.value_type, pv.source_table
from formula.metal_anode_color cp
left join formula.metal_anode_color cp_dt on cp.name = cp_dt.name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.loss_rate 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'VoIP'
) on conflict do nothing;


-- plastic --
-- plastic_embed_nail
INSERT INTO formula.plastic_embed_nail (embed_nail_name, product_type_id)
select embed_nail_name, pt.id
from formula.plastic_embed_nail cp,
formula.product_type pt 
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')
and pt.type_name in ('Server', 'VoIP') on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.unit_price, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_server_init'), pv.value, pv.value_type, pv.source_table
from formula.plastic_embed_nail cp
left join formula.plastic_embed_nail cp_dt on cp.embed_nail_name = cp_dt.embed_nail_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.unit_price 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_plastic'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'Server'
) on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.unit_price, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_voip_init'), pv.value, pv.value_type, pv.source_table
from formula.plastic_embed_nail cp
left join formula.plastic_embed_nail cp_dt on cp.embed_nail_name = cp_dt.embed_nail_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.unit_price 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_plastic'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'VoIP'
) on conflict do nothing;

-- plastic_printing
INSERT INTO formula.plastic_printing (printing_name, product_type_id)
select printing_name, pt.id 
from formula.plastic_printing cp,
formula.product_type pt
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')
and pt.type_name in ('Server', 'VoIP') on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.unit_price, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_server_init'), pv.value, pv.value_type, pv.source_table
from formula.plastic_printing cp
left join formula.plastic_printing cp_dt on cp.printing_name = cp_dt.printing_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.unit_price 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_plastic'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'Server'
) on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.unit_price, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_voip_init'), pv.value, pv.value_type, pv.source_table
from formula.plastic_printing cp
left join formula.plastic_printing cp_dt on cp.printing_name = cp_dt.printing_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.unit_price 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_plastic'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'VoIP'
) on conflict do nothing;

-- plastic_grinding
INSERT INTO formula.plastic_grinding (grinding_name, product_type_id)
select grinding_name, pt.id
from formula.plastic_grinding cp,
formula.product_type pt
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')
and pt.type_name in ('Server', 'VoIP') on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.total_cost, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_server_init'), pv.value, pv.value_type, pv.source_table
from formula.plastic_grinding cp
left join formula.plastic_grinding cp_dt on cp.grinding_name = cp_dt.grinding_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.total_cost 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_plastic'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'Server'
) on conflict do nothing;


INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.total_cost, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_voip_init'), pv.value, pv.value_type, pv.source_table
from formula.plastic_grinding cp
left join formula.plastic_grinding cp_dt on cp.grinding_name = cp_dt.grinding_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.total_cost 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_plastic'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'VoIP'
) on conflict do nothing;

-- plastic_emi_sputtering_group
INSERT INTO formula.plastic_emi_sputtering_group (group_name, product_type_id)
select group_name, pt.id
from formula.plastic_emi_sputtering_group cp,
formula.product_type pt
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')
and pt.type_name in ('Server', 'VoIP') on conflict do nothing;

insert into formula.plastic_emi_sputtering_site_group (group_id, site_id, product_type_id)
select (select id from formula.plastic_emi_sputtering_group where group_name = a.group_name and product_type_id = (select id from formula.product_type pt where pt.type_name = 'Server')) , a.site_id, (select id from formula.product_type pt where pt.type_name = 'Server')
from (
  select gp.group_name, cp.site_id, pt.type_name 
  from formula.plastic_emi_sputtering_site_group cp
  left join formula.plastic_emi_sputtering_group gp on gp.id = cp.group_id
  left join formula.product_type pt on pt.id = cp.product_type_id
  where type_name = 'DT'
) a  on conflict do nothing;

insert into formula.plastic_emi_sputtering_site_group (group_id, site_id, product_type_id)
select (select id from formula.plastic_emi_sputtering_group where group_name = a.group_name and product_type_id = (select id from formula.product_type pt where pt.type_name = 'VoIP')) , a.site_id, (select id from formula.product_type pt where pt.type_name = 'VoIP')
from (
  select gp.group_name, cp.site_id, pt.type_name 
  from formula.plastic_emi_sputtering_site_group cp
  left join formula.plastic_emi_sputtering_group gp on gp.id = cp.group_id
  left join formula.product_type pt on pt.id = cp.product_type_id
  where type_name = 'DT'
) a  on conflict do nothing;

INSERT INTO formula.plastic_emi_sputtering_size (emi_size, "size", product_type_id)
select emi_size, "size", pt.id 
from formula.plastic_emi_sputtering_size cp,
formula.product_type pt
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')
and pt.type_name in ('Server', 'VoIP') on conflict do nothing;

INSERT INTO formula.plastic_emi_sputtering_base (emi_base, product_type_id)
select emi_base, pt.id 
from formula.plastic_emi_sputtering_base cp,
formula.product_type pt
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')
and pt.type_name in ('Server', 'VoIP') on conflict do nothing;

insert into formula.plastic_emi_sputtering_link (group_id, size_id, base_id, product_type_id )
select gp.id, si.id, ba.id, pt.id 
from formula.plastic_emi_sputtering_group gp,
formula.plastic_emi_sputtering_size si,
formula.plastic_emi_sputtering_base ba,
formula.product_type pt
where gp.product_type_id in (select id from formula.product_type where type_name in ('Server'))
and si.product_type_id in  (select id from formula.product_type where type_name in ('Server'))
and ba.product_type_id in  (select id from formula.product_type where type_name in ('Server'))
and pt.type_name in ('Server') on conflict do nothing;

insert into formula.plastic_emi_sputtering_link (group_id, size_id, base_id, product_type_id )
select gp.id, si.id, ba.id, pt.id 
from formula.plastic_emi_sputtering_group gp,
formula.plastic_emi_sputtering_size si,
formula.plastic_emi_sputtering_base ba,
formula.product_type pt
where gp.product_type_id in (select id from formula.product_type where type_name in ('VoIP'))
and si.product_type_id in  (select id from formula.product_type where type_name in ('VoIP'))
and ba.product_type_id in  (select id from formula.product_type where type_name in ('VoIP'))
and pt.type_name in ('VoIP') on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_server_init'), pv.value, pv.value_type, pv.source_table
from (
	select a.id, b.group_name, c.emi_size, d.emi_base, a.product_type_id from formula.plastic_emi_sputtering_link a
	left join formula.plastic_emi_sputtering_group b on b.id = a.group_id
	left join formula.plastic_emi_sputtering_size c on c.id = a.size_id
	left join formula.plastic_emi_sputtering_base d on d.id = a.base_id) cp
left join (
	select a1.id, b1.group_name, c1.emi_size, d1.emi_base, a1.product_type_id from formula.plastic_emi_sputtering_link a1
	left join formula.plastic_emi_sputtering_group b1 on b1.id = a1.group_id
	left join formula.plastic_emi_sputtering_size c1 on c1.id = a1.size_id
	left join formula.plastic_emi_sputtering_base d1 on d1.id = a1.base_id) cp_dt on cp.group_name = cp_dt.group_name and cp.emi_size = cp_dt.emi_size and cp.emi_base = cp_dt.emi_base
right join formula.parameter_value pv 
	on pv.parameter_id = cp.id 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_plastic'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'Server'
) on conflict do nothing;


INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_voip_init'), pv.value, pv.value_type, pv.source_table
from (
	select a.id, b.group_name, c.emi_size, d.emi_base, a.product_type_id from formula.plastic_emi_sputtering_link a
	left join formula.plastic_emi_sputtering_group b on b.id = a.group_id
	left join formula.plastic_emi_sputtering_size c on c.id = a.size_id
	left join formula.plastic_emi_sputtering_base d on d.id = a.base_id) cp
left join (
	select a1.id, b1.group_name, c1.emi_size, d1.emi_base, a1.product_type_id from formula.plastic_emi_sputtering_link a1
	left join formula.plastic_emi_sputtering_group b1 on b1.id = a1.group_id
	left join formula.plastic_emi_sputtering_size c1 on c1.id = a1.size_id
	left join formula.plastic_emi_sputtering_base d1 on d1.id = a1.base_id) cp_dt on cp.group_name = cp_dt.group_name and cp.emi_size = cp_dt.emi_size and cp.emi_base = cp_dt.emi_base
right join formula.parameter_value pv 
	on pv.parameter_id = cp.id 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_plastic'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'DT'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'VoIP'
) on conflict do nothing;


-- plastic_paint_info
INSERT INTO formula.plastic_paint_info (product_type_id)
select pt.id
from formula.plastic_paint_info cp,
formula.product_type pt 
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')
and pt.type_name in ('Server', 'VoIP') on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select (select usd_min from formula.plastic_paint_info where product_type_id = (select id from formula.product_type pt where pt.type_name = 'Server')),
pv.activate_date_id , pv.value, pv.value_type, pv.source_table
from formula.plastic_paint_info cp
right join formula.parameter_value pv 
	on pv.parameter_id = cp.usd_min 
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
) on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select (select man_hour from formula.plastic_paint_info where product_type_id = (select id from formula.product_type pt where pt.type_name = 'Server')),
pv.activate_date_id , pv.value, pv.value_type, pv.source_table
from formula.plastic_paint_info cp
right join formula.parameter_value pv 
	on pv.parameter_id = cp.man_hour 
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
) on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select (select usd_min from formula.plastic_paint_info where product_type_id = (select id from formula.product_type pt where pt.type_name = 'VoIP')),
pv.activate_date_id , pv.value, pv.value_type, pv.source_table
from formula.plastic_paint_info cp
right join formula.parameter_value pv 
	on pv.parameter_id = cp.usd_min 
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
) on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select (select man_hour from formula.plastic_paint_info where product_type_id = (select id from formula.product_type pt where pt.type_name = 'VoIP')),
pv.activate_date_id , pv.value, pv.value_type, pv.source_table
from formula.plastic_paint_info cp
right join formula.parameter_value pv 
	on pv.parameter_id = cp.man_hour 
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
) on conflict do nothing;

-- plastic_paint_man_power
INSERT INTO formula.plastic_paint_man_power (product_type_id, category_name)
select pt.id, cp.category_name
from formula.plastic_paint_man_power cp,
formula.product_type pt 
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT')
and pt.type_name in ('Server', 'VoIP') on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, pv.activate_date_id , pv.value, pv.value_type, pv.source_table
from formula.plastic_paint_man_power cp
left join formula.plastic_paint_man_power cp_dt on cp.category_name = cp_dt.category_name and cp_dt.product_type_id  = (select id from formula.product_type pt where pt.type_name = 'Server')
right join formula.parameter_value pv on pv.parameter_id = cp.id
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
) on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, pv.activate_date_id , pv.value, pv.value_type, pv.source_table
from formula.plastic_paint_man_power cp
left join formula.plastic_paint_man_power cp_dt on cp.category_name = cp_dt.category_name and cp_dt.product_type_id  = (select id from formula.product_type pt where pt.type_name = 'VoIP')
right join formula.parameter_value pv on pv.parameter_id = cp.id
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
) on conflict do nothing;