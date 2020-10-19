-- add column for cpg
ALTER TABLE wiprocurement.EPUR_ITEMSPEC
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.EPUR_SOURCERDEF
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.EPUR_SOURCERPROXY
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.EPUR_VGROUP
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.ePur_Type1
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.ePur_Type2
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);
ALTER TABLE wiprocurement.ePur_Spec_Title
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);

-- add column for plm
ALTER TABLE wiprocurement.All_PMPRJTBL_FOR_DASHBOARD
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);