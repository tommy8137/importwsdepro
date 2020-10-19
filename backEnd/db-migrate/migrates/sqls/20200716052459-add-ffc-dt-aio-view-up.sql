drop view if exists formula.v_dt_ffc_reinforcing_plate_spec;
CREATE OR REPLACE VIEW formula.v_dt_ffc_reinforcing_plate_spec as
select 
	spec.id,
	spec.spec as name,
	spec.disable_time,
	spec.product_type_id
from formula.cableffc_dt_reinforcement_board spec;