CREATE TABLE wiprocurement.pcb(
  id uuid NOT NULL DEFAULT uuid_generate_v1(),
  eebom_project_id character varying(100) references wiprocurement.eebom_projects(id),
	description character varying(400),
	cost numeric,
	is_count boolean,
	type character varying(50),
	qty numeric,
  is_leader_submitted boolean default false,
  is_leader_checked boolean default false,
  is_personal_submitted boolean default false,
  is_personal_checked boolean default false
);
