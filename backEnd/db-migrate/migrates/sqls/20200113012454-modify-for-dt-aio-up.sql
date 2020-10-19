/* commons */
ALTER TABLE formula.common_parameter add column if not exists product_type_id int4 not null default 1;
ALTER TABLE formula.common_parameter drop CONSTRAINT if exists common_parameter_fk_pid;
ALTER TABLE formula.common_parameter ADD CONSTRAINT common_parameter_fk_pid FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id);
ALTER TABLE formula.common_parameter drop CONSTRAINT if exists common_parameter_un;
ALTER TABLE formula.common_parameter ADD CONSTRAINT common_parameter_un UNIQUE (formula_type_id, part_type, label, product_type_id);

ALTER TABLE formula.schedule_date add column if not exists product_type_id int4 default 1;
ALTER TABLE formula.schedule_date drop CONSTRAINT if exists schedule_date_fk_pid;
ALTER TABLE formula.schedule_date ADD CONSTRAINT schedule_date_fk_pid FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id);
ALTER TABLE formula.schedule_date drop CONSTRAINT if exists schedule_date_un;
ALTER TABLE formula.schedule_date ADD CONSTRAINT schedule_date_un UNIQUE (formula_type_id, activate_date, product_type_id);

INSERT INTO formula.schedule_date ("name", formula_type_id, activate_date, product_type_id) VALUES('housing_metal_dt_init', (select id from formula.formula_type ft where ft.name = 'housing_metal'), '1970-01-01', (select id from formula.product_type pt where pt.type_name = 'DT'));
INSERT INTO formula.schedule_date ("name", formula_type_id, activate_date, product_type_id) VALUES('housing_metal_aio_init', (select id from formula.formula_type ft where ft.name = 'housing_metal'), '1970-01-01', (select id from formula.product_type pt where pt.type_name = 'AIO'));
INSERT INTO formula.schedule_date ("name", formula_type_id, activate_date, product_type_id) VALUES('housing_plastic_dt_init', (select id from formula.formula_type ft where ft.name = 'housing_plastic'), '1970-01-01', (select id from formula.product_type pt where pt.type_name = 'DT'));
INSERT INTO formula.schedule_date ("name", formula_type_id, activate_date, product_type_id) VALUES('housing_plastic_aio_init', (select id from formula.formula_type ft where ft.name = 'housing_plastic'), '1970-01-01', (select id from formula.product_type pt where pt.type_name = 'AIO'));

INSERT INTO formula.schedule_date ("name", formula_type_id, activate_date, product_type_id) VALUES('housing_metal_common_init', (select id from formula.formula_type ft where ft.name = 'housing_metal'), '1970-01-01', null);
INSERT INTO formula.schedule_date ("name", formula_type_id, activate_date, product_type_id) VALUES('housing_plastic_common_init', (select id from formula.formula_type ft where ft.name = 'housing_plastic'), '1970-01-01', null);


INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, product_type_id)
select formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, (select id from formula.product_type pt where pt.type_name = 'DT') 
	from formula.common_parameter cp where cp.formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_metal')
	   and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, product_type_id)
select formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, (select id from formula.product_type pt where pt.type_name = 'AIO') 
	from formula.common_parameter cp where cp.formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_metal')
       and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');
      
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, product_type_id)
select formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, (select id from formula.product_type pt where pt.type_name = 'DT') 
	from formula.common_parameter cp where cp.formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_plastic')
       and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, product_type_id)
select formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, (select id from formula.product_type pt where pt.type_name = 'AIO') 
	from formula.common_parameter cp where cp.formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_plastic')
       and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_dt_init'), pv.value, pv.value_type, pv.source_table from formula.common_parameter cp
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
		and sd."name" not in ('housing_metal_dt_init', 'housing_metal_aio_init', 'housing_metal_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
);

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_aio_init'), pv.value, pv.value_type, pv.source_table from formula.common_parameter cp
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
		and sd."name" not in ('housing_metal_dt_init', 'housing_metal_aio_init', 'housing_metal_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'AIO'
);

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_dt_init'), pv.value, pv.value_type, pv.source_table from formula.common_parameter cp
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
		and sd."name" not in ('housing_plastic_dt_init', 'housing_plastic_aio_init', 'housing_plastic_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
);

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_aio_init'), pv.value, pv.value_type, pv.source_table from formula.common_parameter cp
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
		and sd."name" not in ('housing_plastic_dt_init', 'housing_plastic_aio_init', 'housing_plastic_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'AIO'
);

INSERT INTO formula.schedule_date ("name", formula_type_id, activate_date, product_type_id)
select 'hosuing_plastic_common', (select id from formula.formula_type ft where ft.name = 'housing_plastic'),  activate_date, null 
 from formula.schedule_date 
 where product_type_id = 1 and formula_type_id = 1 and activate_date != '1970-01-01';
 
update formula.parameter_value
set activate_date_id = b.b_id
from (
 select pv2.id as a_id, sd2.activate_date as a_activate_date
  from formula.parameter_value pv2
  inner join formula.schedule_date sd2 on (sd2.id = pv2.activate_date_id)
  where activate_date_id in (select id from formula.schedule_date where product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB') and formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_plastic'))
  and source_table in ('material', 'plastic_material_loss_rate_product_type', 'plastic_paint_info', 'plastic_paint_man_power', 'plastic_paint_vendor_type_color_bottom_top', 'plastic_paint_machine', 'module_machine')
) as a
inner join (
 select sd.id as b_id, sd.activate_date as b_activate_date from formula.schedule_date sd where product_type_id is null and formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_plastic')
) as b on (a.a_activate_date = b.b_activate_date)
where id = a.a_id;

INSERT INTO formula.schedule_date ("name", formula_type_id, activate_date, product_type_id)
select 'hosuing_metal_common', (select id from formula.formula_type ft where ft.name = 'housing_metal'),  activate_date, null 
 from formula.schedule_date 
 where product_type_id = 1 and formula_type_id = 1 and activate_date != '1970-01-01';
 
update formula.parameter_value
set activate_date_id = b.b_id
from (
 select pv2.id as a_id, sd2.activate_date as a_activate_date
  from formula.parameter_value pv2
  inner join formula.schedule_date sd2 on (sd2.id = pv2.activate_date_id)
  where activate_date_id in (select id from formula.schedule_date where product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB') and formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_metal'))
  and source_table in ('material_metal', 'metal_painting', 'module_machine_metal')
) as a
inner join (
 select sd.id as b_id, sd.activate_date as b_activate_date from formula.schedule_date sd where product_type_id is null and formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_metal')
) as b on (a.a_activate_date = b.b_activate_date)
where id = a.a_id;

/* metal */
ALTER TABLE formula.metal_syringe add column if not exists product_type_id int4 not null default 1;
ALTER TABLE formula.metal_syringe drop CONSTRAINT if exists metal_syringe_fk_pid;
ALTER TABLE formula.metal_syringe ADD CONSTRAINT metal_syringe_fk_pid FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id);
ALTER TABLE formula.metal_syringe drop CONSTRAINT if exists metal_syringe_un;
ALTER TABLE formula.metal_syringe ADD CONSTRAINT metal_syringe_un UNIQUE (syringe_name, product_type_id);

INSERT INTO formula.metal_syringe (syringe_name, product_type_id)
select syringe_name, (select id from formula.product_type pt where pt.type_name = 'DT') 
	from formula.metal_syringe cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

INSERT INTO formula.metal_syringe (syringe_name, product_type_id)
select syringe_name, (select id from formula.product_type pt where pt.type_name = 'AIO') 
	from formula.metal_syringe cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.syringe_diameter, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_dt_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_metal_dt_init', 'housing_metal_aio_init', 'housing_metal_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
);

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.syringe_diameter, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_aio_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_metal_dt_init', 'housing_metal_aio_init', 'housing_metal_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'AIO'
);

ALTER TABLE formula.metal_glue add column if not exists product_type_id int4 not null default 1;
ALTER TABLE formula.metal_glue drop CONSTRAINT if exists metal_glue_fk_pid;
ALTER TABLE formula.metal_glue ADD CONSTRAINT metal_glue_fk_pid FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id);
ALTER TABLE formula.metal_glue drop CONSTRAINT if exists metal_glue_un;
ALTER TABLE formula.metal_glue ADD CONSTRAINT metal_glue_un UNIQUE (glue_name, product_type_id);

INSERT INTO formula.metal_glue (glue_name, usd_g, density, product_type_id)
select glue_name, uuid_generate_v1(), uuid_generate_v1(), (select id from formula.product_type pt where pt.type_name = 'DT') 
	from formula.metal_glue cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

INSERT INTO formula.metal_glue (glue_name, usd_g, density, product_type_id)
select glue_name, uuid_generate_v1(), uuid_generate_v1(), (select id from formula.product_type pt where pt.type_name = 'AIO') 
	from formula.metal_glue cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.usd_g, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_dt_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_metal_dt_init', 'housing_metal_aio_init', 'housing_metal_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
);

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.usd_g, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_aio_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_metal_dt_init', 'housing_metal_aio_init', 'housing_metal_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'AIO'
);

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.density, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_dt_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_metal_dt_init', 'housing_metal_aio_init', 'housing_metal_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
);

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.density, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_aio_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_metal_dt_init', 'housing_metal_aio_init', 'housing_metal_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'AIO'
);

ALTER TABLE formula.metal_anode_color add column if not exists product_type_id int4 not null default 1;
ALTER TABLE formula.metal_anode_color drop CONSTRAINT if exists metal_anode_colo_fk_pid;
ALTER TABLE formula.metal_anode_color ADD CONSTRAINT metal_anode_colo_fk_pid FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id);
ALTER TABLE formula.metal_anode_color drop CONSTRAINT if exists metal_anode_color_un;
ALTER TABLE formula.metal_anode_color ADD CONSTRAINT metal_anode_color_un UNIQUE (name, product_type_id);


INSERT INTO formula.metal_anode_color (name, anode_time, ratio, usd_mm2, loss_rate, product_type_id)
select name, uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), (select id from formula.product_type pt where pt.type_name = 'DT') 
	from formula.metal_anode_color cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

INSERT INTO formula.metal_anode_color (name, anode_time, ratio, usd_mm2, loss_rate, product_type_id)
select name, uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), (select id from formula.product_type pt where pt.type_name = 'AIO') 
	from formula.metal_anode_color cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

--anode_time DT
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.anode_time, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_dt_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_metal_dt_init', 'housing_metal_aio_init', 'housing_metal_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
);
--ratio DT
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.ratio, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_dt_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_metal_dt_init', 'housing_metal_aio_init', 'housing_metal_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
);
--usd_mm2 DT
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.usd_mm2, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_dt_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_metal_dt_init', 'housing_metal_aio_init', 'housing_metal_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
);
--loss_rate DT
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.loss_rate, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_dt_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_metal_dt_init', 'housing_metal_aio_init', 'housing_metal_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
);

--anode_time AIO
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.anode_time, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_aio_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_metal_dt_init', 'housing_metal_aio_init', 'housing_metal_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'AIO'
);
--ratio AIO
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.ratio, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_aio_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_metal_dt_init', 'housing_metal_aio_init', 'housing_metal_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'AIO'
);
--usd_mm2 AIO
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.usd_mm2, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_aio_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_metal_dt_init', 'housing_metal_aio_init', 'housing_metal_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'AIO'
);
--loss_rate AIO
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.loss_rate, (select id from formula.schedule_date sd where sd."name" = 'housing_metal_aio_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_metal_dt_init', 'housing_metal_aio_init', 'housing_metal_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'AIO'
);

-- update view --
--metal_anode_color
DROP VIEW IF EXISTS formula.v_metal_andoe_color;
CREATE OR REPLACE VIEW formula.v_metal_andoe_color
AS SELECT mac.id,
    mac.name,
    mac.disable_time
FROM formula.metal_anode_color mac
where mac.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
);
ALTER TABLE formula.v_metal_andoe_color OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_andoe_color TO "swpc-user";

-- metal_glue
DROP VIEW IF EXISTS formula.v_metal_glue;
CREATE OR REPLACE VIEW formula.v_metal_glue
AS SELECT mg.id,
    mg.glue_name AS name,
    mg.disable_time
   FROM formula.metal_glue mg
where mg.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
);
ALTER TABLE formula.v_metal_glue OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_glue TO "swpc-user";

-- metal_syringe
DROP VIEW IF EXISTS formula.v_metal_glue_syringe_diameter;
CREATE OR REPLACE VIEW formula.v_metal_glue_syringe_diameter
AS SELECT ms.id,
    ms.syringe_name AS name,
    ms.disable_time
   FROM formula.metal_syringe ms
where ms.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
);
ALTER TABLE formula.v_metal_glue_syringe_diameter OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_glue_syringe_diameter TO "swpc-user";

/* plastic */
ALTER TABLE formula.plastic_embed_nail add column if not exists product_type_id int4 not null default 1;
ALTER TABLE formula.plastic_embed_nail drop CONSTRAINT if exists plastic_embed_nail_fk_pid;
ALTER TABLE formula.plastic_embed_nail ADD CONSTRAINT plastic_embed_nail_fk_pid FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id);
ALTER TABLE formula.plastic_embed_nail drop CONSTRAINT if exists plastic_embed_nail_un;
ALTER TABLE formula.plastic_embed_nail ADD CONSTRAINT plastic_embed_nail_un UNIQUE (embed_nail_name, product_type_id);

INSERT INTO formula.plastic_embed_nail (embed_nail_name, product_type_id)
select embed_nail_name, (select id from formula.product_type pt where pt.type_name = 'DT') 
	from formula.plastic_embed_nail cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

INSERT INTO formula.plastic_embed_nail (embed_nail_name, product_type_id)
select embed_nail_name, (select id from formula.product_type pt where pt.type_name = 'AIO') 
	from formula.plastic_embed_nail cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');
	
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.unit_price, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_dt_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_plastic_dt_init', 'housing_plastic_aio_init', 'housing_plastic_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
);

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.unit_price, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_aio_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_plastic_dt_init', 'housing_plastic_aio_init', 'housing_plastic_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'AIO'
);

ALTER TABLE formula.plastic_printing add column if not exists product_type_id int4 not null default 1;
ALTER TABLE formula.plastic_printing drop CONSTRAINT if exists plastic_printing_fk_pid;
ALTER TABLE formula.plastic_printing ADD CONSTRAINT plastic_printing_fk_pid FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id);
ALTER TABLE formula.plastic_printing drop CONSTRAINT if exists plastic_printing_un;
ALTER TABLE formula.plastic_printing ADD CONSTRAINT plastic_printing_un UNIQUE (printing_name, product_type_id);

INSERT INTO formula.plastic_printing (printing_name, product_type_id)
select printing_name, (select id from formula.product_type pt where pt.type_name = 'DT') 
	from formula.plastic_printing cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

INSERT INTO formula.plastic_printing (printing_name, product_type_id)
select printing_name, (select id from formula.product_type pt where pt.type_name = 'AIO') 
	from formula.plastic_printing cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.unit_price, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_dt_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_plastic_dt_init', 'housing_plastic_aio_init', 'housing_plastic_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
);

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.unit_price, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_aio_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_plastic_dt_init', 'housing_plastic_aio_init', 'housing_plastic_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'AIO'
);

ALTER TABLE formula.plastic_grinding add column if not exists product_type_id int4 not null default 1;
ALTER TABLE formula.plastic_grinding drop CONSTRAINT if exists plastic_grinding_fk_pid;
ALTER TABLE formula.plastic_grinding ADD CONSTRAINT plastic_grinding_fk_pid FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id);
ALTER TABLE formula.plastic_grinding drop CONSTRAINT if exists plastic_grinding_un;
ALTER TABLE formula.plastic_grinding ADD CONSTRAINT plastic_grinding_un UNIQUE (grinding_name, product_type_id);

INSERT INTO formula.plastic_grinding (grinding_name, product_type_id)
select grinding_name, (select id from formula.product_type pt where pt.type_name = 'DT') 
	from formula.plastic_grinding cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

INSERT INTO formula.plastic_grinding (grinding_name, product_type_id)
select grinding_name, (select id from formula.product_type pt where pt.type_name = 'AIO') 
	from formula.plastic_grinding cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.total_cost, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_dt_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_plastic_dt_init', 'housing_plastic_aio_init', 'housing_plastic_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
);

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.total_cost, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_aio_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_plastic_dt_init', 'housing_plastic_aio_init', 'housing_plastic_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'AIO'
);

ALTER TABLE formula.plastic_emi_sputtering_group add column if not exists product_type_id int4 not null default 1;
ALTER TABLE formula.plastic_emi_sputtering_group drop CONSTRAINT if exists plastic_emi_sputtering_group_fk_pid;
ALTER TABLE formula.plastic_emi_sputtering_group ADD CONSTRAINT plastic_emi_sputtering_group_fk_pid FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id);
ALTER TABLE formula.plastic_emi_sputtering_group drop CONSTRAINT if exists plastic_emi_group_un;
ALTER TABLE formula.plastic_emi_sputtering_group drop CONSTRAINT if exists plastic_emi_sputtering_group_un;
ALTER TABLE formula.plastic_emi_sputtering_group ADD CONSTRAINT plastic_emi_sputtering_group_un UNIQUE (group_name, product_type_id);

INSERT INTO formula.plastic_emi_sputtering_group (group_name, product_type_id)
select group_name, (select id from formula.product_type pt where pt.type_name = 'DT') 
	from formula.plastic_emi_sputtering_group cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

INSERT INTO formula.plastic_emi_sputtering_group (group_name, product_type_id)
select group_name, (select id from formula.product_type pt where pt.type_name = 'AIO') 
	from formula.plastic_emi_sputtering_group cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

ALTER TABLE formula.plastic_emi_sputtering_site_group add column if not exists product_type_id int4 not null default 1;
ALTER TABLE formula.plastic_emi_sputtering_site_group drop CONSTRAINT if exists plastic_emi_sputtering_site_group_fk_pid;
ALTER TABLE formula.plastic_emi_sputtering_site_group ADD CONSTRAINT plastic_emi_sputtering_site_group_fk_pid FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id);
ALTER TABLE formula.plastic_emi_sputtering_site_group drop CONSTRAINT if exists plastic_emi_site_group_un;
ALTER TABLE formula.plastic_emi_sputtering_site_group drop CONSTRAINT if exists plastic_emi_sputtering_site_group_un;
ALTER TABLE formula.plastic_emi_sputtering_site_group ADD CONSTRAINT plastic_emi_sputtering_site_group_un UNIQUE (site_id, product_type_id);
 --site group
INSERT INTO formula.plastic_emi_sputtering_site_group (group_id, site_id, remark, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name = '1') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.site WHERE (site_name = 'WKS')), NULL, now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_site_group (group_id, site_id, remark, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name = '1') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.site WHERE (site_name = 'WZS')), NULL, now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_site_group (group_id, site_id, remark, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name = '2') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.site WHERE (site_name = 'WCQ')), NULL, now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_site_group (group_id, site_id, remark, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name = '2') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.site WHERE (site_name = 'WCD')), NULL, now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));

INSERT INTO formula.plastic_emi_sputtering_site_group (group_id, site_id, remark, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name = '1') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.site WHERE (site_name = 'WKS')), NULL, now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_site_group (group_id, site_id, remark, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name = '1') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.site WHERE (site_name = 'WZS')), NULL, now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_site_group (group_id, site_id, remark, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name = '2') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.site WHERE (site_name = 'WCQ')), NULL, now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_site_group (group_id, site_id, remark, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name = '2') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.site WHERE (site_name = 'WCD')), NULL, now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));

ALTER TABLE formula.plastic_emi_sputtering_size add column if not exists product_type_id int4 not null default 1;
ALTER TABLE formula.plastic_emi_sputtering_size drop CONSTRAINT if exists plastic_emi_sputtering_size_fk_pid;
ALTER TABLE formula.plastic_emi_sputtering_size ADD CONSTRAINT plastic_emi_sputtering_size_fk_pid FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id);
ALTER TABLE formula.plastic_emi_sputtering_size drop CONSTRAINT if exists plastic_emi_size_un;
ALTER TABLE formula.plastic_emi_sputtering_size drop CONSTRAINT if exists plastic_emi_sputtering_size_un;
ALTER TABLE formula.plastic_emi_sputtering_size ADD CONSTRAINT plastic_emi_sputtering_size_un UNIQUE (emi_size, product_type_id);

INSERT INTO formula.plastic_emi_sputtering_size (emi_size, "size", product_type_id)
select emi_size, "size", (select id from formula.product_type pt where pt.type_name = 'DT') 
	from formula.plastic_emi_sputtering_size cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

INSERT INTO formula.plastic_emi_sputtering_size (emi_size, "size", product_type_id)
select emi_size, "size", (select id from formula.product_type pt where pt.type_name = 'AIO') 
	from formula.plastic_emi_sputtering_size cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

ALTER TABLE formula.plastic_emi_sputtering_base add column if not exists product_type_id int4 not null default 1;
ALTER TABLE formula.plastic_emi_sputtering_base drop CONSTRAINT if exists plastic_emi_sputtering_base_fk_pid;
ALTER TABLE formula.plastic_emi_sputtering_base ADD CONSTRAINT plastic_emi_sputtering_base_fk_pid FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id);
ALTER TABLE formula.plastic_emi_sputtering_base drop CONSTRAINT if exists plastic_emi_base_un;
ALTER TABLE formula.plastic_emi_sputtering_base drop CONSTRAINT if exists plastic_emi_sputtering_base_un;
ALTER TABLE formula.plastic_emi_sputtering_base ADD CONSTRAINT plastic_emi_sputtering_base_un UNIQUE (emi_base, product_type_id);

INSERT INTO formula.plastic_emi_sputtering_base (emi_base, product_type_id)
select emi_base, (select id from formula.product_type pt where pt.type_name = 'DT') 
	from formula.plastic_emi_sputtering_base cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

INSERT INTO formula.plastic_emi_sputtering_base (emi_base, product_type_id)
select emi_base, (select id from formula.product_type pt where pt.type_name = 'AIO') 
	from formula.plastic_emi_sputtering_base cp where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB');

ALTER TABLE formula.plastic_emi_sputtering_link add column if not exists product_type_id int4 not null default 1;
ALTER TABLE formula.plastic_emi_sputtering_link drop CONSTRAINT if exists plastic_emi_sputtering_link_fk_pid;
ALTER TABLE formula.plastic_emi_sputtering_link ADD CONSTRAINT plastic_emi_sputtering_link_fk_pid FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id);
ALTER TABLE formula.plastic_emi_sputtering_link drop CONSTRAINT if exists plastic_emi_base_un;
ALTER TABLE formula.plastic_emi_sputtering_link drop CONSTRAINT if exists plastic_emi_sputtering_link_un;
ALTER TABLE formula.plastic_emi_sputtering_link ADD CONSTRAINT plastic_emi_sputtering_link_un UNIQUE (group_id, size_id, base_id, product_type_id);

--plastic_emi_sputtering_link DT
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'DT'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'DT'));
 
--plastic_emi_sputtering_link AIO
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time, product_type_id) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%') and (product_type_id = (select id from formula.product_type pt where pt.type_name = 'AIO'))), now(), null, (select id from formula.product_type pt where pt.type_name = 'AIO'));
 
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_dt_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_plastic_dt_init', 'housing_plastic_aio_init', 'housing_plastic_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'DT'
);

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, (select id from formula.schedule_date sd where sd."name" = 'housing_plastic_aio_init'), pv.value, pv.value_type, pv.source_table
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
		and sd."name" not in ('housing_plastic_dt_init', 'housing_plastic_aio_init', 'housing_plastic_common_init')
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	))
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'AIO'
);


-- update view --
--plastic_embed_nail
DROP VIEW IF EXISTS formula.v_plastic_embed_nail;
CREATE OR REPLACE VIEW formula.v_plastic_embed_nail
AS SELECT pen.id,
    pen.embed_nail_name AS name,
    pen.disable_time
   FROM formula.plastic_embed_nail pen
where pen.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
);
ALTER TABLE formula.v_plastic_embed_nail OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_embed_nail TO "swpc-user";

--plastic_emi_sputtering_base
DROP VIEW IF EXISTS formula.v_plastic_emi_sputtering_base;
CREATE OR REPLACE VIEW formula.v_plastic_emi_sputtering_base
AS SELECT pesb.id,
    pesb.emi_base AS name,
    pesb.disable_time
   FROM formula.plastic_emi_sputtering_base pesb
where pesb.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
);
ALTER TABLE formula.v_plastic_emi_sputtering_base OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_emi_sputtering_base TO "swpc-user";

--plastic_emi_sputtering_size
DROP VIEW IF EXISTS formula.v_plastic_emi_sputtering_size;
CREATE OR REPLACE VIEW formula.v_plastic_emi_sputtering_size
AS SELECT pess.id,
    pess.emi_size AS name,
    pess.disable_time
   FROM formula.plastic_emi_sputtering_size pess
where pess.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
);
ALTER TABLE formula.v_plastic_emi_sputtering_size OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_emi_sputtering_size TO "swpc-user";

--plastic_grinding
DROP VIEW IF EXISTS formula.v_plastic_grinding;
CREATE OR REPLACE VIEW formula.v_plastic_grinding
AS SELECT pg.id,
    pg.grinding_name AS name,
    pg.disable_time
   FROM formula.plastic_grinding pg
where pg.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
);
ALTER TABLE formula.v_plastic_grinding OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_grinding TO "swpc-user";