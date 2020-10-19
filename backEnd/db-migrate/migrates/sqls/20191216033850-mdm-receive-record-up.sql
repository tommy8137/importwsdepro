DROP TABLE IF EXISTS wiprocurement.emdm_receive_record;
DROP INDEX IF EXISTS emdm_receive_record_epro_me_project_id_idx;
CREATE TABLE wiprocurement.emdm_receive_record (
	epro_me_project_id int4 NULL,
	emdm_ppch_id int4 NULL
);
CREATE INDEX emdm_receive_record_epro_me_project_id_idx ON wiprocurement.emdm_receive_record (epro_me_project_id,emdm_ppch_id);
