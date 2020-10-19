-- Table: wiprocurement.bom_item_upload_record

-- DROP TABLE wiprocurement.bom_item_upload_record;

CREATE TABLE wiprocurement.bom_item_upload_record
(
    bom_id character varying COLLATE pg_catalog."default" NOT NULL,
    stage_id character varying COLLATE pg_catalog."default" NOT NULL,
    user_id character varying COLLATE pg_catalog."default",
    create_time timestamp with time zone,
    CONSTRAINT "bomItem_upload_record_key" PRIMARY KEY (bom_id, stage_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_item_upload_record
    OWNER to "swpc-user";


-- Table: wiprocurement.bom_item_upload_temp

-- DROP TABLE wiprocurement.bom_item_upload_temp;

CREATE TABLE wiprocurement.bom_item_upload_temp
(
    upload_tmp_id uuid NOT NULL,
    id uuid NOT NULL,
    customer_pn character varying(64) COLLATE pg_catalog."default",
    system_cost numeric,
    source_cost numeric,
    level character varying(8) COLLATE pg_catalog."default",
    parent_level character varying(64) COLLATE pg_catalog."default",
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
    parts_ctgy_1 uuid,
    parts_ctgy_2 uuid,
    material_spec uuid,
    material uuid,
    gb_assy_ctgy uuid,
    func_ctgy uuid,
    image_id uuid,
    supply_type uuid,
    part_name character varying(80) COLLATE pg_catalog."default",
    sub_leve boolean NOT NULL DEFAULT false,
    owner character varying(40) COLLATE pg_catalog."default",
    version_id uuid,
    part_size_m numeric,
    extra json,
    user_id character varying(10) COLLATE pg_catalog."default"
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_item_upload_temp
    OWNER to "swpc-user";