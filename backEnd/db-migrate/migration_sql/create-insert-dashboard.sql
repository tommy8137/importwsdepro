CREATE TABLE IF NOT EXISTS wiprocurement.dashboard_version(
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	ee_sku character varying(100),
	ee_version_id uuid,
	ee_version_name character varying(100),
	ee_version numeric,
	me_version_name character varying(100),
	me_version_id uuid,
	me_version character varying(10),
	create_time timestamp with time zone default now(),
	CONSTRAINT dashboard_version_pkey PRIMARY KEY (ee_version_id, me_version_name, me_version_id)
);