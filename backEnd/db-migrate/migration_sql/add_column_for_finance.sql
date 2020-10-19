ALTER TABLE wiprocurement.V_BUSINESSORG_BO
     ADD COLUMN update_time timestamp with time zone,
	 ADD COLUMN update_by character varying(30);