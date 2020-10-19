

ALTER TABLE wiprocurement.eebom_projects DROP is_pcb_approved;
ALTER TABLE wiprocurement.eebom_projects DROP is_bom_approved;
ALTER TABLE wiprocurement.eebom_projects DROP bom_approved_by;
ALTER TABLE wiprocurement.eebom_projects DROP pcb_approved_by;
ALTER TABLE wiprocurement.edm_version ADD is_pcb_approved boolean default false;
ALTER TABLE wiprocurement.edm_version ADD is_bom_approved boolean default false;
ALTER TABLE wiprocurement.edm_version ADD bom_approved_by varchar(50);
ALTER TABLE wiprocurement.edm_version ADD pcb_approved_by varchar(50);
ALTER TABLE wiprocurement.edm_version ADD approve_time timestamp with time zone;





