CREATE OR REPLACE FUNCTION wiprocurement.temp_fn_other_fill_remark_total_price_replacement()
 RETURNS void
 LANGUAGE plpgsql
AS $function$

    --#variable_conflict use_variable
    declare
	  replace_item RECORD;
    begin
	  for replace_item in (
		select 
			bpv.id,
			bpv.bom_item_id,
			bpv.partlist_price
		from wiprocurement.bom_partlist_value bpv
		where bpv.partlist_value::text like '%Other_Fill_ME_Remark%'
		and bpv.partlist_price ->> 'totalPrices' is not null
	  )
	  loop
	  	-- update part_list_value
	  	update wiprocurement.bom_partlist_value bpv
	  	set partlist_price = jsonb_set(replace_item.partlist_price::jsonb, '{totalPrices}', 'null', false)::json
	  	where bpv.id = replace_item.id;
	  	-- update system_cost
	  	update wiprocurement.bom_item bi
	  	set system_cost = null
	  	where bi.id = replace_item.bom_item_id;
	  end loop;
    END;  
    
$function$
;

select wiprocurement.temp_fn_other_fill_remark_total_price_replacement();

drop function if exists wiprocurement.temp_fn_other_fill_remark_total_price_replacement;