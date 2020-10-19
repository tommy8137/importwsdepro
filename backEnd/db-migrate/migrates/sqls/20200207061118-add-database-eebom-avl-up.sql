CREATE TABLE wiprocurement.eebom_avl_version (
  id uuid NOT NULL,
  filename VARCHAR (200),
  update_by VARCHAR (50),
  "version" numeric,
  update_time timestamptz NOT NULL DEFAULT now()
);


CREATE TABLE wiprocurement.eebom_avl (
  id uuid NOT NULL,
  avl_version_id uuid NOT NULL,
  customer VARCHAR (50) NOT NULL,
  type1 VARCHAR (50) NOT NULL,
  type2 VARCHAR (50),
  bu VARCHAR (100),
  avl_supply_type VARCHAR (10),
  customer_doc VARCHAR (200),
  remark varchar,
  brand JSON,
  spec JSON,
  update_time timestamptz NOT NULL DEFAULT now()
);
