ALTER TABLE wiprocurement.pcb
ADD COLUMN board varchar(50),
ADD COLUMN module varchar(50);

ALTER TABLE wiprocurement.eedm_pcb_temp
ADD COLUMN board varchar(50),
ADD COLUMN module varchar(50);


drop view if exists wiprocurement.view_pcb;
CREATE OR REPLACE VIEW wiprocurement.view_pcb
AS SELECT pcb.id,
    pcb.edm_version_id,
    pcb.cost,
    pcb.is_count,
    pcb.type,
    pcb.qty,
    pcb.content,
    pcb.create_time,
    pcb.update_time,
    pcb.part_number,
    pcb.supply_type,
    pcb.stage_no,
    pcb.sourcer_cost,
    pcb.board,
    pcb.module,
        CASE
            WHEN ((((pcb.content -> 'formData'::text) -> 'pcbTab'::text) -> 'PcbRemarks'::text) ->> 'PcbFillInPrice'::text) IS NOT NULL AND length((((pcb.content -> 'formData'::text) -> 'pcbTab'::text) -> 'PcbRemarks'::text) ->> 'PcbFillInPrice'::text) <> 0 THEN (((pcb.content -> 'formData'::text) -> 'pcbTab'::text) -> 'PcbRemarks'::text) ->> 'PcbFillInPrice'::text
            ELSE NULL::text
        END AS suggestion_cost
   FROM wiprocurement.pcb;