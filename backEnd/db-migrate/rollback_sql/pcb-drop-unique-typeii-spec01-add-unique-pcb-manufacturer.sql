ALTER TABLE wiprocurement.pcb_typeii_spec01 ADD CONSTRAINT pcb_typeii_spec01_typeii_spec01_key UNIQUE (typeii, spec01);
ALTER TABLE wiprocurement.pcb_manufacturer_usd DROP CONSTRAINT pcb_typeii_spec01_uuid_manufacturer_usd;
ALTER TABLE wiprocurement.pcb_manufacturer_adder DROP CONSTRAINT pcb_typeii_spec01_uuid_manufacturer_adder;

