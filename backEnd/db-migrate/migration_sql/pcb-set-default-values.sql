ALTER TABLE wiprocurement.pcb ALTER COLUMN edm_version_id SET NOT NULL;
ALTER TABLE wiprocurement.pcb ALTER COLUMN cost SET DEFAULT 1;
ALTER TABLE wiprocurement.pcb ALTER COLUMN is_count SET DEFAULT false;
ALTER TABLE wiprocurement.pcb ALTER COLUMN type SET DEFAULT 0;
ALTER TABLE wiprocurement.pcb ALTER COLUMN qty SET DEFAULT 1;
ALTER TABLE wiprocurement.pcb DROP COLUMN description;
