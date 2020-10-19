truncate table  wiprocurement.bom_projects;
ALTER SEQUENCE wiprocurement.bom_manager_data_id_seq RESTART WITH 1;

ALTER TABLE wiprocurement.bom_projects 
     ADD COLUMN system_model_pn character varying(15),
	 ADD COLUMN id_cmf_file_data character varying(100),
     ADD COLUMN update_time timestamp(6) with time zone,
     ADD COLUMN create_by character varying(20),
     ADD COLUMN sku_desc character varying(30),
	 ADD COLUMN product_spec character varying(20);
ALTER TABLE wiprocurement.bom_projects ALTER COLUMN product TYPE character varying(20);
ALTER TABLE wiprocurement.bom_projects RENAME COLUMN product TO product_type;
ALTER TABLE wiprocurement.bom_projects RENAME COLUMN version TO current_version;
ALTER TABLE wiprocurement.bom_projects RENAME COLUMN status TO stage;
ALTER TABLE wiprocurement.bom_projects ALTER COLUMN create_time TYPE timestamp(6) with time zone;
ALTER TABLE wiprocurement.bom_projects ALTER COLUMN approve_time TYPE timestamp(6) with time zone;
ALTER TABLE wiprocurement.bom_projects	DROP COLUMN profit_center;
ALTER TABLE wiprocurement.bom_projects  DROP COLUMN role;
ALTER TABLE wiprocurement.bom_projects	DROP COLUMN stage;
ALTER TABLE wiprocurement.bom_projects	DROP COLUMN current_version;
ALTER TABLE wiprocurement.bom_projects	DROP COLUMN bg;


DROP TABLE wiprocurement.bom_assign_data;

-- Table: wiprocurement.bom_designee
-- DROP TABLE wiprocurement.bom_designee;

CREATE TABLE wiprocurement.bom_designee
(
    bom_project_id integer NOT NULL,
    id uuid NOT NULL DEFAULT uuid_generate_v1(),
    seq integer,
    user_id character varying(10) COLLATE pg_catalog."default",
    function_team_name character varying(20) COLLATE pg_catalog."default",
    update_time timestamp(6) with time zone,
    isfunctionteam boolean,
    CONSTRAINT bom_designee_pkey PRIMARY KEY (id),
    CONSTRAINT bom_designee_bom_project_id_fkey FOREIGN KEY (bom_project_id)
        REFERENCES wiprocurement.bom_projects (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_designee
    OWNER to "swpc-user";

-- Table: wiprocurement.bom_stage_version
--DROP TABLE wiprocurement.bom_stage_version;

CREATE TABLE wiprocurement.bom_stage_version
(
    bom_id integer REFERENCES wiprocurement.bom_projects(id) ON DELETE CASCADE,
    stage_id character varying(5) COLLATE pg_catalog."default" NOT NULL,
    id uuid NOT NULL,
    version_name character varying(5) COLLATE pg_catalog."default" NOT NULL,
    create_time timestamp with time zone NOT NULL,
    CONSTRAINT bom_stage_version_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_stage_version
    OWNER to "swpc-user";

-- Table: wiprocurement.bom_stage
--DROP TABLE wiprocurement.bom_stage;

CREATE TABLE wiprocurement.bom_stage
(
    id integer NOT NULL,
    stage_name character varying(5) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT bom_stage_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_stage
    OWNER to "swpc-user";

INSERT INTO wiprocurement.bom_stage(id, stage_name) VALUES (1, 'RFI');
INSERT INTO wiprocurement.bom_stage(id, stage_name) VALUES (2, 'RFQ');
INSERT INTO wiprocurement.bom_stage(id, stage_name) VALUES (3, 'TSR');
INSERT INTO wiprocurement.bom_stage(id, stage_name) VALUES (4, 'ENG1');
INSERT INTO wiprocurement.bom_stage(id, stage_name) VALUES (5, 'ENG2');
INSERT INTO wiprocurement.bom_stage(id, stage_name) VALUES (6, 'PD');
INSERT INTO wiprocurement.bom_stage(id, stage_name) VALUES (7, 'MP');

-- Table: wiprocurement.bom_create_basedata

-- DROP TABLE wiprocurement.bom_create_basedata;

CREATE TABLE wiprocurement.bom_create_basedata
(
    id uuid DEFAULT uuid_generate_v4(),
    type character varying(15) COLLATE pg_catalog."default",
    key character varying(50) COLLATE pg_catalog."default",
    value character varying(50) COLLATE pg_catalog."default"
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_create_basedata
    OWNER to "swpc-user";

INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('SITE', 'WZS', 'WZS');
INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('SITE', 'WKS', 'WKS');
INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('SITE', 'WCD', 'WCD');
INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('SITE', 'WCQ', 'WCQ');
INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('SITE', 'WIH', 'WIH');
INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('FUNCTIONTEAM', 'Tooling', 'Tooling');
INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('FUNCTIONTEAM', 'Thermal', 'Thermal');





