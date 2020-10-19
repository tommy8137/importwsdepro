drop view if exists formula.v_metal_machine_ton;
CREATE OR REPLACE VIEW formula.v_metal_machine_ton
AS SELECT mm.id,
    mm.ton,
    mm.disable_time
FROM formula.machine_metal mm;