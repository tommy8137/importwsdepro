CREATE TABLE if not exists wiprocurement.eebom_temporary_file_version (
  id uuid NOT NULL,
  filename VARCHAR (500),
  update_by VARCHAR (50),
  update_time timestamptz NOT NULL DEFAULT now(),
  UNIQUE(filename)
);
