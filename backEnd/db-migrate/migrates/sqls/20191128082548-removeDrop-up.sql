/* Replace with your SQL commands */
--add data
INSERT INTO formula.func_ctgy(id, func_ctgy_name, remark, create_time, disable_time) VALUES((select id from wiprocurement.drop_down_item where field_name='func_ctgy' and item_name='EMC'), 'EMC', null, now(), null);
-- INSERT INTO formula.supply_type(id, supply_type_name, remark, create_time, disable_time) VALUES((select id from wiprocurement.drop_down_item where field_name='supply_type' and item_name='TBD'), 'TBD', null, now(), null);


--remove bom item foreign key
ALTER TABLE wiprocurement.bom_item DROP CONSTRAINT IF EXISTS bom_item_func_ctgy_fkey;
ALTER TABLE wiprocurement.bom_item DROP CONSTRAINT IF EXISTS bom_item_gb_assy_ctgy_fkey;
ALTER TABLE wiprocurement.bom_item DROP CONSTRAINT IF EXISTS bom_item_material_fkey;
ALTER TABLE wiprocurement.bom_item DROP CONSTRAINT IF EXISTS bom_item_material_spec_fkey;
ALTER TABLE wiprocurement.bom_item DROP CONSTRAINT IF EXISTS bom_item_parts_ctgy_1_fkey;
ALTER TABLE wiprocurement.bom_item DROP CONSTRAINT IF EXISTS bom_item_parts_ctgy_2_fkey;
ALTER TABLE wiprocurement.bom_item DROP CONSTRAINT IF EXISTS bom_item_supply_type_fkey;

delete from wiprocurement.drop_down_item where item_name='ODM' and field_name='supply_type' and layout_name='bom_item';
delete from wiprocurement.drop_down_item where item_name='OEM' and field_name='supply_type' and layout_name='bom_item';

--update exist data
update  wiprocurement.bom_item set supply_type = (select id from formula.supply_type where supply_type_name='AVAP')
where supply_type not in(select id from formula.supply_type);

update  wiprocurement.bom_item_complete_version set supply_type = (select id from formula.supply_type where supply_type_name='AVAP')
where supply_type not in(select id from formula.supply_type);

--add bom item foreign key
ALTER TABLE wiprocurement.bom_item ADD CONSTRAINT bom_item_func_ctgy_fkey FOREIGN KEY (func_ctgy) REFERENCES formula.func_ctgy(id);
ALTER TABLE wiprocurement.bom_item ADD CONSTRAINT bom_item_gb_assy_ctgy_fkey FOREIGN KEY (gb_assy_ctgy) REFERENCES formula.gb_assy_ctgy(id);
ALTER TABLE wiprocurement.bom_item ADD CONSTRAINT bom_item_parts_ctgy_1_fkey FOREIGN KEY (parts_ctgy_1) REFERENCES formula.part_category_1(id);
ALTER TABLE wiprocurement.bom_item ADD CONSTRAINT bom_item_parts_ctgy_2_fkey FOREIGN KEY (parts_ctgy_2) REFERENCES formula.part_category_2(id);
ALTER TABLE wiprocurement.bom_item ADD CONSTRAINT bom_item_supply_type_fkey FOREIGN KEY (supply_type) REFERENCES formula.supply_type(id);

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
		FOR rec IN (select a.parts_ctgy_1, a.parts_ctgy_2, a.material_spec, b.item_name as material_spec_name,a.material,c.item_name as material_name from wiprocurement.bom_item a 
			inner join wiprocurement.drop_down_item b on a.material_spec = b.id
			inner join wiprocurement.drop_down_item c on a.material = c.id)
			LOOP
				FOR material_spec_rec in (select * from formula.v_me_bom_materialspec_and_material_value 
					where part_cate1_id=rec.parts_ctgy_1 and  part_cate2_id=rec.parts_ctgy_2 and TRIM(UPPER(material_spec_name))=TRIM(UPPER(rec.material_spec_name)))
					loop
						-- update bom item material_spec
						update wiprocurement.bom_item set material_spec = material_spec_rec.material_spec_id 
							where parts_ctgy_1 = rec.parts_ctgy_1 and parts_ctgy_2 = rec.parts_ctgy_2 and material_spec = rec.material_spec;
						-- update complete bom item material_spec
						update wiprocurement.bom_item_complete_version set material_spec = material_spec_rec.material_spec_id 
							where parts_ctgy_1 = rec.parts_ctgy_1 and parts_ctgy_2 = rec.parts_ctgy_2 and material_spec = rec.material_spec;
						RAISE NOTICE ' material_spec_rec part_ctg1-% - part_ctg2-% - material_spec-%', material_spec_rec.part_cate1_id, material_spec_rec.part_cate2_id, material_spec_rec.material_spec_name;
					END loop;
				FOR material_rec in (select * from formula.v_me_bom_materialspec_and_material_value 
					where part_cate1_id=rec.parts_ctgy_1 and  part_cate2_id=rec.parts_ctgy_2 and TRIM(UPPER(material_spec_name))=TRIM(UPPER(rec.material_spec_name))
					and TRIM(UPPER(material_name))=TRIM(UPPER(rec.material_name)))
					loop
						-- update bom item material_spec
						update wiprocurement.bom_item set material = material_rec.material_id 
							where parts_ctgy_1 = rec.parts_ctgy_1 and parts_ctgy_2 = rec.parts_ctgy_2 and material = rec.material;
						update wiprocurement.bom_item_complete_version set material_spec = material_spec_rec.material_spec_id 
							where parts_ctgy_1 = rec.parts_ctgy_1 and parts_ctgy_2 = rec.parts_ctgy_2 and material = rec.material;
						RAISE NOTICE 'material_rec part_ctg1-% - part_ctg2-% - material-%', material_rec.part_cate1_id, material_rec.part_cate2_id, material_rec.material_name;
					END loop;
		END LOOP;
		FOR complete_rec IN (select a.parts_ctgy_1, a.parts_ctgy_2, a.material_spec, b.item_name as material_spec_name,a.material,c.item_name as material_name from wiprocurement.bom_item_complete_version a 
				inner join wiprocurement.drop_down_item b on a.material_spec = b.id
				inner join wiprocurement.drop_down_item c on a.material = c.id)
				LOOP
					FOR material_spec_rec in (select * from formula.v_me_bom_materialspec_and_material_value 
						where part_cate1_id=complete_rec.parts_ctgy_1 and  part_cate2_id=complete_rec.parts_ctgy_2 and TRIM(UPPER(material_spec_name))=TRIM(UPPER(complete_rec.material_spec_name)))
						loop
							-- update complete bom item material_spec
							update wiprocurement.bom_item_complete_version set material_spec = material_spec_rec.material_spec_id 
								where parts_ctgy_1 = complete_rec.parts_ctgy_1 and parts_ctgy_2 = complete_rec.parts_ctgy_2 and material_spec = complete_rec.material_spec;
							RAISE NOTICE ' material_spec_rec part_ctg1-% - part_ctg2-% - material_spec-%', material_spec_rec.part_cate1_id, material_spec_rec.part_cate2_id, material_spec_rec.material_spec_name;
						END loop;
					FOR material_rec in (select * from formula.v_me_bom_materialspec_and_material_value 
						where part_cate1_id=rec.parts_ctgy_1 and  part_cate2_id=rec.parts_ctgy_2 and TRIM(UPPER(material_spec_name))=TRIM(UPPER(rec.material_spec_name))
						and TRIM(UPPER(material_name))=TRIM(UPPER(rec.material_name)))
						loop
							-- update bom item material_spec
							update wiprocurement.bom_item_complete_version set material_spec = material_spec_rec.material_spec_id 
								where parts_ctgy_1 = complete_rec.parts_ctgy_1 and parts_ctgy_2 = complete_rec.parts_ctgy_2 and material = complete_rec.material;
							RAISE NOTICE 'material_rec part_ctg1-% - part_ctg2-% - material-%', material_rec.part_cate1_id, material_rec.part_cate2_id, material_rec.material_name;
						END loop;
			END LOOP;
    END;

$function$
;
