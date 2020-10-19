/* Replace with your SQL commands */

-- metal
ALTER TABLE formula.material_metal ADD CONSTRAINT material_metal_un UNIQUE (name);
ALTER TABLE formula.material_thinkness ADD CONSTRAINT material_thinkness_un UNIQUE (material_metal_id, thickness);

-- plastic
ALTER TABLE formula.material_spec ADD CONSTRAINT material_spec_un UNIQUE (material_spec_name);
ALTER TABLE formula.material ADD CONSTRAINT material_un UNIQUE (material_name, material_spec_id);
