/* Replace with your SQL commands */
DROP VIEW IF EXISTS formula.v_me_bom_materialspec_and_material_value;
CREATE OR REPLACE VIEW formula.v_me_bom_materialspec_and_material_value
AS SELECT a.part_cate1_id,
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
                    a_2.disable_time::character varying AS part_cate1_disable_time,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name,
                    b_1.disable_time::character varying AS part_cate2_disable_time
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
                    a_2.disable_time::character varying AS material_spec_disable_time,
                    b_1.id AS material_id,
                    b_1.material_name,
                    b_1.disable_time::character varying AS material_disable_time
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
            a_1.disable_time::character varying AS material_spec_disable_time,
            b.id AS material_id,
            b.material_name,
            b.disable_time::character varying AS material_disable_time
           FROM formula.diecut_material_spec a_1
             LEFT JOIN ( SELECT diecut_material.id,
                    diecut_material.material_name,
                    diecut_material.diecut_material_spec_id,
                    diecut_material.remark,
                    diecut_material.create_time,
                    diecut_material.disable_time
                   FROM formula.diecut_material) b ON a_1.id = b.diecut_material_spec_id
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name,
                    a_2.disable_time::character varying AS part_cate1_disable_time,
                    b_1.disable_time::character varying AS part_cate2_disable_time
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
            c.id AS material_spec_id,
            c.name AS material_spec_name,
            c.disable_time::character varying AS material_spec_disable_time,
            NULL::uuid AS material_id,
            NULL::character varying AS material_name,
            NULL::character varying AS material_disable_time
           FROM ( SELECT part_category_material_metal.pategory_category_2_id,
                    part_category_material_metal.material_metal_id,
                    part_category_material_metal.create_time,
                    part_category_material_metal.disable_time
                   FROM formula.part_category_material_metal) a_1
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name,
                    a_2.disable_time::character varying AS part_cate1_disable_time,
                    b_1.disable_time::character varying AS part_cate2_disable_time
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
            a_1.disable_time::character varying AS material_spec_disable_time,
            NULL::uuid AS material_id,
            NULL::character varying AS material_name,
            NULL::character varying AS material_disable_time
           FROM ( SELECT cablefpc_material.id,
                    cablefpc_material.material_name,
                    cablefpc_material.part_category_2_id,
                    cablefpc_material.remark,
                    cablefpc_material.create_time,
                    cablefpc_material.disable_time
                   FROM formula.cablefpc_material) a_1
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name,
                    a_2.disable_time::character varying AS part_cate1_disable_time,
                    b_1.disable_time::character varying AS part_cate2_disable_time
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
         SELECT b.part_cate1_id,
            b.part_cate1_name,
            b.part_cate1_disable_time,
            b.part_cate2_id,
            b.part_cate2_name,
            b.part_cate2_disable_time,
            a_1.id AS material_spec_id,
            a_1.material_name AS material_spec_name,
            a_1.disable_time::character varying AS material_spec_disable_time,
            NULL::uuid AS material_id,
            NULL::character varying AS material_name,
            NULL::character varying AS material_disable_time
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
                    a_2.disable_time::character varying AS part_cate1_disable_time,
                    b_1.disable_time::character varying AS part_cate2_disable_time
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
            a_1.disable_time::character varying AS material_spec_disable_time,
            b.id AS material_id,
            b.material_name,
            b.disable_time::character varying AS material_disable_time
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
                    a_2.disable_time::character varying AS part_cate1_disable_time,
                    b_1.disable_time::character varying AS part_cate2_disable_time
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
            a_1.disable_time::character varying AS material_spec_disable_time,
            NULL::uuid AS material_id,
            NULL::character varying AS material_name,
            NULL::character varying AS material_disable_time
           FROM ( SELECT turning_material.id,
                    turning_material.part_category_2_id,
                    turning_material.material_name,
                    turning_material.density,
                    turning_material.remark,
                    turning_material.create_time,
                    turning_material.disable_time
                   FROM formula.turning_material) a_1
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name,
                    a_2.disable_time::character varying AS part_cate1_disable_time,
                    b_1.disable_time::character varying AS part_cate2_disable_time
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
                           FROM formula.part_category_2) b_1 ON a_2.id = b_1.part_category_1_id) b ON a_1.part_category_2_id = b.part_cate2_id) a;

-- Permissions

ALTER TABLE formula.v_me_bom_materialspec_and_material_value OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_me_bom_materialspec_and_material_value TO "swpc-user";
GRANT SELECT ON TABLE formula.v_me_bom_materialspec_and_material_value TO emdm;