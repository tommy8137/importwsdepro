CREATE TABLE IF NOT EXISTS wiprocurement.bom_project_edit_history (
  id	uuid NOT NULL 	DEFAULT uuid_generate_v1(),
  bom_version_id uuid NOT NULL REFERENCES wiprocurement.bom_stage_version(id),
  user_id varchar references wiprocurement.user(emplid),
  action varchar,
  role    varchar,
  create_time timestamptz default now()
);


CREATE INDEX bom_project_edit_history_idx ON wiprocurement.bom_project_edit_history(bom_version_id);
