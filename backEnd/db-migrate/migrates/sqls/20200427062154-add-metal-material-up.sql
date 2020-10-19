-- 增加 metal 材料 db function
drop function if exists formula.fn_add_material_metal;
create or replace function formula.fn_add_material_metal(in_material_name varchar(200), in_density numeric, in_thickness numeric, in_price varchar(200), in_arr_category text[])
 RETURNS void
 LANGUAGE plpgsql
AS $function$
declare 
 part_category_2_key text;
begin 
	-- add material
	insert into formula.material_metal ("name", density ) values (in_material_name, in_density) on conflict do nothing;
	-- add thickness
	insert into formula.material_thinkness (material_metal_id, thickness)
	select ma.id, in_thickness from formula.material_metal ma where ma."name" = in_material_name and ma.density = in_density on conflict do nothing;
	-- add price
	insert into formula.parameter_value (parameter_id, value_type, value, source_table, activate_date_id)
	select mt.id, 'number', in_price, 'material_thinkness', sd.id
	from formula.material_thinkness mt
	left join formula.material_metal ma on mt.material_metal_id = ma.id,
	formula.schedule_date sd
	where mt.thickness = in_thickness
	and ma."name" = in_material_name
	and ma.density = in_density
	and sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'material') on conflict do nothing;
	-- add material into part_category_material_metal
	for part_category_2_key in (select unnest(in_arr_category))
	loop
		insert into formula.part_category_material_metal (material_metal_id , pategory_category_2_id )
		select ma.id, link.part_category_2_id
		from formula.material_metal ma,
		(
      SELECT pc2.id AS part_category_2_id,
		    pc2.category_name as part_category_2_name,
		    bpf.format_key AS part_list_format
		  FROM wiprocurement.bom_partlist_config bpc
		  LEFT JOIN wiprocurement.bom_partlist_format bpf ON bpc.format = bpf.id
		  LEFT JOIN formula.part_category_2 pc2 ON pc2.id = bpc.parts_ctgy_2
    ) link
		where ma."name" = in_material_name
		and link.part_list_format = 'housing-metal'
	  and link.part_category_2_name = part_category_2_key on conflict do nothing;
	 end loop;  
end;
$function$
;
select formula.fn_add_material_metal('ST400', 2.85, 0.4, '8.5', array['Metal']);
select formula.fn_add_material_metal('SUS301', 7.93, 0.4, '4.4', array['Metal']);
select formula.fn_add_material_metal('SUS304', 7.93, 0.4, '4.7', array['Metal']);

-- 加入材料至thermal_plate
insert into formula.thermal_category (metal_material_id , category_type )
select a.id, 'thermal_plate'
from formula.material_metal a where "name" in ('SUS301', 'SUS304') on conflict do nothing;