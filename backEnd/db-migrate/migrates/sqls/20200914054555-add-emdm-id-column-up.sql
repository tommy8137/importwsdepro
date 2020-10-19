alter table wiprocurement.bom_item drop column if exists emdm_id;
alter table wiprocurement.bom_item_complete_version drop column if exists emdm_id;

drop table if exists wiprocurement.bom_item_emdm_extra;
create table if not exists wiprocurement.bom_item_emdm_extra(
  id serial,
  bom_id int4 not null,
  source_item_id  varchar NOT null,
  emdm_id   varchar,
  CONSTRAINT bom_item_emdm_extra_pk PRIMARY KEY (id),
  CONSTRAINT bom_item_emdm_extra_unique UNIQUE (bom_id, source_item_id),
  CONSTRAINT bom_item_emdm_extra_fk FOREIGN KEY (bom_id) REFERENCES wiprocurement.bom_projects(id)
);