DROP VIEW IF EXISTS formula.v_ffc_pitch_size;
CREATE VIEW formula.v_ffc_pitch_size as
select 
tab.pitch_id,
pv.value as ptich_size,
pv2.value as machine_price,
pv3.value as gilt_rate,
pv4.value as oversize_gilt_rate,
tab.product_type_id
from (
	select
	  cp.id as pitch_id,
	  cp."label" as pitch_label,
	  cp2.id as machine_price_id,
	  cp2."label" as machine_price_label,
	  cp3.id as gilt_rate_id,
	  cp3."label" as gilt_rate_label,
	  cp4.id as oversize_gilt_rate_id,
	  cp4."label" as oversize_gilt_rate_label,
	  cp.product_type_id,
	  sd.id as activate_date_id
	from formula.common_parameter cp
	left join formula.common_parameter cp2 on cp2.sub_type = cp."label" and cp2."label" like 'pitch\__\_machine\_price' and cp2.product_type_id = cp.product_type_id 
	left join formula.common_parameter cp3 on cp3.sub_type = cp."label" and cp3."label" like 'pitch\__\_3um\_gilt\_rate' and cp3.product_type_id = cp.product_type_id  
	left join formula.common_parameter cp4 on cp4.sub_type = cp."label" and cp4."label" like 'pitch\__\_oversize\_gilt\_rate' and cp4.product_type_id = cp.product_type_id,
	formula.schedule_date sd
	where cp.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
	and cp."label" in ('pitch_specification_1', 'pitch_specification_2')
	and cp.product_type_id in (select id from formula.product_type where type_name in ('DT', 'AIO'))
	and sd.id = (
		select id
		from formula.schedule_date
		where formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
		and product_type_id = cp.product_type_id
		and activate_date < now() limit(1)
	)
) tab,
formula.parameter_value pv, 
formula.parameter_value pv2, 
formula.parameter_value pv3, 
formula.parameter_value pv4
where pv.parameter_id = tab.pitch_id and pv.activate_date_id = tab.activate_date_id
and pv2.parameter_id = tab.machine_price_id and pv2.activate_date_id = tab.activate_date_id
and pv3.parameter_id = tab.gilt_rate_id and pv3.activate_date_id = tab.activate_date_id
and pv4.parameter_id = tab.oversize_gilt_rate_id and pv4.activate_date_id = tab.activate_date_id;


-- Permissions
ALTER TABLE formula.v_ffc_pitch_size OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_ffc_pitch_size TO "swpc-user";
GRANT SELECT ON TABLE formula.v_ffc_pitch_size TO emdm;

