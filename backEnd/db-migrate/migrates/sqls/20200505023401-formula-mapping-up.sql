DROP VIEW IF EXISTS formula.v_diecut_material_info;
DROP VIEW IF EXISTS formula.v_part_category_formula_mapping;
DROP TABLE IF EXISTS wiprocurement.bom_partlist_config_product_type;
DROP SEQUENCE IF EXISTS wiprocurement.bom_partlist_config_product_type_id_seq;

-- SEQUENCE: wiprocurement.bom_partlist_config_product_type_id_seq
CREATE SEQUENCE wiprocurement.bom_partlist_config_product_type_id_seq;
ALTER SEQUENCE wiprocurement.bom_partlist_config_product_type_id_seq
    OWNER TO "swpc-user";

-- Table: wiprocurement.bom_partlist_config_product_type
CREATE TABLE wiprocurement.bom_partlist_config_product_type (
	"id" INTEGER NOT NULL DEFAULT nextval('wiprocurement.bom_partlist_config_product_type_id_seq'::regclass),
	"config_id" INTEGER NOT NULL,
	"product_type_id" INTEGER NOT NULL DEFAULT 1,
	CONSTRAINT bom_partlist_config_product_type_uq UNIQUE (id),
	CONSTRAINT bom_partlist_config_product_type_fkey FOREIGN KEY (config_id)
        REFERENCES wiprocurement.bom_partlist_config (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_partlist_config_product_type
    OWNER to "swpc-user";

-- v_part_category_formula_mapping
DROP VIEW IF EXISTS formula.v_part_category_formula_mapping;
CREATE VIEW formula.v_part_category_formula_mapping AS
  SELECT pc1.id AS part_category_1_id,
    pc2.id AS part_category_2_id,
    pc1.category_name AS part_category_1,
    pc2.category_name AS part_category_2,
    bpf.format_key AS part_list_format,
    bpcpt.product_type_id AS product_type_id
  FROM (((( wiprocurement.bom_partlist_config_product_type bpcpt
    LEFT JOIN wiprocurement.bom_partlist_config bpc ON ((bpcpt.config_id = bpc.id)))
    LEFT JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
    LEFT JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1)))
    LEFT JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2)));
ALTER TABLE formula.v_part_category_formula_mapping OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_part_category_formula_mapping TO "swpc-user";

-- v_diecut_material_info
CREATE OR REPLACE VIEW formula.v_diecut_material_info AS
  SELECT DISTINCT pc.id AS part_category_2_id,
    pc.category_name,
    dms.id AS material_spec_id,
    dms.material_spec_name,
    dm.id AS material_id,
    dm.material_name,
    dm.disable_time
  FROM ((((formula.diecut_material_spec dms
    LEFT JOIN formula.diecut_material dm ON ((dms.id = dm.diecut_material_spec_id)))
    JOIN formula.part_category_diecut_material_spec pcdms ON ((dms.id = pcdms.material_spec_id)))
    JOIN formula.part_category_2 pc ON ((pc.id = pcdms.part_category_2_id)))
    JOIN formula.v_part_category_formula_mapping vpcfm ON ((pcdms.part_category_2_id = vpcfm.part_category_2_id)))
  WHERE ((vpcfm.part_list_format)::text = 'die-cut'::text)
  ORDER BY material_id;

ALTER TABLE formula.v_diecut_material_info OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_diecut_material_info TO "swpc-user";

-- Cable, FFC, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Cable')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'FFC')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Cable, FPC, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Cable')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'FPC')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Cable, Wire_Harness, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Cable')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Wire_Harness')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Cable, DC_in_cable, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Cable')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'DC_in_cable')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Cable, Panel_Cable, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Cable')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Panel_Cable')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Housing, Plastic, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Plastic')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Housing, Plastic, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Plastic')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- Housing, Plastic, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Plastic')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- Housing, Plastic, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Plastic')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- Housing, Painting, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Painting')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Housing, IMR, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'IMR')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Housing, Double_Injection, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Double_Injection')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Housing, RHCM_Process, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'RHCM_Process')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Housing, Insert_Molding, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Insert_Molding')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Housing, Metal, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Metal')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Housing, Metal, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Metal')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- Housing, Metal, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Metal')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- Housing, Metal, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Metal')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- Housing, Aluminum鋁皮外觀件單件or組立, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Aluminum鋁皮外觀件單件or組立')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Housing, C_GPU_BKT, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'C_GPU_BKT')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Housing, HDD_SSD_BKT, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'HDD_SSD_BKT')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Thermal, Fan, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Thermal')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Fan')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Thermal, Fan, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Thermal')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Fan')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- Thermal, Module, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Thermal')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Module')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Thermal, Module, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Thermal')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Module')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- Thermal, Pad, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Thermal')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Pad')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Thermal, Pad, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Thermal')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Pad')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- Thermal, Pad, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Thermal')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Pad')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- Thermal, Pad, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Thermal')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Pad')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- Thermal, Graphite_Sheet, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Thermal')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Graphite_Sheet')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- Thermal, Graphite_Sheet, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Thermal')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Graphite_Sheet')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- Thermal, Cu_Foil, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Thermal')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Cu_Foil')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- ME_others, Standoff, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Standoff')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- ME_others, Standoff, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Standoff')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- ME_others, Standoff, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Standoff')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- ME_others, Standoff, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Standoff')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- ME_others, Screw, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Screw')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- ME_others, Screw, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Screw')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- ME_others, Screw, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Screw')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- ME_others, Screw, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Screw')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- ME_others, Nut, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Nut')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- ME_others, Nut, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Nut')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- ME_others, Nut, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Nut')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- ME_others, Nut, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Nut')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- ME_others, Rubber, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Rubber')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- ME_others, Rubber, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Rubber')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- ME_others, Rubber, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Rubber')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- ME_others, Rubber, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Rubber')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- ME_others, Mylar_of_Mylar_Sponge_Poron, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Mylar_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- ME_others, Mylar_of_Mylar_Sponge_Poron, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Mylar_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- ME_others, Mylar_of_Mylar_Sponge_Poron, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Mylar_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- ME_others, Mylar_of_Mylar_Sponge_Poron, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Mylar_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- ME_others, Sponge_of_Mylar_Sponge_Poron, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Sponge_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- ME_others, Sponge_of_Mylar_Sponge_Poron, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Sponge_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- ME_others, Sponge_of_Mylar_Sponge_Poron, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Sponge_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- ME_others, Sponge_of_Mylar_Sponge_Poron, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Sponge_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- ME_others, Adhesive_of_Mylar_Sponge_Poron, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Adhesive_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- ME_others, Adhesive_of_Mylar_Sponge_Poron, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Adhesive_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- ME_others, Adhesive_of_Mylar_Sponge_Poron, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Adhesive_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- ME_others, Adhesive_of_Mylar_Sponge_Poron, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Adhesive_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- ME_others, Protection_Film_of_Mylar_Sponge_Poron, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Protection_Film_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- ME_others, Protection_Film_of_Mylar_Sponge_Poron, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Protection_Film_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- ME_others, Protection_Film_of_Mylar_Sponge_Poron, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Protection_Film_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- ME_others, Protection_Film_of_Mylar_Sponge_Poron, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Protection_Film_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- ME_others, Acetate_Tape_of_Mylar_Sponge_Poron, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Acetate_Tape_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- ME_others, Acetate_Tape_of_Mylar_Sponge_Poron, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Acetate_Tape_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- ME_others, Acetate_Tape_of_Mylar_Sponge_Poron, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Acetate_Tape_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- ME_others, Acetate_Tape_of_Mylar_Sponge_Poron, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Acetate_Tape_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- ME_others, Non_Woven_of_Mylar_Sponge_Poron, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Non_Woven_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- ME_others, Non_Woven_of_Mylar_Sponge_Poron, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Non_Woven_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- ME_others, Non_Woven_of_Mylar_Sponge_Poron, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Non_Woven_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- ME_others, Non_Woven_of_Mylar_Sponge_Poron, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Non_Woven_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- EMC, Absorber, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Absorber')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- EMC, Absorber, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Absorber')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- EMC, Absorber, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Absorber')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- EMC, Absorber, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Absorber')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- EMC, Shielding_Can, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Shielding_Can')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- EMC, Conductive_Tape, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Conductive_Tape')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- EMC, Conductive_Tape, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Conductive_Tape')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- EMC, Conductive_Tape, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Conductive_Tape')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- EMC, Gasket, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Gasket')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- EMC, Gasket, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Gasket')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- EMC, Gasket, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Gasket')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- EMC, Gasket, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Gasket')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- EMC, Magnet, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Magnet')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- EMC, Magnet, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Magnet')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- EMC, Magnet, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Magnet')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);

-- EMC, Magnet, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Magnet')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- EMC, Al_Cu_Foil, NB
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Al_Cu_Foil')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'NB'
       )
);

-- EMC, Al_Cu_Foil, DT
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Al_Cu_Foil')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'DT'
       )
);

-- EMC, Al_Cu_Foil, AIO
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Al_Cu_Foil')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'AIO'
       )
);
-- EMC, Al_Cu_Foil, VoIP
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Al_Cu_Foil')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'VoIP'
       )
);

-- Housing, Plastic, Server
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Plastic')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'Server'
       )
);

-- Housing, Metal, Server
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Housing')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Metal')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'Server'
       )
);

-- Thermal, Pad, Server
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Thermal')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Pad')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'Server'
       )
);

-- Thermal, Graphite_Sheet, Server
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'Thermal')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Graphite_Sheet')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'Server'
       )
);

-- ME_others, Standoff, Server
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Standoff')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'Server'
       )
);

-- ME_others, Screw, Server
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Screw')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'Server'
       )
);

-- ME_others, Nut, Server
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Nut')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'Server'
       )
);

-- ME_others, Rubber, Server
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Rubber')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'Server'
       )
);

-- ME_others, Mylar_of_Mylar_Sponge_Poron, Server
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Mylar_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'Server'
       )
);

-- ME_others, Sponge_of_Mylar_Sponge_Poron, Server
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Sponge_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'Server'
       )
);

-- ME_others, Adhesive_of_Mylar_Sponge_Poron, Server
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Adhesive_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'Server'
       )
);

-- ME_others, Protection_Film_of_Mylar_Sponge_Poron, Server
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Protection_Film_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'Server'
       )
);

-- ME_others, Acetate_Tape_of_Mylar_Sponge_Poron, Server
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Acetate_Tape_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'Server'
       )
);

-- ME_others, Non_Woven_of_Mylar_Sponge_Poron, Server
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'ME_others')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Non_Woven_of_Mylar_Sponge_Poron')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'Server'
       )
);

-- EMC, Absorber, Server
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Absorber')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'Server'
       )
);

-- EMC, Gasket, Server
INSERT INTO wiprocurement.bom_partlist_config_product_type (config_id, product_type_id)
VALUES (( SELECT bpc.id
   	  FROM (((wiprocurement.bom_partlist_config bpc
          INNER JOIN wiprocurement.bom_partlist_format bpf ON ((bpc.format = bpf.id)))
          INNER JOIN formula.part_category_1 pc1 ON ((pc1.id = bpc.parts_ctgy_1 and pc1.category_name = 'EMC')))
          INNER JOIN formula.part_category_2 pc2 ON ((pc2.id = bpc.parts_ctgy_2 and pc2.category_name = 'Gasket')))
       ),
       (  SELECT pt.id
	  FROM formula.product_type pt
          WHERE pt.type_name = 'Server'
       )
);
