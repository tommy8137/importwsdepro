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
		material_wrong_rec RECORD;
		material_wrong_complete_rec RECORD;
    begin
	    update wiprocurement.drop_down_item set item_name='T1.0' where "path"='EMC2.GASKE.UL_ECO_FORM.T1' and item_name='1';
	 	update wiprocurement.drop_down_item set item_name='T1.5' where "path"='EMC2.GASKE.UL_ECO_FORM.T1P5' and item_name='1.5';
	 	update wiprocurement.drop_down_item set item_name='T2.0' where "path"='EMC2.GASKE.UL_ECO_FORM.T2' and item_name='2';
	 
	    update wiprocurement.drop_down_item set item_name='T1.0' where "path"='EMC2.GASKE.NON_UL_ECO_FORM.T1' and item_name='1';
	 	update wiprocurement.drop_down_item set item_name='T1.5' where "path"='EMC2.GASKE.NON_UL_ECO_FORM.T1P5' and item_name='1.5';
	 	update wiprocurement.drop_down_item set item_name='T2.0' where "path"='EMC2.GASKE.NON_UL_ECO_FORM.T2' and item_name='2';

	 	update wiprocurement.drop_down_item set item_name='C1840' where "path"='HOUSING.METAL.C18400' and item_name='C18400';
	 
	 	update wiprocurement.drop_down_item set item_name='PC_30percent_GF' where "path"='HOUSING.PLAST.PC_31PERCENT_GF' and item_name='PC_31percent_GF';
	 	update wiprocurement.drop_down_item set item_name='PC_30percent_GF' where "path"='HOUSING.PLAST.PC_32PERCENT_GF' and item_name='PC_32percent_GF';
	 	update wiprocurement.drop_down_item set item_name='PC_30percent_GF' where "path"='HOUSING.PLAST.PC_33PERCENT_GF' and item_name='PC_33percent_GF';
	 	update wiprocurement.drop_down_item set item_name='PC_20percent_GF' where "path"='HOUSING.PLAST.PC_20ERCENT_GF' and item_name='PC_20ercent_GF';
	 	update wiprocurement.drop_down_item set item_name='PC_20percent_GF' where "path"='HOUSING.PLAST.PC_21ERCENT_GF' and item_name='PC_21ercent_GF';
	 
	 	update wiprocurement.drop_down_item set item_name='一般厚度' where "path"='EMC2.GASKE.ULGasket_GRAY.0' and item_name='0';
	 	update wiprocurement.drop_down_item set item_name='一般厚度' where "path"='EMC2.GASKE.Non_ULGasket_GRAY.0' and item_name='0';
	 
	 	update wiprocurement.drop_down_item set item_name='Dupont_Delrin100' where "path"='HOUSING.PLAST.POM.DUPONT_DELRIN100' and item_name='Dupont_Delrin 100';
	 	update wiprocurement.drop_down_item set item_name='PC_20percent_GF' where "path"='HOUSING.RHCM_.PC_20ERCENT_GF' and item_name='PC_20ercent_GF';
		
	 	update wiprocurement.bom_item
	 	set material_spec=(select material_spec_id from formula.v_me_bom_materialspec_and_material_value where material_spec_name = 'Silicon'),
	 		material=(select material_id from formula.v_me_bom_materialspec_and_material_value where material_name = 'Silicon_矽膠')
	 	where material_spec=(select id from wiprocurement.drop_down_item where item_name = 'Silicon(矽膠)');
	 	
	 	update wiprocurement.bom_item_complete_version
	 	set material_spec=(select material_spec_id from formula.v_me_bom_materialspec_and_material_value where material_spec_name = 'Silicon'),
	 		material=(select material_id from formula.v_me_bom_materialspec_and_material_value where material_name = 'Silicon_矽膠')
	 	where material_spec=(select id from wiprocurement.drop_down_item where item_name = 'Silicon(矽膠)');
	 	
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
		-- fix same name material to currect uuid in bom_item
		for material_wrong_rec in (
			select distinct bi.id, bi.material_spec, matename.material_spec_id as mate_origin_spec_id, specname.material_spec_name, matename.material_spec_name as mate_origin_spec_name, bi.material as material_id, mateid.material_id as origin_material_id, matename.material_name
			from wiprocurement.bom_item bi
			left join formula.v_me_bom_materialspec_and_material_value specname on specname.material_spec_id = bi.material_spec
			left join formula.v_me_bom_materialspec_and_material_value matename on matename.material_id = bi.material
			left join formula.v_me_bom_materialspec_and_material_value mateid on mateid.material_spec_id = bi.material_spec and mateid.material_spec_id = specname.material_spec_id and mateid.material_name = matename.material_name
			where matename.material_spec_id::text != specname.material_spec_id::text
			and bi.material is not null
			and bi.material_spec is not null
			order by specname.material_spec_name
		)
		loop
			update wiprocurement.bom_item bi
			set material = material_wrong_rec.origin_material_id
			where bi.id = material_wrong_rec.id;
		END loop;
		-- fix same name material to currect uuid in bom_item_complete_version
		for material_wrong_complete_rec in (
			select distinct bi.id, bi.material_spec, matename.material_spec_id as mate_origin_spec_id, specname.material_spec_name, matename.material_spec_name as mate_origin_spec_name, bi.material as material_id, mateid.material_id as origin_material_id, matename.material_name
			from wiprocurement.bom_item_complete_version bi
			left join formula.v_me_bom_materialspec_and_material_value specname on specname.material_spec_id = bi.material_spec
			left join formula.v_me_bom_materialspec_and_material_value matename on matename.material_id = bi.material
			left join formula.v_me_bom_materialspec_and_material_value mateid on mateid.material_spec_id = bi.material_spec and mateid.material_spec_id = specname.material_spec_id and mateid.material_name = matename.material_name
			where matename.material_spec_id::text != specname.material_spec_id::text
			and bi.material is not null
			and bi.material_spec is not null
			order by specname.material_spec_name
		)
		loop
			update wiprocurement.bom_item_complete_version bi
			set material = material_wrong_complete_rec.origin_material_id
			where bi.id = material_wrong_complete_rec.id;
		END loop;
    END;  
$function$
;

select wiprocurement.fn_eproc_update_bomitem_material_spec_and_material();

