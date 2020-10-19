-- Table: wiprocurement.bom_partlist_value

-- DROP TABLE wiprocurement.bom_partlist_value;

CREATE TABLE wiprocurement.bom_partlist_value
(
    id uuid NOT NULL DEFAULT uuid_generate_v1(),
    partlist_value character varying COLLATE pg_catalog."default",
    bom_item_id integer,
    update_time timestamp(6) without time zone,
    create_time timestamp without time zone,
    CONSTRAINT bom_partlist_value_pkey PRIMARY KEY (id),
    CONSTRAINT bom_partlist_value_bom_item_id_fkey FOREIGN KEY (bom_item_id)
        REFERENCES wiprocurement.bom_item (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_partlist_value
    OWNER to "swpc-user";