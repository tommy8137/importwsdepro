ALTER TABLE wiprocurement.me_spec_title DROP CONSTRAINT me_spec_title_pkey CASCADE;

ALTER TABLE wiprocurement.me_spec_title ADD CONSTRAINT me_spec_title_pkey PRIMARY KEY (product_type, type1name, type2name)