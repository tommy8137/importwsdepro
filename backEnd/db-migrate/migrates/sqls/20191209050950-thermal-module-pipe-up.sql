/* Replace with your SQL commands */
update formula.thermal_pipe set disable_time = now() where pipe_name in ('Groove(溝槽管)','VC(均熱管)');

CREATE OR REPLACE VIEW formula.v_thermal_pipe_diameter_v2
AS SELECT 
    tpd.pipe_id,
    tp.pipe_name,
	tpd.id as diameter_id,
    tpd.diameter_name as diameter_name,
    tpd.disable_time
   FROM formula.thermal_pipe_diameter tpd,
    formula.thermal_pipe tp
  WHERE tpd.pipe_id = tp.id
  order by tp.pipe_name, tpd.diameter_name;
  