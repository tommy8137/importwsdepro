/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS formula.turning_nut_type (
  id uuid NOT NULL DEFAULT uuid_generate_v1(),
  name varchar(200) NOT NULL,
  remark varchar(400),
  create_time timestamptz NOT NULL DEFAULT now(),
  disable_time timestamptz NULL,
  CONSTRAINT turning_nut_type_pk PRIMARY KEY (name)
);

INSERT INTO formula.turning_nut_type(id, name, remark, create_time, disable_time)
VALUES
  (uuid_generate_v1(), 'Bracket NUT', NULL, now(), NULL),
  (uuid_generate_v1(), 'Insert NUT', NULL, now(), NULL);

-- 新增Turning material mapping table
CREATE TABLE IF NOT EXISTS formula.part_category_turning_material (
  id uuid NOT NULL DEFAULT uuid_generate_v1(),
  part_category_2_id uuid NOT NULL,
  material_id uuid NOT NULL,
  nut_type_id uuid,
  remark varchar(400),
  create_time timestamptz NOT NULL DEFAULT now(),
  disable_time timestamptz NULL,
  CONSTRAINT part_category_turning_material_pk PRIMARY KEY (part_category_2_id, material_id),
  CONSTRAINT part_category_turning_material_fk FOREIGN KEY (part_category_2_id) REFERENCES formula.part_category_2(id),
  CONSTRAINT part_category_turning_material_fk1 FOREIGN KEY (material_id) REFERENCES formula.turning_material(id)
);

--Nut--
--Insert Nut 資料到 formula.part_category_turning_material
INSERT INTO formula.part_category_turning_material
(part_category_2_id, material_id, disable_time)
SELECT
  b.part_cate2_id as part_category_2_id,
  --b.part_cate2_name,
  a_1.id AS material_id,
  --a_1.material_name AS material_sepc_name,
    CASE
        WHEN a_1.material_name::text = 'SUS410'::text OR a_1.material_name::text = '低碳鋼18A'::text THEN '2020-01-09 00:00:01+08'::timestamp with time zone
            ELSE a_1.disable_time
        END AS disable_time
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
                   FROM formula.part_category_2) b_1 ON a_2.id = b_1.part_category_1_id AND b_1.category_name::text = 'Nut'::text) b;

UPDATE formula.part_category_turning_material cc
set nut_type_id = tem.nut_type_id
  from (
  	select nt.id as nut_type_id, tm.id as material_id
  	from formula.turning_nut_type nt, formula.turning_material tm
  	where tm.material_name = '快削鋼-1215' and nt.name = 'Bracket NUT'
  	) as tem
where cc.material_id = tem.material_id;

UPDATE formula.part_category_turning_material cc
set nut_type_id = tem.nut_type_id
  from (
  	select nt.id as nut_type_id, tm.id as material_id
  	from formula.turning_nut_type nt, formula.turning_material tm
  	where (tm.material_name != '快削鋼-1215' and tm.material_name != 'Other_Fill_ME_Remark') and nt.name = 'Insert NUT'
  	) as tem
where cc.material_id = tem.material_id;

--Standoff--
--Insert Standoff 資料到 formula.part_category_turning_material
INSERT INTO formula.part_category_turning_material
(part_category_2_id, material_id, disable_time)
SELECT
  b.part_cate2_id as part_category_2_id,
  --b.part_cate2_name,
  a_1.id AS material_id,
  --a_1.material_name AS material_sepc_name,
        CASE
            WHEN a_1.material_name::text = '快削鋼-1215'::text OR a_1.material_name::text = '低碳鋼18A'::text OR a_1.material_name::text = 'SUS410'::text THEN '2020-01-09 00:00:01+08'::timestamp with time zone
            ELSE a_1.disable_time
        END AS disable_time
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
                   FROM formula.part_category_2) b_1 ON a_2.id = b_1.part_category_1_id AND b_1.category_name::text = 'Standoff'::text) b;

--Screw--
--Insert Screw 資料到 formula.part_category_turning_material
INSERT INTO formula.part_category_turning_material
(part_category_2_id, material_id, disable_time)
SELECT
  b.part_cate2_id as part_category_2_id,
  --b.part_cate2_name,
  a_1.id AS material_id,
  --a_1.material_name AS material_sepc_name,
        CASE
            WHEN a_1.material_name::text = '無鉛環保銅'::text OR a_1.material_name::text = '黃銅-C3604'::text THEN '2020-01-09 00:00:01+08'::timestamp with time zone
            ELSE a_1.disable_time
        END AS disable_time
   FROM ( SELECT turning_material.id,
            turning_material.part_category_2_id,
            turning_material.material_name,
            turning_material.density,
            turning_material.remark,
            turning_material.create_time,
            turning_material.disable_time
           FROM formula.turning_material
          WHERE turning_material.material_name::text <> '快削鋼-1215'::text) a_1,
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
                   FROM formula.part_category_2) b_1 ON a_2.id = b_1.part_category_1_id AND b_1.category_name::text = 'Screw'::text) b;

-- 更新view 拿取tunring material price

--ME_Others
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
    a.material_disable_time,
    a.is_material,
    a.link_disable_time
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
            c.material_disable_time,
            false AS is_material,
            a_1.disable_time AS link_disable_time
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
                          --WHERE material_spec.disable_time IS NULL
                          ) a_2
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
            b.disable_time AS material_disable_time,
            false AS is_material,
            pcdms.disable_time AS link_disable_time
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
            NULL::timestamp with time zone AS material_disable_time,
            true AS is_material,
            a_1.disable_time AS link_disable_time
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
            NULL::timestamp with time zone AS material_disable_time,
            true AS is_material,
            a_1.disable_time AS link_disable_time
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
            b.disable_time AS material_disable_time,
            false AS is_material,
            a_1.disable_time AS link_disable_time
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
          SELECT distinct
            b.part_cate1_id,
            b.part_cate1_name,
            b.part_cate1_disable_time,
            b.part_cate2_id,
            b.part_cate2_name,
            b.part_cate2_disable_time,
            tm.id AS material_spec_id,
            tm.material_name AS material_sepc_name,
            a_1.disable_time AS material_sepc_disable_time,
            NULL::uuid AS material_id,
            NULL::character varying(200) AS material_name,
            NULL::timestamp with time zone AS material_disable_time,
            true AS is_material,
            a_1.disable_time AS link_disable_time
          FROM formula.turning_material tm, formula.part_category_turning_material a_1,
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
                    FROM formula.part_category_2) b_1 ON a_2.id = b_1.part_category_1_id) b
          where(a_1.material_id = tm.id and b.part_cate2_id = a_1.part_category_2_id )
) a;

-- 移除 turning_material part_category_2 相關的key
ALTER TABLE formula.turning_material
  DROP CONSTRAINT IF EXISTS turning_material_fk,
  DROP CONSTRAINT IF EXISTS turning_material_un,
  DROP COLUMN IF EXISTS part_category_2_id,
  ADD CONSTRAINT turning_material_un UNIQUE (material_name);
