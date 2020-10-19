-- Table: wiprocurement.epur_itemspec
-- 移除原有Table
DROP TABLE wiprocurement.epur_itemspec;
-- 建立新的Table
CREATE TABLE wiprocurement.epur_itemspec
(
    item character varying(18) COLLATE pg_catalog."default" NOT NULL,
    spec1 character varying(100) COLLATE pg_catalog."default",
    spec2 character varying(100) COLLATE pg_catalog."default",
    spec3 character varying(100) COLLATE pg_catalog."default",
    spec4 character varying(100) COLLATE pg_catalog."default",
    spec5 character varying(100) COLLATE pg_catalog."default",
    spec6 character varying(100) COLLATE pg_catalog."default",
    spec7 character varying(100) COLLATE pg_catalog."default",
    spec8 character varying(100) COLLATE pg_catalog."default",
    spec9 character varying(100) COLLATE pg_catalog."default",
    spec10 character varying(100) COLLATE pg_catalog."default",
    spec11 character varying(100) COLLATE pg_catalog."default",
    spec12 character varying(100) COLLATE pg_catalog."default",
    spec13 character varying(100) COLLATE pg_catalog."default",
    spec14 character varying(100) COLLATE pg_catalog."default",
    spec15 character varying(100) COLLATE pg_catalog."default",
    spec16 character varying(100) COLLATE pg_catalog."default",
    spec17 character varying(100) COLLATE pg_catalog."default",
    spec18 character varying(100) COLLATE pg_catalog."default",
    spec19 character varying(100) COLLATE pg_catalog."default",
    spec20 character varying(100) COLLATE pg_catalog."default",
    act_flag character varying(1) COLLATE pg_catalog."default",
    insdate timestamp with time zone,
    spec21 character varying(100) COLLATE pg_catalog."default",
    spec22 character varying(100) COLLATE pg_catalog."default",
    spec23 character varying(100) COLLATE pg_catalog."default",
    spec24 character varying(100) COLLATE pg_catalog."default",
    spec25 character varying(100) COLLATE pg_catalog."default",
    spec26 character varying(100) COLLATE pg_catalog."default",
    spec27 character varying(100) COLLATE pg_catalog."default",
    spec28 character varying(100) COLLATE pg_catalog."default",
    spec29 character varying(100) COLLATE pg_catalog."default",
    spec30 character varying(100) COLLATE pg_catalog."default",
    update_time timestamp with time zone,
    update_by character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT epur_itemspec_pkey PRIMARY KEY (item)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.epur_itemspec
    OWNER to "swpc-user";

-- Index: index_itemspec_insdate

-- DROP INDEX wiprocurement.index_itemspec_insdate;

CREATE INDEX index_itemspec_insdate
    ON wiprocurement.epur_itemspec USING btree
    (insdate)
    TABLESPACE pg_default;

-- Index: index_itemspec_item

-- DROP INDEX wiprocurement.index_itemspec_item;

CREATE INDEX index_itemspec_item
    ON wiprocurement.epur_itemspec USING btree
    (item COLLATE pg_catalog."default")
    TABLESPACE pg_default;
