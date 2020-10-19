/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS wiprocurement.bom_user_favorite (
  id              uuid NOT NULL DEFAULT uuid_generate_v1(),
  user_id         varchar(100) references wiprocurement.user(emplid),
  project_code    varchar(4000),
  site            varchar(6),
  stage_id        varchar(5),
  update_time     timestamptz default now()
);

CREATE INDEX bom_user_favorite_idx ON wiprocurement.bom_user_favorite(user_id);
