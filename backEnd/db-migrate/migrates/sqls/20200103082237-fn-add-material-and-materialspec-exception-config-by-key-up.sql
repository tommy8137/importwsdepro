DROP FUNCTION IF EXISTS wiprocurement.fn_eproc_update_bom_itme_validate_exception_config_material_spe();
DROP FUNCTION IF EXISTS wiprocurement.fn_eproc_update_bom_item_validate_exception_config_no_need_part();
CREATE OR REPLACE FUNCTION wiprocurement.fn_eproc_update_material_and_materialspec_validate_exception_config_by_key(exceptiontype_key varchar)
 RETURNS void
 LANGUAGE plpgsql
AS $function$

    --#variable_conflict use_variable
    DECLARE
	    material_rec RECORD;
      material_sepc_rec RECORD;
	    type_key_id UUID;
	    type_count integer;
    begin
	    type_count :=(select count(*) from wiprocurement.bom_itme_validate_exception_type where exception_type_key=exceptiontype_key);
	    type_key_id :=(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key=exceptiontype_key);
	    if type_count THEN
      --#delete material_spec and material old no_need_partlist data 
      delete from wiprocurement.bom_itme_validate_exception_config where material_spec in (select material_spec_id from formula.v_me_bom_materialspec_and_material_value where material_spec_name = 'Other_Fill_ME_Remark') and "type" = type_key_id;
	    delete from wiprocurement.bom_itme_validate_exception_config where material in (select material_id from formula.v_me_bom_materialspec_and_material_value where material_name = 'Other_Fill_ME_Remark') and "type" = type_key_id;
      --#update material = no_need_partlist
		  FOR material_rec IN (
			  select * from formula.v_me_bom_materialspec_and_material_value where material_name='Other_Fill_ME_Remark'
		  )
		  LOOP
			  insert into wiprocurement.bom_itme_validate_exception_config (parts_ctgy_1, parts_ctgy_2, material_spec, material, "type") values (material_rec.part_cate1_id, material_rec.part_cate2_id, material_rec.material_spec_id, material_rec.material_id, type_key_id);
		  END LOOP;
    --#update material_spec = no_need_partlist
      FOR material_sepc_rec IN (
			  select * from formula.v_me_bom_materialspec_and_material_value where material_spec_name='Other_Fill_ME_Remark'
		  )
		  LOOP
			  insert into wiprocurement.bom_itme_validate_exception_config (parts_ctgy_1, parts_ctgy_2, material_spec, material, "type") values (material_sepc_rec.part_cate1_id, material_sepc_rec.part_cate2_id, material_sepc_rec.material_spec_id, material_sepc_rec.material_id, type_key_id);
		  END LOOP;
	end if;
    END;  
    
$function$
;