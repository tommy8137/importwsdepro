drop function if exists formula.fn_set_part_category_disable;
drop function if exists formula.fn_part_category2_disable;
CREATE OR REPLACE FUNCTION formula.fn_part_category2_disable(type2_id uuid, product_type_name character varying)
 RETURNS void
 LANGUAGE plpgsql
AS $function$

    declare
    type2_id_list Record;
    type2_count integer := 0;
    begin
    if product_type_name = 'all' then
    	update formula.part_category_2_product_type set disable_time = now() where part_category_2_id = type2_id and disable_time is Null;
    elseif product_type_name is null then
    	update formula.part_category_2_product_type set disable_time = now() where part_category_2_id = type2_id and disable_time is null and product_type_id is null;
    else 
        update formula.part_category_2_product_type set disable_time = now() where part_category_2_id = 
        type2_id and disable_time is Null and product_type_id = (SELECT id from formula.product_type where type_name = product_type_name);
   	end if;
    select count(*) into type2_count from formula.part_category_2_product_type where part_category_2_id = type2_id and disable_time is null;
    if type2_count = 0 then
     update formula.part_category_2 set disable_time = now() where id = type2_id and disable_time is null;
    end if;
    end;
$function$;


CREATE OR REPLACE FUNCTION formula.fn_set_part_category_disable(type1_name character varying, type2_name character varying, product_type_name character varying)
 RETURNS void
 LANGUAGE plpgsql
AS $function$

    declare
	type1_id UUID;
    type2_id_list Record;
   	type2_count integer := 0;
   	disable_result Record;
    begin

    SELECT part_category_1.id into type1_id  from formula.part_category_1 where category_name = type1_name and disable_time is Null;
    if type1_id is NULL then
     raise exception 'can not find type1: %', type1_name;
    else
      if type2_name = 'all' Then
      	for type2_id_list in (select * from formula.part_category_2 where part_category_1_id = type1_id and disable_time is Null)
      	loop
      		perform formula.fn_part_category2_disable(type2_id_list.id, product_type_name);
      	end loop;
      elseif type2_name is null then
      	raise exception 'type2_name is null!';
      else
      	for type2_id_list in (select * from formula.part_category_2 where part_category_1_id = type1_id and category_name = type2_name and disable_time is Null)
      	loop
      		perform formula.fn_part_category2_disable(type2_id_list.id, product_type_name);
      	end loop;
      end if;
     SELECT count(*) into type2_count  from formula.part_category_2 where part_category_1_id = type1_id and disable_time is null;
     if (type2_count = 0) then
      update formula.part_category_1 set disable_time = now() where category_name = type1_name and disable_time is Null;
     end if;
    end if;
    END;  
    
$function$
;

select formula.fn_set_part_category_disable('Medical', 'all', 'all');


