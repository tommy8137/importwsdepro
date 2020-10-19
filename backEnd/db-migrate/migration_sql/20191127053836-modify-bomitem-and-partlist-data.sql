--update view add disable time condition
CREATE OR REPLACE VIEW formula.v_me_bom_materialspec_and_material_value
AS SELECT a.part_cate1_id,
    a.part_cate1_name,
    a.part_cate2_id,
    a.part_cate2_name,
    a.material_spec_id,
    a.material_spec_name,
    a.material_id,
    a.material_name
   FROM ( SELECT b.part_cate1_id,
            b.part_cate1_name,
            b.part_cate2_id,
            b.part_cate2_name,
            c.material_spec_id,
            c.material_spec_name,
            c.material_id,
            c.material_name
           FROM (select * from formula.part_category_material where disable_time is null) a_1
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name
                   FROM (select * from formula.part_category_1 where disable_time is null) a_2
                     JOIN (select * from formula.part_category_2 where disable_time is null) b_1 ON a_2.id = b_1.part_category_1_id) b ON a_1.part_category_2_id = b.part_cate2_id
             JOIN ( SELECT a_2.id AS material_spec_id,
                    a_2.material_spec_name,
                    b_1.id AS material_id,
                    b_1.material_name
                   FROM (select * from formula.material_spec where disable_time is null) a_2
                     JOIN (select * from formula.material where disable_time is null) b_1 ON a_2.id = b_1.material_spec_id) c ON a_1.material_id = c.material_id
        UNION ALL
         SELECT c.part_cate1_id,
            c.part_cate1_name,
            c.part_cate2_id,
            c.part_cate2_name,
            a_1.id AS material_spec_id,
            a_1.material_spec_name,
            b.id AS material_id,
            b.material_name
           FROM formula.diecut_material_spec a_1
             JOIN (select * from formula.diecut_material where disable_time is null) b ON a_1.id = b.diecut_material_spec_id
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name
                   FROM (select * from formula.part_category_1 where disable_time is null) a_2
                     JOIN (select * from formula.part_category_2 where disable_time is null) b_1 ON a_2.id = b_1.part_category_1_id) c ON a_1.part_category_2_id = c.part_cate2_id
        UNION ALL
         SELECT b.part_cate1_id,
            b.part_cate1_name,
            b.part_cate2_id,
            b.part_cate2_name,
            c.id AS material_spec_id,
            c.name AS material_spec_name,
            NULL::uuid AS material_id,
            NULL::character varying AS material_name
           FROM (select * from formula.part_category_material_metal where disable_time is null) a_1
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name
                   FROM (select * from formula.part_category_1 where disable_time is null) a_2
                     JOIN (select * from formula.part_category_2 where disable_time is null) b_1 ON a_2.id = b_1.part_category_1_id) b ON a_1.pategory_category_2_id = b.part_cate2_id
             JOIN formula.material_metal c ON a_1.material_metal_id = c.id
        UNION ALL
         SELECT b.part_cate1_id,
            b.part_cate1_name,
            b.part_cate2_id,
            b.part_cate2_name,
            a_1.id AS material_spec_id,
            a_1.material_name AS material_spec_name,
            NULL::uuid AS material_id,
            NULL::character varying AS material_name
           FROM (select * from formula.cablefpc_material where disable_time is null) a_1
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name
                   FROM (select * from formula.part_category_1 where disable_time is null) a_2
                     JOIN (select * from formula.part_category_2 where disable_time is null) b_1 ON a_2.id = b_1.part_category_1_id) b ON a_1.part_category_2_id = b.part_cate2_id
        UNION ALL
         SELECT b.part_cate1_id,
            b.part_cate1_name,
            b.part_cate2_id,
            b.part_cate2_name,
            a_1.id AS material_spec_id,
            a_1.material_name AS material_spec_name,
            NULL::uuid AS material_id,
            NULL::character varying AS material_name
           FROM (select * from formula.magnet_material where disable_time is null) a_1
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name
                   FROM (select * from formula.part_category_1 where disable_time is null) a_2
                     JOIN (select * from formula.part_category_2 where disable_time is null) b_1 ON a_2.id = b_1.part_category_1_id) b ON a_1.part_category_2_id = b.part_cate2_id
        UNION ALL
         SELECT c.part_cate1_id,
            c.part_cate1_name,
            c.part_cate2_id,
            c.part_cate2_name,
            a_1.id AS material_spec_id,
            a_1.spec_name AS material_sepc_name,
            b.id AS material_id,
            b.material_name
           FROM (select * from formula.rubber_material_spec where disable_time is null) a_1
             JOIN (select * from formula.rubber_material where disable_time is null) b ON a_1.id = b.spec_id
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name
                   FROM (select * from formula.part_category_1 where disable_time is null) a_2
                     JOIN (select * from formula.part_category_2 where disable_time is null) b_1 ON a_2.id = b_1.part_category_1_id) c ON a_1.part_category_2_id = c.part_cate2_id
        UNION ALL
         SELECT b.part_cate1_id,
            b.part_cate1_name,
            b.part_cate2_id,
            b.part_cate2_name,
            a_1.id AS material_spec_id,
            a_1.material_name AS material_sepc_name,
            NULL::uuid AS material_id,
            NULL::character varying AS material_name
           FROM (select * from formula.turning_material where disable_time is null) a_1
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name
                   FROM (select * from formula.part_category_1 where disable_time is null) a_2
                     JOIN (select * from formula.part_category_2 where disable_time is null) b_1 ON a_2.id = b_1.part_category_1_id) b ON a_1.part_category_2_id = b.part_cate2_id) a;

-- Permissions

ALTER TABLE formula.v_me_bom_materialspec_and_material_value OWNER TO "swpc-user";


--update exist bom_item Plastic_NB, Plastic_DT_AIO to Plastic
update wiprocurement.bom_item set parts_ctgy_2 = (select id from formula.part_category_2 where part_category_1_id = (select id from  formula.part_category_1 where category_name='Housing') and category_name='Plastic')
where (parts_ctgy_2 = (select id from formula.part_category_2 where part_category_1_id = (select id from  formula.part_category_1 where category_name='Housing') and category_name='Plastic_NB') 
	or parts_ctgy_2 = (select id from formula.part_category_2 where part_category_1_id = (select id from  formula.part_category_1 where category_name='Housing') and category_name='Plastic_DT_AIO'));
	
	
update wiprocurement.bom_item_complete_version set parts_ctgy_2 = (select id from formula.part_category_2 where part_category_1_id = (select id from  formula.part_category_1 where category_name='Housing') and category_name='Plastic')
where (parts_ctgy_2 = (select id from formula.part_category_2 where part_category_1_id = (select id from  formula.part_category_1 where category_name='Housing') and category_name='Plastic_NB') 
	or parts_ctgy_2 = (select id from formula.part_category_2 where part_category_1_id = (select id from  formula.part_category_1 where category_name='Housing') and category_name='Plastic_DT_AIO'));
	

--Plastic_NB, Plastic_DT_AIO set disable time
update formula.part_category_2 set disable_time = now() where (id = (select id from formula.part_category_2 where part_category_1_id = (select id from  formula.part_category_1 where category_name='Housing') and category_name='Plastic_NB') 
	or id = (select id from formula.part_category_2 where part_category_1_id = (select id from  formula.part_category_1 where category_name='Housing') and category_name='Plastic_DT_AIO'));

----ALTER TABLE
ALTER TABLE wiprocurement.bom_partlist_format ADD hasui BOOLEAN DEFAULT TRUE;

--update format
-- update  wiprocurement.bom_partlist_format set format_key='thermal-pad',format_value='thermal-pad' where format_key='thermal-graphite';

-- update wiprocurement.bom_partlist_value set formate='thermal-graphite' where formate='thermal-pad';
-- update wiprocurement.bom_partlist_value_complete set formate='thermal-graphite' where formate='thermal-pad'; 

--add format
INSERT INTO wiprocurement.bom_partlist_format(id, format_key, format_value)VALUES(uuid_generate_v1(), 'meothers-screw', 'meothers-screw');
INSERT INTO wiprocurement.bom_partlist_format(id, format_key, format_value)VALUES(uuid_generate_v1(), 'thermal-graphite', 'thermal-graphite');
INSERT INTO wiprocurement.bom_partlist_format(id, format_key, format_value)VALUES(uuid_generate_v1(), 'meothers-nut', 'meothers-nut');
INSERT INTO wiprocurement.bom_partlist_format(id, format_key, format_value, hasui)VALUES(uuid_generate_v1(), 'emc-magnet', 'emc-magnet', false);

update wiprocurement.bom_partlist_config set format=(select id from wiprocurement.bom_partlist_format where format_key='meothers-screw')
where parts_ctgy_1 = (select id from formula.part_category_1 where category_name='ME_others')
and parts_ctgy_2 = (select id from formula.part_category_2 where category_name='Screw');

update wiprocurement.bom_partlist_config set format=(select id from wiprocurement.bom_partlist_format where format_key='thermal-graphite')
where parts_ctgy_1 = (select id from formula.part_category_1 where category_name='Thermal')
and parts_ctgy_2 = (select id from formula.part_category_2 where category_name='Graphite_Sheet');

update wiprocurement.bom_partlist_config set format=(select id from wiprocurement.bom_partlist_format where format_key='meothers-nut')
where parts_ctgy_1 = (select id from formula.part_category_1 where category_name='ME_others')
and parts_ctgy_2 = (select id from formula.part_category_2 where category_name='Nut');

-- update wiprocurement.bom_partlist_config set format=(select id from wiprocurement.bom_partlist_format where format_key='emc-magnet')
-- where parts_ctgy_1 = (select id from formula.part_category_1 where category_name='EMC')
-- and parts_ctgy_2 = (select id from formula.part_category_2 where category_name='Magnet');

INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format)
VALUES((select id from formula.part_category_1 where category_name='EMC'), (select id from formula.part_category_2 where category_name='Magnet'), (select id from wiprocurement.bom_partlist_format where format_key='emc-magnet'));

---update exist data
update wiprocurement.bom_partlist_value set formate='meothers-screw' where id in(
	select id from wiprocurement.bom_partlist_value where bom_item_id in(
	select id from wiprocurement.bom_item where parts_ctgy_1 = (select id from formula.part_category_1 where category_name='ME_others') 
	and parts_ctgy_2 = (select id from formula.part_category_2 where category_name='Screw') 
	)
);

update wiprocurement.bom_partlist_value set formate='meothers-nut' where id in(
	select id from wiprocurement.bom_partlist_value where bom_item_id in(
	select id from wiprocurement.bom_item where parts_ctgy_1 = (select id from formula.part_category_1 where category_name='ME_others') 
	and parts_ctgy_2 = (select id from formula.part_category_2 where category_name='Nut') 
	)
);

update wiprocurement.bom_partlist_value_complete set formate='meothers-screw' where id in(
	select id from wiprocurement.bom_partlist_value_complete where bom_item_id in(
	select id from wiprocurement.bom_item_complete_version where parts_ctgy_1 = (select id from formula.part_category_1 where category_name='ME_others') 
	and parts_ctgy_2 = (select id from formula.part_category_2 where category_name='Screw') 
	)
);

update wiprocurement.bom_partlist_value_complete set formate='meothers-nut' where id in(
	select id from wiprocurement.bom_partlist_value_complete where bom_item_id in(
	select id from wiprocurement.bom_item_complete_version where parts_ctgy_1 = (select id from formula.part_category_1 where category_name='ME_others') 
	and parts_ctgy_2 = (select id from formula.part_category_2 where category_name='Nut') 
	)
);

update wiprocurement.bom_partlist_value set formate='thermal-graphite' where id in(
	select id from wiprocurement.bom_partlist_value where bom_item_id in(
	select id from wiprocurement.bom_item where parts_ctgy_1 = (select id from formula.part_category_1 where category_name='Thermal') 
	and parts_ctgy_2 = (select id from formula.part_category_2 where category_name='Graphite_Sheet') 
	)
);

update wiprocurement.bom_partlist_value_complete set formate='thermal-graphite' where id in(
	select id from wiprocurement.bom_partlist_value_complete where bom_item_id in(
	select id from wiprocurement.bom_item_complete_version where parts_ctgy_1 = (select id from formula.part_category_1 where category_name='Thermal') 
	and parts_ctgy_2 = (select id from formula.part_category_2 where category_name='Graphite_Sheet') 
	)
);



