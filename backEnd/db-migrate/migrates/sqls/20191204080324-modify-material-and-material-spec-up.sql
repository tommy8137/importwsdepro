delete from formula.part_category_material_metal pcmm;
insert into formula.part_category_material_metal(pategory_category_2_id, material_metal_id)
select pc.id, mm.id from formula.material_metal mm, formula.part_category_2 pc
where pc.category_name = 'Shielding_Can' and mm.name not like 'AL%' on conflict ON constraint part_category_material_metal_pk do update set disable_time = null;

insert into formula.part_category_material_metal(pategory_category_2_id, material_metal_id)
select pc.id, mm.id from formula.material_metal mm, formula.part_category_2 pc
where pc.category_name = 'Metal' and mm.name not like 'AL%' on conflict ON constraint part_category_material_metal_pk do update set disable_time = null;

insert into formula.part_category_material_metal(pategory_category_2_id, material_metal_id)
select pc.id, mm.id from formula.material_metal mm, formula.part_category_2 pc
where pc.category_name = 'Aluminum' and mm.name like 'AL%' on conflict ON constraint part_category_material_metal_pk do update set disable_time = null;

insert into formula.part_category_material(part_category_2_id, material_id)
select pc.id, m.id from formula.material_spec ms, formula.material m, formula.part_category_2 pc
where m.material_spec_id = ms.id and ms.material_spec_name in ('TPU', 'TPEE', 'PC') and pc.category_name = 'Double_Injection'
on conflict ON constraint part_category_material_pk do update set disable_time = null;

insert into formula.part_category_material(part_category_2_id, material_id)
select pc.id, m.id from formula.material m, formula.part_category_2 pc
where pc.category_name = 'RHCM_Process'
on conflict ON constraint part_category_material_pk do update set disable_time = null;

insert into formula.part_category_material(part_category_2_id, material_id)
select pc.id, m.id from formula.material m, formula.part_category_2 pc
where pc.category_name = 'IMR'
on conflict ON constraint part_category_material_pk do update set disable_time = null;

insert into formula.part_category_material(part_category_2_id, material_id)
select pc.id, m.id from formula.material m, formula.part_category_2 pc
where pc.category_name = 'Painting'
on conflict ON constraint part_category_material_pk do update set disable_time = null;

drop view if exists formula.v_me_material_info;
drop view if exists formula.v_me_bom_materialspec_and_material_value;
CREATE OR REPLACE VIEW formula.v_me_bom_materialspec_and_material_value AS 
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
            c.id AS material_spec_id,
            c.name AS material_spec_name,
            c.disable_time AS material_spec_disable_time,
            NULL::uuid AS material_id,
            NULL::character varying (200) AS material_name,
            NULL AS material_disable_time
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
            NULL::character varying (200) AS material_name,
            NULL AS material_disable_time
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
            NULL::character varying (200) AS material_name,
            NULL AS material_disable_time
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
            NULL::character varying (200) AS material_name,
            NULL AS material_disable_time
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
                    a_2.disable_time  AS part_cate1_disable_time,
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
                           FROM formula.part_category_2) b_1 ON a_2.id = b_1.part_category_1_id AND (b_1.category_name::text = ANY (ARRAY['Nut'::character varying::text, 'Screw'::character varying::text, 'Standoff'::character varying::text]))) b) a;

CREATE OR REPLACE VIEW formula.v_me_material_info AS 
select 
	part_category_1_id,
	part_category1_name,
	part_category_2_id,
	part_category2_name,
	material_spec_id, 
    material_spec_name, 
    material_spec_disable_time, 
    material_id, 
    material_name, 
    material_disable_time
from (
select 
    vmbmamv.part_cate1_id as part_category_1_id, 
    vmbmamv.part_cate1_name as part_category1_name,
    vmbmamv.part_cate1_disable_time,
    vmbmamv.part_cate2_id as part_category_2_id, 
    vmbmamv.part_cate2_name as part_category2_name,
    vmbmamv.part_cate2_disable_time,
    vmbmamv.material_spec_id, 
    vmbmamv.material_spec_name, 
    vmbmamv.material_spec_disable_time, 
    vmbmamv.material_id, 
    vmbmamv.material_name, 
    vmbmamv.material_disable_time
	from formula.v_me_bom_materialspec_and_material_value vmbmamv where vmbmamv.material_id is not null
union all 
select 
	vmbmamv.part_cate1_id as part_category_1_id, 
    vmbmamv.part_cate1_name as part_category1_name,
    vmbmamv.part_cate1_disable_time,
    vmbmamv.part_cate2_id as part_category_2_id, 
    vmbmamv.part_cate2_name as part_category2_name,
    vmbmamv.part_cate2_disable_time,
    null as material_spec_id,
    NULL::character varying (200) as material_spec_name,
    null as material_spec_disable_time,
    vmbmamv.material_spec_id as material_id, 
    vmbmamv.material_spec_name as material_name, 
    vmbmamv.material_spec_disable_time as material_disable_time
from formula.v_me_bom_materialspec_and_material_value vmbmamv where vmbmamv.material_id is null
) a
where part_cate1_disable_time is null and part_cate2_disable_time is null 
order by a.part_category1_name, a.part_category2_name;
;