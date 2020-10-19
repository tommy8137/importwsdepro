CREATE TABLE wiprocurement.eedm_pcb_temp (
	id uuid NOT NULL,
	edm_version_id uuid NOT NULL,
	board_type numeric,
	qty numeric NOT NULL,
	part_number varchar(50) NOT NULL,
	plant varchar(50) NOT NULL,
	create_time timestamp NOT NULL DEFAULT now(),
	update_time timestamp,
	CONSTRAINT bomitem_unique UNIQUE (edm_version_id,board_type,part_number),
	CONSTRAINT eedm_pcb_temp_pkey PRIMARY KEY (id)
)
