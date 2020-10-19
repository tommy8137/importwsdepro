-- add column for cpg
ALTER TABLE wiprocurement.specgroup
  ADD COLUMN role character varying(10),
	ADD COLUMN product_type character varying(100);
