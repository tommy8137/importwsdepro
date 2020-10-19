ALTER TABLE wiprocurement.ekko
	 DROP COLUMN IF EXISTS update_time,
	 DROP COLUMN IF EXISTS update_by;
ALTER TABLE wiprocurement.ekpo
	 DROP COLUMN IF EXISTS update_time,
	 DROP COLUMN IF EXISTS update_by;

-- add column for exchange_rate
ALTER TABLE wiprocurement.exchange_rate 
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);

-- add column for img
ALTER TABLE wiprocurement.t001w
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.t024
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.t024w
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);

--add column for info_record
ALTER TABLE wiprocurement.eina
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.eine
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.a018_konp
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);

-- add column for material
ALTER TABLE wiprocurement.mara
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.marc
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.mdma
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.mard
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.mvke
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);

--add column for material_doc
ALTER TABLE wiprocurement.matdoc
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.matdoc_ln
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
-- add column for mrp_bw
ALTER TABLE wiprocurement.mrp_bw
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);

-- add column for po
ALTER TABLE wiprocurement.ekko
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.ekpa
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.ekpo
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.eket
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.ekes
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);

-- add column for vendor
ALTER TABLE wiprocurement.lfa1
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);