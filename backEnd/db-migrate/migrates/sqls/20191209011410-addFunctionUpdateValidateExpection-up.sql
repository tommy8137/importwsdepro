/* Replace with your SQL commands */
--update exist material spec and material
CREATE OR REPLACE FUNCTION wiprocurement.fn_eproc_update_bom_itme_validate_exception_config_material_spec()
 RETURNS void
 LANGUAGE plpgsql
AS $$

    --#variable_conflict use_variable
    DECLARE
		rec RECORD;
    begin
	    delete from wiprocurement.bom_itme_validate_exception_config where material_spec is not null;
		FOR rec IN (
			select * from formula.v_me_bom_materialspec_and_material_value where material_spec_name='Other_Fill_ME_Remark'
		)
		LOOP
			insert into wiprocurement.bom_itme_validate_exception_config (parts_ctgy_1, parts_ctgy_2, material_spec, "type") values (rec.part_cate1_id, rec.part_cate2_id, rec.material_spec_id, (select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_dependency_val'));
		END LOOP;
    END;  
$$;

select wiprocurement.fn_eproc_update_bom_itme_validate_exception_config_material_spec();