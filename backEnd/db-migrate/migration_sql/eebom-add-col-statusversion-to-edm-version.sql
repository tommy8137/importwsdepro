ALTER TABLE wiprocurement.edm_version ADD COLUMN status_version numeric  DEFAULT 0.0;
ALTER TABLE wiprocurement.edm_version ADD COLUMN refresh_time timestamp with time zone NULL;
ALTER TABLE wiprocurement.edm_version ADD COLUMN is_saved BOOLEAN DEFAULT true;
ALTER TABLE wiprocurement.edm_version ADD COLUMN version_remark varchar(300) DEFAULT null;
