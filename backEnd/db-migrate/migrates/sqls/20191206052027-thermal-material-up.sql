/* Replace with your SQL commands */
CREATE TABLE if not exists formula.part_category_diecut_material_spec (
	part_category_2_id uuid NOT NULL,
	material_spec_id uuid NOT NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT part_category_diecut_material_spec_pk PRIMARY KEY (part_category_2_id, material_spec_id),
	CONSTRAINT part_category_diecut_material_spec_fk FOREIGN KEY (part_category_2_id) REFERENCES formula.part_category_2(id),
	CONSTRAINT part_category_diecut_material_spec_fk1 FOREIGN KEY (material_spec_id) REFERENCES formula.diecut_material_spec(id)
);

insert into formula.part_category_diecut_material_spec(part_category_2_id, material_spec_id)
select dms.part_category_2_id, dms.id from formula.diecut_material_spec dms
on conflict do nothing;

insert into formula.part_category_diecut_material_spec(part_category_2_id, material_spec_id)
select (select pc2.id from formula.part_category_2 pc2, formula.part_category_1 pc1
where pc1.category_name = 'Thermal' and pc2.part_category_1_id = pc1.id and pc2.category_name = 'Module'), dms.id from formula.diecut_material_spec dms, formula.part_category_2 pc2, formula.part_category_1 pc1
where pc1.category_name = 'EMC' and pc2.part_category_1_id = pc1.id and pc2.category_name = 'Al_Cu_Foil' and dms.part_category_2_id = pc2.id
on conflict do nothing;

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
             join formula.part_category_diecut_material_spec pcdms on pcdms.material_spec_id = a_1.id
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
                           FROM formula.part_category_2) b_1 ON a_2.id = b_1.part_category_1_id AND (b_1.category_name::text = ANY (ARRAY['Nut'::character varying::text, 'Screw'::character varying::text, 'Standoff'::character varying::text]))) b) a;

                          
drop view if exists formula.v_me_material_info;                          
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
          WHERE vmbmamv.material_id IS NOT null or vmbmamv.material_spec_name = 'Other_Fill_ME_Remark'
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

INSERT INTO formula.site (site_name) VALUES('WIH') on conflict do nothing;

alter table formula.site add column if not exists disable_time timestamptz null;

create or replace view formula.v_site as
select s.id, s.site_name as name, s.disable_time from formula.site s;

alter table wiprocurement.bom_stage add column if not exists disable_time timestamptz null;

create or replace view formula.v_stage as
select bs.id, bs.stage_name as name, bs.disable_time from wiprocurement.bom_stage bs;


drop view if exists formula.v_part_category_formula_mapping;
CREATE OR REPLACE VIEW formula.v_part_category_formula_mapping
AS 
SELECT pc1.id AS part_category_1_id,
    pc2.id AS part_category_2_id,
    pc1.category_name AS part_category_1,
    pc2.category_name AS part_category_2,
    bpf.format_key AS part_list_format
   FROM wiprocurement.bom_partlist_config bpc
     LEFT JOIN wiprocurement.bom_partlist_format bpf ON bpc.format = bpf.id
     LEFT JOIN formula.part_category_1 pc1 ON pc1.id = bpc.parts_ctgy_1
     LEFT JOIN formula.part_category_2 pc2 ON pc2.id = bpc.parts_ctgy_2;
    
CREATE OR REPLACE VIEW formula.v_diecut_material_info AS 
SELECT pc.id AS part_category_2_id,
    pc.category_name,
    dms.id AS material_spec_id,
    dms.material_spec_name,
    dm.id AS material_id,
    dm.material_name,
    dm.disable_time
   FROM formula.diecut_material_spec dms
  left join formula.diecut_material dm on dms.id = dm.diecut_material_spec_id 
  join formula.part_category_diecut_material_spec pcdms on dms.id = pcdms.material_spec_id
  join formula.part_category_2 pc on pc.id = pcdms.part_category_2_id
  join formula.v_part_category_formula_mapping vpcfm on pcdms.part_category_2_id = vpcfm.part_category_2_id
  WHERE vpcfm.part_list_format = 'die-cut';

alter table formula.diecut_material_spec drop column if exists part_category_2_id; 

CREATE TABLE if not exists formula.thermal_category (
    id uuid NOT NULL DEFAULT uuid_generate_v1(),
    category_type varchar(200) not NULL,
	metal_material_id uuid NOT NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT thermal_category_pk PRIMARY KEY (id),
	CONSTRAINT thermal_category_un UNIQUE (category_type,metal_material_id),
	CONSTRAINT thermal_category_fk FOREIGN KEY (metal_material_id) REFERENCES formula.material_metal(id)
);

insert into formula.thermal_category(category_type, metal_material_id)
select 'thermal_plate', mm.id from formula.material_metal mm where mm."name" in ('CU1100','C1840','皮銅','SUS301')
on conflict do nothing;
insert into formula.thermal_category(category_type, metal_material_id)
select 'thermal_block', mm.id from formula.material_metal mm where mm."name" in ('CU1100','皮銅')
on conflict do nothing;
