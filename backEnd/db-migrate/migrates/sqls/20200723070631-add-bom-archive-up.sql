/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS wiprocurement.bom_projects_archive (
  id              uuid NOT NULL DEFAULT uuid_generate_v1(),
  project_code    varchar(4000),
  site            varchar(6),
  stage_id        varchar(5),
  update_time     timestamptz default now()
);

CREATE INDEX bom_projects_archive_idx ON wiprocurement.bom_projects_archive(project_code, site, stage_id);

ALTER TABLE wiprocurement.bom_user_favorite RENAME COLUMN update_time TO create_time;
