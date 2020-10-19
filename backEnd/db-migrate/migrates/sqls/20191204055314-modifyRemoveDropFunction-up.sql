/* Replace with your SQL commands */
--update exist material spec and material
CREATE OR REPLACE FUNCTION wiprocurement.fn_eproc_update_bomitem_material_spec_and_material()
 RETURNS void
 LANGUAGE plpgsql
AS $function$

    --#variable_conflict use_variable
    DECLARE
		rec RECORD;
		material_spec_rec RECORD;
		material_rec RECORD;
		complete_rec RECORD;
    BEGIN
		FOR rec IN (
			select a.parts_ctgy_1, a.parts_ctgy_2, a.material_spec, b.item_name as material_spec_name,a.material,c.item_name as material_name 
			from wiprocurement.bom_item a 
			inner join wiprocurement.drop_down_item b on a.material_spec = b.id
			left join wiprocurement.drop_down_item c on a.material = c.id
		)
		LOOP
			FOR material_spec_rec in (
				select * 
				from formula.v_me_bom_materialspec_and_material_value 
				where part_cate1_id=rec.parts_ctgy_1 and  part_cate2_id=rec.parts_ctgy_2 and TRIM(UPPER(material_spec_name))=TRIM(UPPER(rec.material_spec_name))
			)
			loop
				-- update bom item material_spec
				update wiprocurement.bom_item 
				set material_spec = material_spec_rec.material_spec_id 
				where parts_ctgy_1 = rec.parts_ctgy_1 and parts_ctgy_2 = rec.parts_ctgy_2 and material_spec = rec.material_spec;
				RAISE NOTICE ' material_spec_rec part_ctg1-% - part_ctg2-% - material_spec-%', material_spec_rec.part_cate1_id, material_spec_rec.part_cate2_id, material_spec_rec.material_spec_name;
			END loop;
			FOR material_rec in (
				select * 
				from formula.v_me_bom_materialspec_and_material_value 
				where part_cate1_id=rec.parts_ctgy_1 and  part_cate2_id=rec.parts_ctgy_2 and TRIM(UPPER(material_spec_name))=TRIM(UPPER(rec.material_spec_name))
				and TRIM(UPPER(material_name))=TRIM(UPPER(rec.material_name))
			)
			loop
				-- update bom item material
				update wiprocurement.bom_item set material = material_rec.material_id 
				where parts_ctgy_1 = rec.parts_ctgy_1 and parts_ctgy_2 = rec.parts_ctgy_2 and material = rec.material;
				RAISE NOTICE 'material_rec part_ctg1-% - part_ctg2-% - material-%', material_rec.part_cate1_id, material_rec.part_cate2_id, material_rec.material_name;
			END loop;
		END LOOP;
		FOR complete_rec IN (
			select a.parts_ctgy_1, a.parts_ctgy_2, a.material_spec, b.item_name as material_spec_name,a.material,c.item_name as material_name 
			from wiprocurement.bom_item_complete_version a 
			inner join wiprocurement.drop_down_item b on a.material_spec = b.id
			left join wiprocurement.drop_down_item c on a.material = c.id
		)
		LOOP
			FOR material_spec_rec in (
				select * 
				from formula.v_me_bom_materialspec_and_material_value 
				where part_cate1_id=complete_rec.parts_ctgy_1 and  part_cate2_id=complete_rec.parts_ctgy_2 and TRIM(UPPER(material_spec_name))=TRIM(UPPER(complete_rec.material_spec_name))
			)
			loop
				-- update complete bom item material_spec
				update wiprocurement.bom_item_complete_version 
				set material_spec = material_spec_rec.material_spec_id 
				where parts_ctgy_1 = complete_rec.parts_ctgy_1 and parts_ctgy_2 = complete_rec.parts_ctgy_2 and material_spec = complete_rec.material_spec;
				RAISE NOTICE ' material_spec_rec part_ctg1-% - part_ctg2-% - material_spec-%', material_spec_rec.part_cate1_id, material_spec_rec.part_cate2_id, material_spec_rec.material_spec_name;
			END loop;
			FOR material_rec in (
				select * 
				from formula.v_me_bom_materialspec_and_material_value 
				where part_cate1_id=complete_rec.parts_ctgy_1 and  part_cate2_id=complete_rec.parts_ctgy_2 and TRIM(UPPER(material_spec_name))=TRIM(UPPER(rec.material_spec_name)) and TRIM(UPPER(material_name))=TRIM(UPPER(rec.material_name))
			)
			loop
				-- update bom item material
				update wiprocurement.bom_item_complete_version 
				set material = material_rec.material_id 
				where parts_ctgy_1 = complete_rec.parts_ctgy_1 and parts_ctgy_2 = complete_rec.parts_ctgy_2 and material = complete_rec.material;
				RAISE NOTICE 'material_rec part_ctg1-% - part_ctg2-% - material-%', material_rec.part_cate1_id, material_rec.part_cate2_id, material_rec.material_name;
			END loop;
		END LOOP;
    END;  
$function$
;