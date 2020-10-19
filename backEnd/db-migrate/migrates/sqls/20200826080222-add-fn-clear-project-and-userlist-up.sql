CREATE OR REPLACE FUNCTION wiprocurement.fn_truncate_ee_me_project(confirm text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$

    declare
    begin
	   if confirm = 'truncateproject' then
	  --#me
	  truncate table wiprocurement.bom_stage_version RESTART identity CASCADE;
	  truncate table wiprocurement.bom_item RESTART identity CASCADE;
	  truncate table wiprocurement.bom_partlist_value RESTART identity CASCADE;
	  truncate table wiprocurement.bom_item_complete_version RESTART identity CASCADE;
	  truncate table wiprocurement.bom_partlist_value_complete RESTART identity CASCADE;
	  truncate table wiprocurement.bom_designee RESTART identity CASCADE;
	  truncate table wiprocurement.bom_project_edit_history RESTART identity CASCADE;
	  truncate table wiprocurement.bom_project_parameter_value RESTART identity CASCADE;
	  truncate table wiprocurement.bom_projects RESTART identity CASCADE;
	  truncate table wiprocurement.emdm_receive_record RESTART identity CASCADE;
	  truncate table wiprocurement.emdm_receive_fail_record RESTART identity CASCADE;
	  truncate table wiprocurement.bom_projects_archive RESTART identity CASCADE;
	  truncate table wiprocurement.bom_sourcer_cost_temp RESTART identity CASCADE;
	  truncate table wiprocurement.bom_user_favorite RESTART identity CASCADE;
	  truncate table wiprocurement.bom_item_upload_temp RESTART identity CASCADE;
	  truncate table wiprocurement.bom_item_upload_record RESTART identity CASCADE;
	  --#ee
	  truncate table wiprocurement.edm_version RESTART identity CASCADE;
	  truncate table wiprocurement.eebom_detail RESTART identity CASCADE;
	  truncate table wiprocurement.ee_assignment RESTART identity CASCADE;
	  truncate table wiprocurement.eebom_projects RESTART identity CASCADE;
	  truncate table wiprocurement.eedm_cost_summarytable RESTART identity CASCADE;
	  truncate table wiprocurement.eedm_bom_item RESTART identity CASCADE;
	  truncate table wiprocurement.eedm_pcb_temp RESTART identity CASCADE;
	  truncate table wiprocurement.eedm_pn_2nd_highest_price RESTART identity CASCADE;
	  truncate table wiprocurement.eedm_pn_lowest_price RESTART identity CASCADE;
	  truncate table wiprocurement.pcb RESTART identity CASCADE;
	  --#dashboard
	  truncate table wiprocurement.dashboard_version RESTART identity CASCADE;
	  else
	   raise EXCEPTION 'please enter the confirm message: truncateproject';
	  end if;
    END;  
    
$function$
;

CREATE OR REPLACE FUNCTION wiprocurement.fn_clear_userlist(confirm text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$

    declare
    begin
	   if confirm = 'truncateuser' then  
	  --#hr
	  truncate table wiprocurement.ps_ee_prcrmnt_vw_a RESTART identity CASCADE;
	  delete from wiprocurement."user" where emplid !='10700001';
	 else
	   raise EXCEPTION 'please enter the confirm message: truncateuser';
	 end if;
    END;  
    
$function$
;