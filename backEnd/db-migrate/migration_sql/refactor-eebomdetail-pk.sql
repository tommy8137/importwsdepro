DROP TABLE wiprocurement.eebom_detail;

CREATE TABLE wiprocurement.eebom_detail(
	id varchar(350),
	edm_version_id uuid references wiprocurement.edm_version(id) ON DELETE CASCADE,
	type1 character varying(20),
	type2 character varying(20),
	part_number character varying(50),
	description character varying(300),
	manufacturer character varying(100),
	current_price numeric,
	spa numeric,
	lpp numeric,
	currrent_price_adj_percentage numeric,
	ce_cost numeric,
	suggestion_cost numeric,
	remark character varying(300),
	qty numeric,
	sub_total_suggestion_cost numeric,
	vendor character varying(100),
	vendor_part_no character varying(100),
	supply_type character varying(10),
	obs character varying(12),
	module character varying(100),
	is_personal_checked boolean default false,
	is_leader_checked boolean default false,
	is_personal_submitted boolean default false,
	create_time timestamp with time zone default now(),
	update_time timestamp with time zone default now(),
	other_manufacture_info json,
	CONSTRAINT eebom_detail_pkey PRIMARY KEY (id),
	CONSTRAINT detail_unique_id UNIQUE (part_number, edm_version_id)
);
ALTER TABLE wiprocurement.edm_version RENAME COLUMN is_pcb_persional_submitted TO is_pcb_personal_submitted;
