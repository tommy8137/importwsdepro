ALTER TABLE wiprocurement.dashboard_version DROP CONSTRAINT dashboard_version_pkey CASCADE;

ALTER TABLE wiprocurement.dashboard_version ADD CONSTRAINT dashboard_version_pkey PRIMARY KEY (ee_version_id, me_version_name, me_version_id, project_code)