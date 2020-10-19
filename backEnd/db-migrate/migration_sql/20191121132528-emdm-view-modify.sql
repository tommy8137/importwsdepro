drop view if exists formula.v_plastic_material_loss_rate;
CREATE OR REPLACE VIEW formula.v_plastic_material_loss_rate
AS SELECT pt.id,
    pt.loss_rate_name as name,
    pt.disable_time
   FROM formula.plastic_material_loss_rate pt;