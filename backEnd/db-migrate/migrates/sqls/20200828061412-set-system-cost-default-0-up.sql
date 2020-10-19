ALTER TABLE wiprocurement.bom_item ALTER COLUMN system_cost SET DEFAULT 0;

CREATE OR REPLACE FUNCTION wiprocurement.temp_fn_system_cost_default_replacement()
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
		where bpv.partlist_price -> 'totalPrices' is null -- 該json key不存在，表示為沒算過的part system_cost 預設為0
	  )
	  loop
	  	-- update system_cost
	  	update wiprocurement.bom_item bi
	  	set system_cost = 0
	  	where bi.id = replace_item.bom_item_id;
	  end loop;
    END;  
    
$function$
;

select wiprocurement.temp_fn_system_cost_default_replacement();

drop function if exists wiprocurement.temp_fn_system_cost_default_replacement;