/* Replace with your SQL commands */-- Table: wiprocurement.bom_item_upload_record

-- DROP TABLE wiprocurement.bom_item_upload_record;
/*
CREATE TABLE wiprocurement.bom_sourcer_cost_record
(
    bom_id character varying COLLATE pg_catalog."default" NOT NULL,
    stage_id character varying(5) COLLATE pg_catalog."default" NOT NULL,
    user_id character varying COLLATE pg_catalog."default",
    create_time timestamp with time zone,
    CONSTRAINT "bom_sourcer_cost_record_key" PRIMARY KEY (bom_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_sourcer_cost_record
    OWNER to "swpc-user";
*/
CREATE TABLE wiprocurement.bom_sourcer_cost_temp
(
    upload_tmp_id uuid NOT NULL,
    bom_id uuid NOT NULL,
    bom_item_id uuid NOT NULL,
    sourcer_shipping numeric,
    sourcer_pl numeric,
    sourcer_assembly numeric,
    sourcer_cost numeric,
    sourcer_remark character varying(400),
    user_id character varying(10) COLLATE pg_catalog."default"
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_sourcer_cost_temp
    OWNER to "swpc-user";