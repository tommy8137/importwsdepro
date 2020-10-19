CREATE TABLE if not exists wiprocurement.eebom_connector_common_pool_version (
  id uuid NOT NULL,
  filename VARCHAR (200),
  update_by VARCHAR (50),
  "version" numeric,
  update_time timestamptz NOT NULL DEFAULT now()
);
