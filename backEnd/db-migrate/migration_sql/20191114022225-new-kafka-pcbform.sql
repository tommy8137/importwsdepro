CREATE TABLE wiprocurement.plm_pcbform (
  sync_id numeric,
  sync_op varchar(20) NULL,
  sync_ts timestamp without time zone NOT NULL,
  pcb_form_number varchar(50) NOT NULL,
  pcb_form_name varchar(50) NULL,
  pcb_form_version varchar(10) NULL,
  pcb_form_state varchar(50) NULL,
  project_code varchar(50) NULL,
  pcb_no varchar(50) NULL,
  pcb_version varchar(50) NULL,
  pcb_name varchar(50) NULL,
  pcb_partnumber varchar(50) NOT NULL,
  panel_size varchar(50) NULL,
  total_thickness varchar(50) NULL,
  pcb_array varchar(50) NULL,
  create_time timestamp with time zone DEFAULT now(),
  update_time timestamp with time zone,
  update_by character varying COLLATE pg_catalog."default",

  CONSTRAINT plm_pcbform_pkey PRIMARY KEY (pcb_form_number)
);
