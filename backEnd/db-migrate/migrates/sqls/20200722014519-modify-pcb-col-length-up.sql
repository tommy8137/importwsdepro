/* Replace with your SQL commands */
ALTER TABLE wiprocurement.plm_pcbform ALTER COLUMN pcb_partnumber TYPE varchar(200) USING pcb_partnumber::varchar;
ALTER TABLE wiprocurement.plm_pcbform ALTER COLUMN pcb_array TYPE varchar(200) USING pcb_array::varchar;
