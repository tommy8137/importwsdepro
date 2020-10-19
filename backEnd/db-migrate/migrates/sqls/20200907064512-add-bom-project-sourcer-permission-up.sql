create table if not exists wiprocurement.bom_project_sourcer_permission(
	id uuid not null DEFAULT uuid_generate_v1(),
	sourcer_permission json,
	CONSTRAINT bom_project_sourcer_permission_pk PRIMARY KEY (id)
);
alter table wiprocurement.bom_projects add column sourcer_permission_id uuid;