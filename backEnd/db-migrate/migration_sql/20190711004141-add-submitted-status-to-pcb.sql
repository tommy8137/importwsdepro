ALTER TABLE wiprocurement.edm_version ADD COLUMN IF NOT EXISTS leader_checked_status varchar(10) default null;
ALTER TABLE wiprocurement.edm_version ADD COLUMN IF NOT EXISTS leader_submitted_status varchar(10) default null;
ALTER TABLE wiprocurement.edm_version ADD COLUMN IF NOT EXISTS is_reject boolean default false;
