ALTER TABLE wiprocurement.pcb DROP is_personal_submitted;
ALTER TABLE wiprocurement.pcb DROP is_personal_checked;
ALTER TABLE wiprocurement.pcb DROP is_leader_checked;

ALTER TABLE wiprocurement.edm_version ADD is_pcb_persional_submitted boolean default false;
ALTER TABLE wiprocurement.edm_version ADD is_pcb_personal_checked boolean default false;
ALTER TABLE wiprocurement.edm_version ADD is_pcb_leader_checked boolean default false;

