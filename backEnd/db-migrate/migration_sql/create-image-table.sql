
CREATE TABLE IF NOT EXISTS wiprocurement.image (
  id					uuid NOT NULL DEFAULT uuid_generate_v1(),
  name					varchar,
  fpath					varchar,
  created_time			timestamp with time zone,
  created_by			varchar,
  CONSTRAINT image_pkey PRIMARY KEY (id)
);