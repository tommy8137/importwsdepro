
-- Table: wiprocurement.drop_down_item

-- DROP TABLE wiprocurement.drop_down_item;

CREATE TABLE wiprocurement.drop_down_item
(
    id uuid NOT NULL DEFAULT uuid_generate_v1(),
    item_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    path character varying COLLATE pg_catalog."default",
    field_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    layout_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT drop_down_item_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.drop_down_item
    OWNER to "swpc-user";

-- SEQUENCE: wiprocurement.bom_item_id_seq

-- DROP SEQUENCE wiprocurement.bom_item_id_seq;

CREATE SEQUENCE wiprocurement.bom_item_id_seq;

ALTER SEQUENCE wiprocurement.bom_item_id_seq
    OWNER TO "swpc-user";

-- Table: wiprocurement.bom_item

-- DROP TABLE wiprocurement.bom_item;

CREATE TABLE wiprocurement.bom_item
(
    id integer NOT NULL DEFAULT nextval('wiprocurement.bom_item_id_seq'::regclass),
    customer_pn character varying(64) COLLATE pg_catalog."default",
    system_cost numeric,
    source_cost numeric,
    level character varying(8) COLLATE pg_catalog."default" DEFAULT 'DC/65'::character varying,
    parent_level character varying(8) COLLATE pg_catalog."default",
    rfq_pn character varying(64) COLLATE pg_catalog."default",
    ref_part_num character varying(64) COLLATE pg_catalog."default",
    qty integer NOT NULL,
    part_size_l numeric,
    part_size_w numeric,
    part_size_h numeric,
    part_size_ef numeric,
    part_size_l2 numeric,
    part_size_w2 numeric,
    thickness numeric,
    part_weight numeric,
    created_time timestamp without time zone NOT NULL DEFAULT now(),
    modified_time timestamp without time zone NOT NULL DEFAULT now(),
    parts_ctgy_1 uuid,
    parts_ctgy_2 uuid,
    material_spec uuid,
    material uuid,
    gb_assy_ctgy uuid,
    func_ctgy uuid,
    image_id uuid,
    supply_type uuid,
    part_name character varying(40) COLLATE pg_catalog."default",
    sub_leve boolean NOT NULL DEFAULT false,
    owner uuid,
    version_id uuid NOT NULL,
    part_size_m numeric,
    CONSTRAINT bom_item_pkey PRIMARY KEY (id),
    CONSTRAINT req_pn_unique UNIQUE (rfq_pn),
    CONSTRAINT bom_item_func_ctgy_fkey FOREIGN KEY (func_ctgy)
        REFERENCES wiprocurement.drop_down_item (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT bom_item_gb_assy_ctgy_fkey FOREIGN KEY (gb_assy_ctgy)
        REFERENCES wiprocurement.drop_down_item (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT bom_item_image_id_fkey FOREIGN KEY (image_id)
        REFERENCES wiprocurement.image (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT bom_item_material_fkey FOREIGN KEY (material)
        REFERENCES wiprocurement.drop_down_item (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT bom_item_material_spec_fkey FOREIGN KEY (material_spec)
        REFERENCES wiprocurement.drop_down_item (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT bom_item_owner_fkey FOREIGN KEY (owner)
        REFERENCES wiprocurement.bom_designee (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT bom_item_parts_ctgy_1_fkey FOREIGN KEY (parts_ctgy_1)
        REFERENCES wiprocurement.drop_down_item (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT bom_item_parts_ctgy_2_fkey FOREIGN KEY (parts_ctgy_2)
        REFERENCES wiprocurement.drop_down_item (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT bom_item_supply_type_fkey FOREIGN KEY (supply_type)
        REFERENCES wiprocurement.drop_down_item (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT bom_item_version_id_fkey FOREIGN KEY (version_id)
        REFERENCES wiprocurement.bom_stage_version (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_item
    OWNER to "swpc-user";


-- Table: wiprocurement.col_definite

-- DROP TABLE wiprocurement.col_definite;

CREATE TABLE wiprocurement.col_definite
(
    id uuid NOT NULL DEFAULT uuid_generate_v1(),
    col_key character varying(255) COLLATE pg_catalog."default",
    col_name character varying(255) COLLATE pg_catalog."default",
    used_by character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT col_definite_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.col_definite
    OWNER to "swpc-user";

-- SEQUENCE: wiprocurement.col_dependence_id_seq

-- DROP SEQUENCE wiprocurement.col_dependence_id_seq;

CREATE SEQUENCE wiprocurement.col_dependence_id_seq;

ALTER SEQUENCE wiprocurement.col_dependence_id_seq
    OWNER TO "swpc-user";
    
-- Table: wiprocurement.col_dependence

-- DROP TABLE wiprocurement.col_dependence;

CREATE TABLE wiprocurement.col_dependence
(
    col_val character varying(255) COLLATE pg_catalog."default",
    col_id uuid,
    required_col_id uuid,
    id integer NOT NULL DEFAULT nextval('wiprocurement.col_dependence_id_seq'::regclass),
    CONSTRAINT col_dependence_pkey PRIMARY KEY (id),
    CONSTRAINT col_dependence_col_id_fkey FOREIGN KEY (col_id)
        REFERENCES wiprocurement.col_definite (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT col_dependence_required_col_id_fkey FOREIGN KEY (required_col_id)
        REFERENCES wiprocurement.col_definite (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.col_dependence
    OWNER to "swpc-user";