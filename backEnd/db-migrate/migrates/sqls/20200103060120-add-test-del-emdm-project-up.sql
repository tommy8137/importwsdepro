CREATE OR REPLACE FUNCTION wiprocurement.test_fn_eproc_delete_bom_project(bomid integer)
 RETURNS void
 LANGUAGE plpgsql
AS $function$

    --#variable_conflict use_variable
    declare
	  bom_item RECORD;
	  bom_version RECORD;
    begin
	  for bom_version in (select * from wiprocurement.bom_stage_version where bom_id = bomid)
	  LOOP
	  	FOR bom_item IN (select * from wiprocurement.bom_item where version_id = bom_version.id)
	  	loop
	   		delete from wiprocurement.bom_partlist_value where bom_item_id = bom_item.id;
	  	end loop;
	    delete from wiprocurement.bom_item where version_id = bom_version.id;
	  end loop;
	  
	  delete from wiprocurement.bom_designee where bom_project_id = bomid;
	  delete from wiprocurement.bom_stage_version where bom_id = bomid;
	  delete from wiprocurement.bom_projects where id = bomid;
	  delete from wiprocurement.emdm_receive_record where epro_me_project_id = bomid;
    END;  
    
$function$
;