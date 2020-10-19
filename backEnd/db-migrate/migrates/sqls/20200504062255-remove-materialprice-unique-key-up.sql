-- metal
ALTER TABLE formula.material_metal DROP CONSTRAINT material_metal_un;
ALTER TABLE formula.material_thinkness DROP CONSTRAINT material_thinkness_un;

-- plastic
ALTER TABLE formula.material_spec DROP CONSTRAINT material_spec_un;
ALTER TABLE formula.material DROP CONSTRAINT material_un;
