CREATE TABLE IF NOT EXISTS wiprocurement.ee_assignment
(
	id 								uuid NOT NULL DEFAULT uuid_generate_v1(),
	type1							varchar,
	type2							varchar,
	pic								varchar(20),
	pic_emplid						varchar(20),
	proxy							varchar(20),
	proxy_emplid					varchar(20),
	update_by						varchar(20),
	update_time						timestamp with time zone,
	CONSTRAINT ee_assignment_pkey PRIMARY KEY (type1,type2)
);