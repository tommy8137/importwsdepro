CREATE SEQUENCE wiprocurement.bom_manager_data_id_seq
    INCREMENT 1
    START 70
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE wiprocurement.bom_manager_data_id_seq
    OWNER TO "swpc-user";

-- Table: wiprocurement.bom_assign_data

-- DROP TABLE wiprocurement.bom_assign_data;

CREATE TABLE wiprocurement.bom_assign_data
(
    bom_project_id integer NOT NULL,
    employee_id character varying(10) COLLATE pg_catalog."default",
    employee_name character varying COLLATE pg_catalog."default",
    function_team_name character varying COLLATE pg_catalog."default",
    create_by character varying(15) COLLATE pg_catalog."default",
    create_time character varying(30) COLLATE pg_catalog."default",
    isfunctionteam boolean,
    assign_id character varying COLLATE pg_catalog."default"
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_assign_data
    OWNER to "swpc-user";



-- Table: wiprocurement.user_token

-- DROP TABLE wiprocurement.user_token;

CREATE TABLE wiprocurement.user_token
(
    token character varying(450) COLLATE pg_catalog."default",
    expire_time character varying(20) COLLATE pg_catalog."default",
    user_id character varying(10) COLLATE pg_catalog."default"
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.user_token
    OWNER to "swpc-user";


-- Table: wiprocurement.bom_projects

-- DROP TABLE wiprocurement.bom_projects;

CREATE TABLE wiprocurement.bom_projects
(
    id integer NOT NULL DEFAULT nextval('wiprocurement.bom_manager_data_id_seq'::regclass),
    bg character varying(8) COLLATE pg_catalog."default",
    customer character varying(20) COLLATE pg_catalog."default",
    product character varying(5) COLLATE pg_catalog."default",
    status character varying(5) COLLATE pg_catalog."default",
    version character varying(5) COLLATE pg_catalog."default",
    project_leader character varying(20) COLLATE pg_catalog."default",
    approved_by character varying(20) COLLATE pg_catalog."default",
    project_code character varying(15) COLLATE pg_catalog."default",
    project_name character varying(30) COLLATE pg_catalog."default",
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    site character varying(6) COLLATE pg_catalog."default",
    profit_center character varying(10) COLLATE pg_catalog."default",
    approve_time timestamp without time zone,
    role character varying(4) COLLATE pg_catalog."default",
    CONSTRAINT bom_manager_data_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_projects
    OWNER to "swpc-user";
-- upgrade_cpg_spec_title
CREATE TABLE IF NOT EXISTS wiprocurement.ePur_Type1
(
  TYPE1ID VARCHAR(10),
  TYPE1NAME VARCHAR(20),
  LVALID VARCHAR(1),
  ACT_FLAG VARCHAR(1),
  INSDATE timestamp with time zone,
  PRIMARY KEY (TYPE1ID)
);

CREATE TABLE IF NOT EXISTS wiprocurement.ePur_Type2
(
  TYPE2ID VARCHAR(10),
  TYPE2NAME VARCHAR(20),
  LVALID VARCHAR(1),
  ACT_FLAG VARCHAR(1),
  INSDATE timestamp with time zone,
  PRIMARY KEY (TYPE2ID)
);

CREATE TABLE IF NOT EXISTS wiprocurement.ePur_Spec_Title
(
  TYPE1ID VARCHAR(10),
  TYPE2ID VARCHAR(10),
  LVALID VARCHAR(1),
  SPEC_T1 VARCHAR(60),
  SPEC_T2 VARCHAR(60),
  SPEC_T3 VARCHAR(60),
  SPEC_T4 VARCHAR(60),
  SPEC_T5 VARCHAR(60),
  SPEC_T6 VARCHAR(60),
  SPEC_T7 VARCHAR(60),
  SPEC_T8 VARCHAR(60),
  SPEC_T9 VARCHAR(60),
  SPEC_T10 VARCHAR(60),
  SPEC_T11 VARCHAR(60),
  SPEC_T12 VARCHAR(60),
  SPEC_T13 VARCHAR(60),
  SPEC_T14 VARCHAR(60),
  SPEC_T15 VARCHAR(60),
  SPEC_T16 VARCHAR(60),
  SPEC_T17 VARCHAR(60),
  SPEC_T18 VARCHAR(60),
  SPEC_T19 VARCHAR(60),
  SPEC_T20 VARCHAR(60),
  SPEC_T21 VARCHAR(60),
  SPEC_T22 VARCHAR(60),
  SPEC_T23 VARCHAR(60),
  SPEC_T24 VARCHAR(60),
  SPEC_T25 VARCHAR(60),
  SPEC_T26 VARCHAR(60),
  SPEC_T27 VARCHAR(60),
  SPEC_T28 VARCHAR(60),
  SPEC_T29 VARCHAR(60),
  SPEC_T30 VARCHAR(60),
  ACT_FLAG VARCHAR(1),
  INSDATE timestamp with time zone,
  PRIMARY KEY (TYPE1ID, TYPE2ID)
);


CREATE OR REPLACE VIEW wiprocurement.view_epur_spec_title AS
 SELECT t1.type1name,
    t2.type2name,
    item.type1id,
    item.type2id,
    item.lvalid,
    item.spec_t1,
    item.spec_t2,
    item.spec_t3,
    item.spec_t4,
    item.spec_t5,
    item.spec_t6,
    item.spec_t7,
    item.spec_t8,
    item.spec_t9,
    item.spec_t10,
    item.spec_t11,
    item.spec_t12,
    item.spec_t13,
    item.spec_t14,
    item.spec_t15,
    item.spec_t16,
    item.spec_t17,
    item.spec_t18,
    item.spec_t19,
    item.spec_t20,
    item.spec_t21,
    item.spec_t22,
    item.spec_t23,
    item.spec_t24,
    item.spec_t25,
    item.spec_t26,
    item.spec_t27,
    item.spec_t28,
    item.spec_t29,
    item.spec_t30,
    item.act_flag,
    item.insdate
   FROM wiprocurement.epur_spec_title item
     LEFT JOIN wiprocurement.epur_type1 t1 ON item.type1id::text = t1.type1id::text
     LEFT JOIN wiprocurement.epur_type2 t2 ON item.type2id::text = t2.type2id::text;


ALTER TABLE wiprocurement.user ADD is_sourcer boolean DEFAULT false;
ALTER TABLE wiprocurement.user ADD is_pm boolean DEFAULT false;
ALTER TABLE wiprocurement.user ADD is_me_tm_fm boolean DEFAULT false;
ALTER TABLE wiprocurement.user ADD is_account boolean DEFAULT false;
ALTER TABLE wiprocurement.user ADD is_contact_window boolean DEFAULT false;
ALTER TABLE wiprocurement.user ADD is_rd boolean DEFAULT false;

-- Table: wiprocurement.logs_kafka_finished

-- DROP TABLE wiprocurement.logs_kafka_finished;

CREATE TABLE wiprocurement.logs_kafka_finished
(
    topic character varying COLLATE pg_catalog."default" NOT NULL,
    partition numeric NOT NULL,
    "offset" numeric NOT NULL,
    filename character varying COLLATE pg_catalog."default" NOT NULL,
    update_time timestamp with time zone NOT NULL,
    update_by character varying COLLATE pg_catalog."default",
    CONSTRAINT logs_kafka_finished_pkey PRIMARY KEY (topic, partition, "offset")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.logs_kafka_finished
    OWNER to "swpc-user";

UPDATE wiprocurement."user" SET is_sourcer=true WHERE  is_ce=false;
UPDATE wiprocurement."user" set is_me=false where is_ee=true and is_me=true and is_sourcer=true;
