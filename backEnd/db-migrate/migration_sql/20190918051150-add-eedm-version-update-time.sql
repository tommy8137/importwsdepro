ALTER TABLE wiprocurement.edm_version
ADD COLUMN IF NOT EXISTS update_time timestamp with time zone;
