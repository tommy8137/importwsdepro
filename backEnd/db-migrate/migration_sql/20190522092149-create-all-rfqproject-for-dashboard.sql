-- Table: wiprocurement.all_rfqproject_for_dashboard

-- DROP TABLE wiprocurement.all_rfqproject_for_dashboard;

CREATE TABLE wiprocurement.all_rfqproject_for_dashboard
(
    project_code character varying(4000) COLLATE pg_catalog."default" NOT NULL,
    acrproject_name character varying(4000) COLLATE pg_catalog."default",
    superseded character varying(1) COLLATE pg_catalog."default",
    profit_center character varying(24) COLLATE pg_catalog."default",
    profit_center_disp character varying(4000) COLLATE pg_catalog."default",
    project_leader character varying(50) COLLATE pg_catalog."default",
    project_creator character varying(600) COLLATE pg_catalog."default",
    project_creation_date timestamp without time zone,
    project_modifier character varying(600) COLLATE pg_catalog."default",
    project_last_update timestamp without time zone,
    revision character varying(180) COLLATE pg_catalog."default",
    project_plan_creator character varying(600) COLLATE pg_catalog."default",
    project_plan_creation_date timestamp without time zone,
    project_plan_modifier character varying(600) COLLATE pg_catalog."default",
    project_plan_last_update timestamp without time zone,
    zrfqreceivedate timestamp without time zone,
    zrfqduedate timestamp without time zone,
    project_status character varying(4000) COLLATE pg_catalog."default",
    zcustomertype character varying(4000) COLLATE pg_catalog."default",
    zrfqtype character varying(4000) COLLATE pg_catalog."default",
    budgetpm character varying(4000) COLLATE pg_catalog."default",
    cusnickname character varying(4000) COLLATE pg_catalog."default",
    realname character varying(4000) COLLATE pg_catalog."default",
    plantcode character varying(4000) COLLATE pg_catalog."default",
    update_time timestamp without time zone NOT NULL DEFAULT now(),
    update_by character varying(600) COLLATE pg_catalog."default",
    CONSTRAINT all_rfqproject_for_dashboard_pk PRIMARY KEY (project_code)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.all_rfqproject_for_dashboard
    OWNER to "swpc-user";
