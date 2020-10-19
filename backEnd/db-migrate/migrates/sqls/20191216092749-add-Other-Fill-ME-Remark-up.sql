/* Replace with your SQL commands */
--Cable	FPC

INSERT INTO formula.cablefpc_material (id, material_name, part_category_2_id) VALUES('974ad85e-1fb3-11ea-8fc8-0242ac110002', 'Other_Fill_ME_Remark', (select id from formula.part_category_2 pc where pc.category_name = 'FPC')) on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) 
select '974ad85e-1fb3-11ea-8fc8-0242ac110002', sd.id, '0', 'number', 'cablefpc_material', now() from formula.schedule_date sd 
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'cable_fpc') on conflict do nothing;


--EMC	Magnet
INSERT INTO formula.magnet_material (id, material_name, part_category_2_id) VALUES('ae7625c8-1fb4-11ea-8fc8-0242ac110002', 'Other_Fill_ME_Remark', (select id from formula.part_category_2 pc where pc.category_name = 'Magnet')) on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) 
select 'ae7625c8-1fb4-11ea-8fc8-0242ac110002', sd.id, '0', 'number', 'magnet_material', now() from formula.schedule_date sd 
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'emc_magnet') on conflict do nothing;


--EMC	Shielding_Can
INSERT INTO formula.material_metal (id, "name", density) VALUES('2fb5c698-1fb5-11ea-8fc8-0242ac110002', 'Other_Fill_ME_Remark', 0) on conflict do nothing;

INSERT INTO formula.material_thinkness (id, material_metal_id, thickness) VALUES('b4e6c780-1fb6-11ea-8fc8-0242ac110002', '2fb5c698-1fb5-11ea-8fc8-0242ac110002', 0) on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) 
select 'b4e6c780-1fb6-11ea-8fc8-0242ac110002', sd.id, '0', 'number', 'material_thinkness', now() from formula.schedule_date sd 
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'material') on conflict do nothing;

INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'Shielding_Can'), '2fb5c698-1fb5-11ea-8fc8-0242ac110002') on conflict do nothing;

--Housing	Aluminum
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'Aluminum'), '2fb5c698-1fb5-11ea-8fc8-0242ac110002') on conflict do nothing;
--Housing	C_GPU_BKT
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'C_GPU_BKT'), '2fb5c698-1fb5-11ea-8fc8-0242ac110002') on conflict do nothing;
--Housing	Metal
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'Metal'), '2fb5c698-1fb5-11ea-8fc8-0242ac110002') on conflict do nothing; 
--Housing	HDD_SSD_BKT
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'HDD_SSD_BKT'), '2fb5c698-1fb5-11ea-8fc8-0242ac110002') on conflict do nothing;
--Housing	Double_Injection
INSERT INTO formula.material_spec (id, material_spec_name) VALUES('3a05bc6e-1fd0-11ea-8fc8-0242ac110002', 'Other_Fill_ME_Remark') on conflict do nothing;

INSERT INTO formula.material (material_name, material_spec_id)
select 'Other_Fill_ME_Remark', ms.id from formula.material_spec ms on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) 
select m.id, sd.id, '0', 'number', 'material', now() from formula.schedule_date sd, formula.material m
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'material') and m.material_name = 'Other_Fill_ME_Remark' on conflict do nothing;


INSERT INTO formula.part_category_material (part_category_2_id, material_id)
select (select id from formula.part_category_2 pc where pc.category_name = 'Double_Injection'), m.id from formula.material m where m.material_name = 'Other_Fill_ME_Remark' on conflict do nothing; 


--Housing	IMR
INSERT INTO formula.part_category_material (part_category_2_id, material_id)
select (select id from formula.part_category_2 pc where pc.category_name = 'IMR'), m.id from formula.material m where m.material_name = 'Other_Fill_ME_Remark' on conflict do nothing; 

--Housing	Painting
INSERT INTO formula.part_category_material (part_category_2_id, material_id)
select (select id from formula.part_category_2 pc where pc.category_name = 'Painting'), m.id from formula.material m where m.material_name = 'Other_Fill_ME_Remark' on conflict do nothing; 

--Housing	Plastic
INSERT INTO formula.part_category_material (part_category_2_id, material_id)
select (select id from formula.part_category_2 pc where pc.category_name = 'Plastic'), m.id from formula.material m where m.material_name = 'Other_Fill_ME_Remark' on conflict do nothing; 

--Housing	RHCM_Process
INSERT INTO formula.part_category_material (part_category_2_id, material_id)
select (select id from formula.part_category_2 pc where pc.category_name = 'RHCM_Process'), m.id from formula.material m where m.material_name = 'Other_Fill_ME_Remark' on conflict do nothing; 

--ME_others	Rubber
INSERT INTO formula.rubber_material_spec (id, spec_name, part_category_2_id, density) VALUES('f53db348-1fd4-11ea-8fc8-0242ac110002', 'Other_Fill_ME_Remark', (select id from formula.part_category_2 pc where pc.category_name = 'Rubber'), 0) on conflict do nothing;

INSERT INTO formula.rubber_material (spec_id, material_name) 
select rms.id, 'Other_Fill_ME_Remark' from formula.rubber_material_spec rms on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) 
select m.id, sd.id, '0', 'number', 'rubber_material', now() from formula.schedule_date sd, formula.rubber_material m
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'material') and m.material_name = 'Other_Fill_ME_Remark'
on conflict do nothing;

--ME_others	Nut
--ME_others	Screw
--ME_others	Standoff

INSERT INTO formula.turning_material (id, part_category_2_id, material_name, density) VALUES('83a48a80-1fda-11ea-8fc8-0242ac110002', (select id from formula.part_category_2 pc where pc.category_name = 'Screw'), 'Other_Fill_ME_Remark', 0) on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) 
select m.id, sd.id, '0', 'number', 'turning_material', now() from formula.schedule_date sd, formula.turning_material m
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'material') and m.material_name = 'Other_Fill_ME_Remark'
on conflict do nothing;

update formula.parameter_value set value = 0.35 where parameter_id = (select id from formula.magnet_cut_loss_rate mclr where mclr.cut_size_begin = 100);

CREATE OR REPLACE VIEW formula.v_me_bom_materialspec_and_material_value
AS 
SELECT a.part_cate1_id,
    a.part_cate1_name,
    a.part_cate1_disable_time,
    a.part_cate2_id,
    a.part_cate2_name,
    a.part_cate2_disable_time,
    a.material_spec_id,
    a.material_spec_name,
    a.material_spec_disable_time,
    a.material_id,
    a.material_name,
    a.material_disable_time
   FROM ( SELECT b.part_cate1_id,
            b.part_cate1_name,
            b.part_cate1_disable_time,
            b.part_cate2_id,
            b.part_cate2_name,
            b.part_cate2_disable_time,
            c.material_spec_id,
            c.material_spec_name,
            c.material_spec_disable_time,
            c.material_id,
            c.material_name,
            c.material_disable_time
           FROM ( SELECT part_category_material.part_category_2_id,
                    part_category_material.material_id,
                    part_category_material.create_time,
                    part_category_material.disable_time
                   FROM formula.part_category_material) a_1
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    a_2.disable_time AS part_cate1_disable_time,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name,
                    b_1.disable_time AS part_cate2_disable_time
                   FROM ( SELECT part_category_1.id,
                            part_category_1.category_name,
                            part_category_1.create_time,
                            part_category_1.disable_time
                           FROM formula.part_category_1) a_2
                     JOIN ( SELECT part_category_2.id,
                            part_category_2.part_category_1_id,
                            part_category_2.category_name,
                            part_category_2.create_time,
                            part_category_2.disable_time
                           FROM formula.part_category_2) b_1 ON a_2.id = b_1.part_category_1_id) b ON a_1.part_category_2_id = b.part_cate2_id
             JOIN ( SELECT a_2.id AS material_spec_id,
                    a_2.material_spec_name,
                    a_2.disable_time AS material_spec_disable_time,
                    b_1.id AS material_id,
                    b_1.material_name,
                    b_1.disable_time AS material_disable_time
                   FROM ( SELECT material_spec.id,
                            material_spec.material_spec_name,
                            material_spec.remark,
                            material_spec.create_time,
                            material_spec.disable_time
                           FROM formula.material_spec
                          WHERE material_spec.disable_time IS NULL) a_2
                     JOIN ( SELECT material.id,
                            material.material_name,
                            material.material_spec_id,
                            material.remark,
                            material.create_time,
                            material.disable_time
                           FROM formula.material) b_1 ON a_2.id = b_1.material_spec_id) c ON a_1.material_id = c.material_id
        UNION ALL
         SELECT c.part_cate1_id,
            c.part_cate1_name,
            c.part_cate1_disable_time,
            c.part_cate2_id,
            c.part_cate2_name,
            c.part_cate2_disable_time,
            a_1.id AS material_spec_id,
            a_1.material_spec_name,
            a_1.disable_time AS material_spec_disable_time,
            b.id AS material_id,
            b.material_name,
            b.disable_time AS material_disable_time
           FROM formula.diecut_material_spec a_1
             LEFT JOIN ( SELECT diecut_material.id,
                    diecut_material.material_name,
                    diecut_material.diecut_material_spec_id,
                    diecut_material.remark,
                    diecut_material.create_time,
                    diecut_material.disable_time
                   FROM formula.diecut_material) b ON a_1.id = b.diecut_material_spec_id
             JOIN formula.part_category_diecut_material_spec pcdms ON pcdms.material_spec_id = a_1.id
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name,
                    a_2.disable_time AS part_cate1_disable_time,
                    b_1.disable_time AS part_cate2_disable_time
                   FROM ( SELECT part_category_1.id,
                            part_category_1.category_name,
                            part_category_1.create_time,
                            part_category_1.disable_time
                           FROM formula.part_category_1) a_2
                     JOIN ( SELECT part_category_2.id,
                            part_category_2.part_category_1_id,
                            part_category_2.category_name,
                            part_category_2.create_time,
                            part_category_2.disable_time
                           FROM formula.part_category_2) b_1 ON a_2.id = b_1.part_category_1_id) c ON pcdms.part_category_2_id = c.part_cate2_id
        UNION ALL
         SELECT b.part_cate1_id,
            b.part_cate1_name,
            b.part_cate1_disable_time,
            b.part_cate2_id,
            b.part_cate2_name,
            b.part_cate2_disable_time,
            c.id AS material_spec_id,
            c.name AS material_spec_name,
            c.disable_time AS material_spec_disable_time,
            NULL::uuid AS material_id,
            NULL::character varying(200) AS material_name,
            NULL::timestamp with time zone AS material_disable_time
           FROM ( SELECT part_category_material_metal.pategory_category_2_id,
                    part_category_material_metal.material_metal_id,
                    part_category_material_metal.create_time,
                    part_category_material_metal.disable_time
                   FROM formula.part_category_material_metal) a_1
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name,
                    a_2.disable_time AS part_cate1_disable_time,
                    b_1.disable_time AS part_cate2_disable_time
                   FROM ( SELECT part_category_1.id,
                            part_category_1.category_name,
                            part_category_1.create_time,
                            part_category_1.disable_time
                           FROM formula.part_category_1) a_2
                     JOIN ( SELECT part_category_2.id,
                            part_category_2.part_category_1_id,
                            part_category_2.category_name,
                            part_category_2.create_time,
                            part_category_2.disable_time
                           FROM formula.part_category_2) b_1 ON a_2.id = b_1.part_category_1_id) b ON a_1.pategory_category_2_id = b.part_cate2_id
             JOIN formula.material_metal c ON a_1.material_metal_id = c.id
        UNION ALL
         SELECT b.part_cate1_id,
            b.part_cate1_name,
            b.part_cate1_disable_time,
            b.part_cate2_id,
            b.part_cate2_name,
            b.part_cate2_disable_time,
            a_1.id AS material_spec_id,
            a_1.material_name AS material_spec_name,
            a_1.disable_time AS material_spec_disable_time,
            NULL::uuid AS material_id,
            NULL::character varying(200) AS material_name,
            NULL::timestamp with time zone AS material_disable_time
           FROM ( SELECT magnet_material.id,
                    magnet_material.material_name,
                    magnet_material.remark,
                    magnet_material.create_time,
                    magnet_material.disable_time,
                    magnet_material.part_category_2_id
                   FROM formula.magnet_material) a_1
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name,
                    a_2.disable_time AS part_cate1_disable_time,
                    b_1.disable_time AS part_cate2_disable_time
                   FROM ( SELECT part_category_1.id,
                            part_category_1.category_name,
                            part_category_1.create_time,
                            part_category_1.disable_time
                           FROM formula.part_category_1) a_2
                     JOIN ( SELECT part_category_2.id,
                            part_category_2.part_category_1_id,
                            part_category_2.category_name,
                            part_category_2.create_time,
                            part_category_2.disable_time
                           FROM formula.part_category_2) b_1 ON a_2.id = b_1.part_category_1_id) b ON a_1.part_category_2_id = b.part_cate2_id
        UNION ALL
         SELECT c.part_cate1_id,
            c.part_cate1_name,
            c.part_cate1_disable_time,
            c.part_cate2_id,
            c.part_cate2_name,
            c.part_cate2_disable_time,
            a_1.id AS material_spec_id,
            a_1.spec_name AS material_sepc_name,
            a_1.disable_time AS material_spec_disable_time,
            b.id AS material_id,
            b.material_name,
            b.disable_time AS material_disable_time
           FROM ( SELECT rubber_material_spec.id,
                    rubber_material_spec.spec_name,
                    rubber_material_spec.part_category_2_id,
                    rubber_material_spec.remark,
                    rubber_material_spec.create_time,
                    rubber_material_spec.disable_time
                   FROM formula.rubber_material_spec) a_1
             LEFT JOIN ( SELECT rubber_material.id,
                    rubber_material.spec_id,
                    rubber_material.material_name,
                    rubber_material.remark,
                    rubber_material.create_time,
                    rubber_material.disable_time
                   FROM formula.rubber_material) b ON a_1.id = b.spec_id
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name,
                    a_2.disable_time AS part_cate1_disable_time,
                    b_1.disable_time AS part_cate2_disable_time
                   FROM ( SELECT part_category_1.id,
                            part_category_1.category_name,
                            part_category_1.create_time,
                            part_category_1.disable_time
                           FROM formula.part_category_1) a_2
                     JOIN ( SELECT part_category_2.id,
                            part_category_2.part_category_1_id,
                            part_category_2.category_name,
                            part_category_2.create_time,
                            part_category_2.disable_time
                           FROM formula.part_category_2) b_1 ON a_2.id = b_1.part_category_1_id) c ON a_1.part_category_2_id = c.part_cate2_id
        UNION ALL
         SELECT b.part_cate1_id,
            b.part_cate1_name,
            b.part_cate1_disable_time,
            b.part_cate2_id,
            b.part_cate2_name,
            b.part_cate2_disable_time,
            a_1.id AS material_spec_id,
            a_1.material_name AS material_sepc_name,
            a_1.disable_time AS material_spec_disable_time,
            NULL::uuid AS material_id,
            NULL::character varying(200) AS material_name,
            NULL::timestamp with time zone AS material_disable_time
           FROM ( SELECT turning_material.id,
                    turning_material.part_category_2_id,
                    turning_material.material_name,
                    turning_material.density,
                    turning_material.remark,
                    turning_material.create_time,
                    turning_material.disable_time
                   FROM formula.turning_material) a_1,
            ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name,
                    a_2.disable_time AS part_cate1_disable_time,
                    b_1.disable_time AS part_cate2_disable_time
                   FROM ( SELECT part_category_1.id,
                            part_category_1.category_name,
                            part_category_1.create_time,
                            part_category_1.disable_time
                           FROM formula.part_category_1) a_2
                     JOIN ( SELECT part_category_2.id,
                            part_category_2.part_category_1_id,
                            part_category_2.category_name,
                            part_category_2.create_time,
                            part_category_2.disable_time
                           FROM formula.part_category_2) b_1 ON a_2.id = b_1.part_category_1_id AND (b_1.category_name::text = ANY (ARRAY['Nut'::character varying::text, 'Standoff'::character varying::text]))) b
        UNION ALL
         SELECT b.part_cate1_id,
            b.part_cate1_name,
            b.part_cate1_disable_time,
            b.part_cate2_id,
            b.part_cate2_name,
            b.part_cate2_disable_time,
            a_1.id AS material_spec_id,
            a_1.material_name AS material_sepc_name,
            a_1.disable_time AS material_spec_disable_time,
            NULL::uuid AS material_id,
            NULL::character varying(200) AS material_name,
            NULL::timestamp with time zone AS material_disable_time
           FROM ( SELECT turning_material.id,
                    turning_material.part_category_2_id,
                    turning_material.material_name,
                    turning_material.density,
                    turning_material.remark,
                    turning_material.create_time,
                    turning_material.disable_time
                   FROM formula.turning_material
                  WHERE turning_material.material_name::text <> '快削鋼'::text) a_1,
            ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name,
                    a_2.disable_time AS part_cate1_disable_time,
                    b_1.disable_time AS part_cate2_disable_time
                   FROM ( SELECT part_category_1.id,
                            part_category_1.category_name,
                            part_category_1.create_time,
                            part_category_1.disable_time
                           FROM formula.part_category_1) a_2
                     JOIN ( SELECT part_category_2.id,
                            part_category_2.part_category_1_id,
                            part_category_2.category_name,
                            part_category_2.create_time,
                            part_category_2.disable_time
                           FROM formula.part_category_2) b_1 ON a_2.id = b_1.part_category_1_id AND b_1.category_name::text = 'Screw'::text) b) a;

INSERT INTO formula.part_category_formula_type (part_category_2_id, formula_type_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'Absorber'), (select id from formula.formula_type ft where ft."name" = 'die_cut')) on conflict do nothing;
INSERT INTO formula.part_category_formula_type (part_category_2_id, formula_type_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'Cu_Foil'), (select id from formula.formula_type ft where ft."name" = 'die_cut')) on conflict do nothing;
INSERT INTO formula.part_category_formula_type (part_category_2_id, formula_type_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'Mylar_of_Mylar_Sponge_Poron'), (select id from formula.formula_type ft where ft."name" = 'die_cut')) on conflict do nothing;
INSERT INTO formula.part_category_formula_type (part_category_2_id, formula_type_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'Sponge_of_Mylar_Sponge_Poron'), (select id from formula.formula_type ft where ft."name" = 'die_cut')) on conflict do nothing;
INSERT INTO formula.part_category_formula_type (part_category_2_id, formula_type_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'Adhesive_of_Mylar_Sponge_Poron'), (select id from formula.formula_type ft where ft."name" = 'die_cut')) on conflict do nothing;
INSERT INTO formula.part_category_formula_type (part_category_2_id, formula_type_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'Protection_Film_of_Mylar_Sponge_Poron'), (select id from formula.formula_type ft where ft."name" = 'die_cut')) on conflict do nothing;
INSERT INTO formula.part_category_formula_type (part_category_2_id, formula_type_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'Acetate_Tape_of_Mylar_Sponge_Poron'), (select id from formula.formula_type ft where ft."name" = 'die_cut')) on conflict do nothing;
INSERT INTO formula.part_category_formula_type (part_category_2_id, formula_type_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'Non_Woven_of_Mylar_Sponge_Poron'), (select id from formula.formula_type ft where ft."name" = 'die_cut')) on conflict do nothing;
INSERT INTO formula.part_category_formula_type (part_category_2_id, formula_type_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'Gasket'), (select id from formula.formula_type ft where ft."name" = 'die_cut')) on conflict do nothing;
INSERT INTO formula.part_category_formula_type (part_category_2_id, formula_type_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'Al_Cu_Foil'), (select id from formula.formula_type ft where ft."name" = 'die_cut')) on conflict do nothing;
INSERT INTO formula.part_category_formula_type (part_category_2_id, formula_type_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'Conductive_Tape'), (select id from formula.formula_type ft where ft."name" = 'die_cut')) on conflict do nothing;
INSERT INTO formula.part_category_formula_type (part_category_2_id, formula_type_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'Lens'), (select id from formula.formula_type ft where ft."name" = 'die_cut')) on conflict do nothing;                           
                          
CREATE OR REPLACE VIEW formula.v_me_material_info AS 
SELECT a.part_category_1_id,
    a.part_category1_name,
    a.part_category1_disable_time,
    a.part_category_2_id,
    a.part_category2_name,
    a.part_category2_disable_time,
    a.material_spec_id,
    a.material_spec_name,
    a.material_spec_disable_time,
    a.material_id,
    a.material_name,
    a.material_disable_time
   FROM ( SELECT vmbmamv.part_cate1_id AS part_category_1_id,
            vmbmamv.part_cate1_name AS part_category1_name,
            vmbmamv.part_cate1_disable_time AS part_category1_disable_time,
            vmbmamv.part_cate2_id AS part_category_2_id,
            vmbmamv.part_cate2_name AS part_category2_name,
            vmbmamv.part_cate2_disable_time AS part_category2_disable_time,
            vmbmamv.material_spec_id,
            vmbmamv.material_spec_name,
            vmbmamv.material_spec_disable_time,
            vmbmamv.material_id,
            vmbmamv.material_name,
            vmbmamv.material_disable_time
           FROM formula.v_me_bom_materialspec_and_material_value vmbmamv
          WHERE vmbmamv.material_id IS NOT null
      UNION ALL
         SELECT vmbmamv.part_cate1_id AS part_category_1_id,
            vmbmamv.part_cate1_name AS part_category1_name,
            vmbmamv.part_cate1_disable_time AS part_category1_disable_time,
            vmbmamv.part_cate2_id AS part_category_2_id,
            vmbmamv.part_cate2_name AS part_category2_name,
            vmbmamv.part_cate2_disable_time AS part_category2_disable_time,
            vmbmamv.material_spec_id,
            vmbmamv.material_spec_name,
            vmbmamv.material_spec_disable_time,
            vmbmamv.material_id,
            vmbmamv.material_name,
            vmbmamv.material_disable_time
           FROM formula.v_me_bom_materialspec_and_material_value vmbmamv
          WHERE vmbmamv.material_id is null and vmbmamv.material_spec_name = 'Other_Fill_ME_Remark' and vmbmamv.part_cate2_id in (select pcft.part_category_2_id from formula.part_category_formula_type pcft where pcft.formula_type_id = (select id from formula.formula_type ft where ft.name = 'die_cut'))
        UNION all
          SELECT vmbmamv.part_cate1_id AS part_category_1_id,
            vmbmamv.part_cate1_name AS part_category1_name,
            vmbmamv.part_cate1_disable_time AS part_category1_disable_time,
            vmbmamv.part_cate2_id AS part_category_2_id,
            vmbmamv.part_cate2_name AS part_category2_name,
            vmbmamv.part_cate2_disable_time AS part_category2_disable_time,
            NULL::uuid AS material_spec_id,
            NULL::character varying(200) AS material_spec_name,
            NULL::timestamp with time zone AS material_spec_disable_time,
            vmbmamv.material_spec_id AS material_id,
            vmbmamv.material_spec_name AS material_name,
            vmbmamv.material_spec_disable_time AS material_disable_time
           FROM formula.v_me_bom_materialspec_and_material_value vmbmamv
          WHERE vmbmamv.material_id is null and vmbmamv.material_spec_name = 'Other_Fill_ME_Remark' and vmbmamv.part_cate2_id not in (select pcft.part_category_2_id from formula.part_category_formula_type pcft where pcft.formula_type_id = (select id from formula.formula_type ft where ft.name = 'die_cut'))
        UNION ALL
         SELECT vmbmamv.part_cate1_id AS part_category_1_id,
            vmbmamv.part_cate1_name AS part_category1_name,
            vmbmamv.part_cate1_disable_time AS part_category1_disable_time,
            vmbmamv.part_cate2_id AS part_category_2_id,
            vmbmamv.part_cate2_name AS part_category2_name,
            vmbmamv.part_cate2_disable_time AS part_category2_disable_time,
            NULL::uuid AS material_spec_id,
            NULL::character varying(200) AS material_spec_name,
            NULL::timestamp with time zone AS material_spec_disable_time,
            vmbmamv.material_spec_id AS material_id,
            vmbmamv.material_spec_name AS material_name,
            vmbmamv.material_spec_disable_time AS material_disable_time
           FROM formula.v_me_bom_materialspec_and_material_value vmbmamv
          WHERE vmbmamv.material_id IS null and vmbmamv.material_spec_name != 'Other_Fill_ME_Remark') a
  ORDER BY a.part_category1_name, a.part_category2_name;
