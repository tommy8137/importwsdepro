DROP VIEW IF EXISTS formula.v_ffc_assembly_seconds;
CREATE VIEW formula.v_ffc_assembly_seconds AS
	select
		base.id,
		base."label",
		base.sub_type,
		const_str_val.value as const_start,
		const_end_val.value as const_end,
		pv2.value as assembly_seconds,
		base.product_type_id
	from (
		select
		id,
		"label",
		sub_type,
		split_part(REGEXP_REPLACE(regexp_matches(label_name, '\{\{(.*\}\} <+)','g')::text, '(\{|\}| |<|")', '', 'g'), ',', '3') as const_start,
		split_part(REGEXP_REPLACE(regexp_matches(label_name, '= \{\{(.*\}\}+)', 'g')::text, '(\{|\}| |<|")', '', 'g'), ',', '3') as const_end,
		product_type_id
		from formula.common_parameter
		where formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
		and sub_type in ('flat_paste_assembly_seconds', 'round_cover_assembly_seconds_w', 'round_cover_assembly_seconds_l')
	) base
	left join (
		select cp."label", pv.value, cp.product_type_id
		from formula.common_parameter cp
		left join formula.parameter_value pv on pv.parameter_id = cp.id
		left join formula.schedule_date sd on sd.id = pv.activate_date_id
		where cp.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
		and sub_type in ('flat_paste_l_const', 'round_cover_w_const', 'round_cover_l_const')
		and sd.id = (
			select id
			from formula.schedule_date
			where formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
			and product_type_id = cp.product_type_id
			and activate_date < now() limit(1)
		)
	) const_str_val on const_str_val."label" = base.const_start and const_str_val.product_type_id = base.product_type_id
	left join (
		select cp."label", pv.value, cp.product_type_id
		from formula.common_parameter cp
		left join formula.parameter_value pv on pv.parameter_id = cp.id
		left join formula.schedule_date sd on sd.id = pv.activate_date_id
		where cp.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
		and sub_type in ('flat_paste_l_const', 'round_cover_w_const', 'round_cover_l_const')
		and sd.id = (
			select id
			from formula.schedule_date
			where formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
			and product_type_id = cp.product_type_id
			and activate_date < now() limit(1)
		)
	) const_end_val on const_end_val."label" = base.const_end and const_end_val.product_type_id = base.product_type_id
	join formula.parameter_value pv2 on pv2.parameter_id = base.id
	join formula.schedule_date sd2 on sd2.id  = pv2.activate_date_id
	where sd2.id = (
		select id
		from formula.schedule_date
		where formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
		and product_type_id = base.product_type_id
		and activate_date < now() limit(1)
	)
	order by base.product_type_id, base.label;
  
-- Permissions
ALTER TABLE formula.v_ffc_assembly_seconds OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_ffc_assembly_seconds TO "swpc-user";
GRANT SELECT ON TABLE formula.v_ffc_assembly_seconds TO emdm;