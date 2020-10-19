CREATE OR REPLACE FUNCTION formula.modify_all_metal_press_module_machine_price(p_value text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$

    declare
    begin
	   update formula.parameter_value set "value" = p_value 
	   where parameter_id in (select id from formula.metal_press_module_machine_type) 
	   and activate_date_id in 
	  (select id from formula.schedule_date sd 
	  where formula_type_id = (select id from formula.formula_type ft where "name" = 'housing_metal') and "name" = 'housing_metal_common');
    END;  
    
$function$
;


CREATE OR REPLACE FUNCTION formula.modify_all_plastic_module_machine_price(p_value text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$

    declare
    begin
	   update formula.parameter_value set value = p_value 
	   where parameter_id in (select id from formula.module_machine) 
	   and activate_date_id in 
	  (select id from formula.schedule_date sd 
	  where formula_type_id = (select id from formula.formula_type ft where name = 'housing_plastic') and name = 'housing_plastic_common');
    END;  
    
$function$
;