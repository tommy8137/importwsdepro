ALTER TABLE  wiprocurement.pcb_typeii_spec01 ALTER COLUMN create_time SET DEFAULT now();
ALTER TABLE wiprocurement.pcb_typeii_spec01 ADD COLUMN insert_type varchar(10);
