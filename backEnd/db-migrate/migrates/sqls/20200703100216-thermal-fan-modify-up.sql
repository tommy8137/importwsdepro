-- add new material
insert into formula.thermal_fan_material(material_name)values
('CLCP(0.15~0.2)'),
('SLCP(0.1~0.15)')
on conflict do nothing;

-- rename old material
update formula.thermal_fan_material tfm
set material_name = tmp.new_name
from (
	select 'PBT' as ori_name, 'PBT(0.35~0.4)' as new_name
	union all
	select 'LCP' as ori_name, 'LCP(0.2~0.3)' as new_name
) tmp
where tmp.ori_name = tfm.material_name;

-- add fan material size relation
insert into formula.thermal_fan_fan_material(fan_id, material_id)
select fan.id, ma.id
from formula.thermal_fan fan,
formula.thermal_fan_material ma
where fan.disable_time is null 
and ma.disable_time is null
on conflict do nothing;

-- add material size relation price
drop table if exists formula.tmp_thermal_fan_fan_material_price;
CREATE TABLE if not exists formula.tmp_thermal_fan_fan_material_price (
	fan_size varchar(200),
	material_name varchar(200),
	price varchar(200)
);
insert into formula.tmp_thermal_fan_fan_material_price(fan_size, material_name, price)values
('60x60x3.0', 	'CLCP(0.15~0.2)', '0'),
('60x60x3.5', 	'CLCP(0.15~0.2)', '0'),
('60x60x4.0', 	'CLCP(0.15~0.2)', '0'),
('60x60x4.5', 	'CLCP(0.15~0.2)', '0'),
('60x60x5.0', 	'CLCP(0.15~0.2)', '0.5'),
('60x60x5.5', 	'CLCP(0.15~0.2)', '0.5'),
('60x60x6.0', 	'CLCP(0.15~0.2)', '0.5'),
('60x60x6.5', 	'CLCP(0.15~0.2)', '0.5'),
('60x60x7.0', 	'CLCP(0.15~0.2)', '0.5'),
('60x60x7.5', 	'CLCP(0.15~0.2)', '0.5'),
('80x80x8.0', 	'CLCP(0.15~0.2)', '0.5'),
('80x80x8.5', 	'CLCP(0.15~0.2)', '0.5'),
('80x80x9.0', 	'CLCP(0.15~0.2)', '0.5'),
('80x80x9.5', 	'CLCP(0.15~0.2)', '0.5'),
('80x80x10',	'CLCP(0.15~0.2)', '0.5'),
('80x80x10.5', 	'CLCP(0.15~0.2)', '0.5'),
('80x80x11', 	'CLCP(0.15~0.2)', '0.5'),
('80x80x11.5', 	'CLCP(0.15~0.2)', '0.5'),
('80x80x12', 	'CLCP(0.15~0.2)', '0.5'),
('60x60x3.0', 	'SLCP(0.1~0.15)', '0'),
('60x60x3.5', 	'SLCP(0.1~0.15)', '0'),
('60x60x4.0', 	'SLCP(0.1~0.15)', '0'),
('60x60x4.5', 	'SLCP(0.1~0.15)', '0'),
('60x60x5.0', 	'SLCP(0.1~0.15)', '1.5'),
('60x60x5.5', 	'SLCP(0.1~0.15)', '1.5'),
('60x60x6.0', 	'SLCP(0.1~0.15)', '1.5'),
('60x60x6.5', 	'SLCP(0.1~0.15)', '1.5'),
('60x60x7.0', 	'SLCP(0.1~0.15)', '1.5'),
('60x60x7.5', 	'SLCP(0.1~0.15)', '1.5'),
('80x80x8.0', 	'SLCP(0.1~0.15)', '1.5'),
('80x80x8.5', 	'SLCP(0.1~0.15)', '1.5'),
('80x80x9.0', 	'SLCP(0.1~0.15)', '1.5'),
('80x80x9.5', 	'SLCP(0.1~0.15)', '1.5'),
('80x80x10', 	'SLCP(0.1~0.15)', '1.5'),
('80x80x10.5', 	'SLCP(0.1~0.15)', '1.5'),
('80x80x11', 	'SLCP(0.1~0.15)', '1.5'),
('80x80x11.5', 	'SLCP(0.1~0.15)', '1.5'),
('80x80x12', 	'SLCP(0.1~0.15)', '1.5')
on conflict do nothing;

insert into formula.parameter_value(parameter_id, value, value_type, activate_date_id, source_table)
select link.id, tmp.price, 'number', sd.id, 'thermal_fan_fan_material'
from (
	select  fm.id, fan.fan_size, ma.material_name
	from formula.thermal_fan_fan_material fm
	join formula.thermal_fan fan on fan.id = fm.fan_id 
	join formula.thermal_fan_material ma on ma.id = fm.material_id
) link,
formula.tmp_thermal_fan_fan_material_price tmp,
formula.schedule_date sd
where link.fan_size = tmp.fan_size
and link.material_name = tmp.material_name
and sd.formula_type_id = (select id from formula.formula_type where "name" = 'thermal_module')
on conflict do nothing;

drop table if exists formula.tmp_thermal_fan_fan_material_price;


-- find fan partlist
/*select -- 找出material name 是舊的的 partlist item
	bpv.id,
	dat."key",
	dat.value ->> 'fanBladeMaterial' as fan_material,
	nam.new_name,
	replace(bpv.partlist_value::text, nam.ori_name, nam.new_name )as result
from wiprocurement.bom_partlist_value bpv,
json_each(bpv.partlist_value -> 'Price' -> 'thermalFan') dat,
(
	select 'PBT' as ori_name, 'PBT(0.35~0.4)' as new_name
	union all
	select 'LCP' as ori_name, 'LCP(0.2~0.3)' as new_name
) nam
where bpv.partlist_value -> 'Price' ->> 'thermalFan' is not null
and dat."key" like 'Fan-%'
and dat.value ->> 'fanBladeMaterial' = nam.ori_name;--*/

CREATE OR REPLACE FUNCTION wiprocurement.temp_fn_fan_material_replacement()
 RETURNS void
 LANGUAGE plpgsql
AS $function$

    --#variable_conflict use_variable
    declare
	  fan_item RECORD;
    begin
	  for fan_item in (
		select
			bpv.id,
			dat."key",
			dat.value ->> 'fanBladeMaterial' as fan_material,
			nam.new_name,
			replace('{Price, thermalFan, <<fan_name>>, fanBladeMaterial}', '<<fan_name>>', dat."key") as path_to_modify
		from wiprocurement.bom_partlist_value bpv,
		json_each(bpv.partlist_value -> 'Price' -> 'thermalFan') dat,
		(
			select 'PBT' as ori_name, 'PBT(0.35~0.4)' as new_name
			union all
			select 'LCP' as ori_name, 'LCP(0.2~0.3)' as new_name
		) nam
		where bpv.partlist_value -> 'Price' ->> 'thermalFan' is not null
		and dat."key" like 'Fan-%'
		and dat.value ->> 'fanBladeMaterial' = nam.ori_name
	  )
	  LOOP
	  	update wiprocurement.bom_partlist_value bpv
	  	set partlist_value = replace(bpv.partlist_value::text, fan_item.fan_material, fan_item.new_name)::json
	  	where bpv.id = fan_item.id;
	  end loop;
    END;  
    
$function$
;

select wiprocurement.temp_fn_fan_material_replacement();

drop function if exists wiprocurement.temp_fn_fan_material_replacement;

select formula.fn_common_paramter_add_with_sub_type('thermal_module', 'thermal_module_components', 'thermal_fan_voltage', 'thermal_fan_voltage_5v', 'Fan 電壓(5V)', 'USD', '零件費 風扇電壓5V價差', 'NB', '0', false);
select formula.fn_common_paramter_add_with_sub_type('thermal_module', 'thermal_module_components', 'thermal_fan_voltage', 'thermal_fan_voltage_12v', 'Fan 電壓(12V)', 'USD', '零件費 風扇電壓12V價差', 'NB', '0.5', false);

insert into formula.me_spec (spec_category, spec_name)values
('thermal_fan_voltage', '5V'),
('thermal_fan_voltage', '12V')
on conflict do nothing;

CREATE OR REPLACE VIEW formula.v_thermal_fan_voltage as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'thermal_fan_voltage';

-- Permissions
ALTER TABLE formula.v_thermal_fan_voltage OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_thermal_fan_voltage TO "swpc-user";
GRANT SELECT ON TABLE formula.v_thermal_fan_voltage TO emdm;