ALTER TABLE wiprocurement.eebom_projects DROP is_approved;
ALTER TABLE wiprocurement.eebom_projects DROP approved_by;
ALTER TABLE wiprocurement.eebom_detail DROP is_leader_submitted;

ALTER TABLE wiprocurement.eebom_projects ADD is_pcb_approved boolean default false;
ALTER TABLE wiprocurement.eebom_projects ADD is_bom_approved boolean default false;
ALTER TABLE wiprocurement.eebom_projects ADD pcb_approved_by varchar(50);
ALTER TABLE wiprocurement.eebom_projects ADD bom_approved_by varchar(50);

drop table wiprocurement.pcb;

CREATE TABLE wiprocurement.pcb(
  id uuid NOT NULL DEFAULT uuid_generate_v1(),
  edm_version_id uuid references wiprocurement.edm_version(id)  ON DELETE CASCADE,
	description character varying(400),
	cost numeric,
	is_count boolean,
	type character varying(50),
	qty numeric,
  is_leader_checked boolean default false,
  is_personal_submitted boolean default false,
  is_personal_checked boolean default false
);

