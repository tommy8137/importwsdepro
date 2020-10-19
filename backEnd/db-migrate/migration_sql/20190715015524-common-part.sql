CREATE table if not exists wiprocurement.eedm_common_parts (
	partnumber varchar(20) NOT NULL,
	cate varchar(20) NULL,
	common_parts varchar(30) NULL,
	description varchar(100) NULL,
	ruleBy varchar(20) NULL,
	groupmap varchar(50) NULL,
	create_time timestamptz NULL DEFAULT now(),
	create_by varchar NULL,
	update_time timestamptz NULL DEFAULT now(),
	CONSTRAINT eedm_common_parts_pkey PRIMARY KEY (partnumber)
);

ALTER TABLE wiprocurement.eebom_detail ADD COLUMN IF NOT EXISTS is_common_parts bool default false;

CREATE OR REPLACE VIEW wiprocurement.epur_item_type
AS SELECT i.item,
    t1.type1name,
    t2.type2name
   FROM epur_itemtype i
     LEFT JOIN epur_type1 t1 ON t1.type1id::text = i.type1id::text
     LEFT JOIN epur_type2 t2 ON t2.type2id::text = i.type2id::text;