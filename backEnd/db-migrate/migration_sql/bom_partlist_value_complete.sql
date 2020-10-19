CREATE TABLE wiprocurement.bom_partlist_value_complete (
	id uuid NOT NULL,
	partlist_value json NULL DEFAULT '{}'::json,
	bom_item_id varchar(64) NOT NULL DEFAULT NULL::character varying,
	update_time timestamp NULL DEFAULT '2019-05-17 15:39:47.062241'::timestamp without time zone,
	create_time timestamp NULL DEFAULT '2019-05-17 15:39:47.062241'::timestamp without time zone,
	partlist_price json NULL DEFAULT '{}'::json,
	formate varchar(100) NULL,
	image_value json NULL DEFAULT '{}'::json,
	partlist_amount json NULL DEFAULT '{}'::json,
	CONSTRAINT bom_partlist_value_complete_pkey PRIMARY KEY (id),
	CONSTRAINT bom_partlist_value_complete_unique UNIQUE (bom_item_id)
);

ALTER TABLE wiprocurement.bom_item_complete_version ADD COLUMN owner_emplid  character varying(30) DEFAULT null;