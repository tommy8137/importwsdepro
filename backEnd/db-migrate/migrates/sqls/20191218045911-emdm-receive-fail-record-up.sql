DROP TABLE IF EXISTS wiprocurement.emdm_receive_fail_record;
DROP INDEX IF EXISTS emdm_receive_fail_record_emdm_ppch_id_idx;

CREATE TABLE wiprocurement.emdm_receive_fail_record (
	emdm_project_code varchar(4000) NULL,
	emdm_ppch_id int4 NULL,
	emdm_version varchar(23) NULL,
	error_reaseon varchar(2000) NULL
);
CREATE INDEX emdm_receive_fail_record_emdm_ppch_id_idx ON wiprocurement.emdm_receive_fail_record (emdm_ppch_id,emdm_version,emdm_project_code);

