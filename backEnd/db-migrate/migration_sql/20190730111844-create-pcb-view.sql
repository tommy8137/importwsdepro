DROP VIEW if exists wiprocurement.view_pcb;
CREATE OR REPLACE VIEW wiprocurement.view_pcb AS
 SELECT pcb.id,
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
	CASE
	WHEN pcb.content->'formData'->'pcbTab'->'PcbRemarks' ->> 'PcbFillInPrice' IS NOT NULL THEN pcb.content->'formData'->'pcbTab'->'PcbRemarks' ->> 'PcbFillInPrice'
    ELSE cast (pcb.cost as text)
	END AS suggestion_cost
FROM wiprocurement.pcb;
