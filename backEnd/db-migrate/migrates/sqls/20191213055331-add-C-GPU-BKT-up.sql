/* Replace with your SQL commands */
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'C_GPU_BKT'),(select id from formula.material_metal mm where mm."name" = 'AL1050')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'C_GPU_BKT'),(select id from formula.material_metal mm where mm."name" = 'AL5052')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'C_GPU_BKT'),(select id from formula.material_metal mm where mm."name" = 'SGCC')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'C_GPU_BKT'),(select id from formula.material_metal mm where mm."name" = 'SECC')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'C_GPU_BKT'),(select id from formula.material_metal mm where mm."name" = 'SPCC')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'C_GPU_BKT'),(select id from formula.material_metal mm where mm."name" = 'SPTE')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'C_GPU_BKT'),(select id from formula.material_metal mm where mm."name" = 'PH-CU')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'C_GPU_BKT'),(select id from formula.material_metal mm where mm."name" = 'CU1100')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'C_GPU_BKT'),(select id from formula.material_metal mm where mm."name" = 'KU400')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'C_GPU_BKT'),(select id from formula.material_metal mm where mm."name" = 'SUS301')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'C_GPU_BKT'),(select id from formula.material_metal mm where mm."name" = 'SUS304')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'HDD_SSD_BKT'),(select id from formula.material_metal mm where mm."name" = 'AL1050')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'HDD_SSD_BKT'),(select id from formula.material_metal mm where mm."name" = 'AL5052')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'HDD_SSD_BKT'),(select id from formula.material_metal mm where mm."name" = 'SGCC')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'HDD_SSD_BKT'),(select id from formula.material_metal mm where mm."name" = 'SECC')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'HDD_SSD_BKT'),(select id from formula.material_metal mm where mm."name" = 'SPCC')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'HDD_SSD_BKT'),(select id from formula.material_metal mm where mm."name" = 'SPTE')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'HDD_SSD_BKT'),(select id from formula.material_metal mm where mm."name" = 'PH-CU')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'HDD_SSD_BKT'),(select id from formula.material_metal mm where mm."name" = 'CU1100')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'HDD_SSD_BKT'),(select id from formula.material_metal mm where mm."name" = 'KU400')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'HDD_SSD_BKT'),(select id from formula.material_metal mm where mm."name" = 'SUS301')) on conflict do nothing;
INSERT INTO formula.part_category_material_metal (pategory_category_2_id, material_metal_id) VALUES((select id from formula.part_category_2 pc where pc.category_name = 'HDD_SSD_BKT'),(select id from formula.material_metal mm where mm."name" = 'SUS304')) on conflict do nothing;

INSERT INTO wiprocurement.bom_partlist_config (parts_ctgy_1, parts_ctgy_2, format) VALUES((select pc.part_category_1_id from formula.part_category_2 pc where pc.category_name = 'C_GPU_BKT'), (select pc.id from formula.part_category_2 pc where pc.category_name = 'C_GPU_BKT'), (select id from wiprocurement.bom_partlist_format bpf where bpf.format_key = 'housing-metal'));
INSERT INTO wiprocurement.bom_partlist_config (parts_ctgy_1, parts_ctgy_2, format) VALUES((select pc.part_category_1_id from formula.part_category_2 pc where pc.category_name = 'HDD_SSD_BKT'), (select pc.id from formula.part_category_2 pc where pc.category_name = 'HDD_SSD_BKT'), (select id from wiprocurement.bom_partlist_format bpf where bpf.format_key = 'housing-metal'));

INSERT INTO formula.part_category_formula_type (part_category_2_id, formula_type_id) VALUES((select pc.id from formula.part_category_2 pc where pc.category_name = 'C_GPU_BKT'), (select id from formula.formula_type ft where ft.name = 'housing_metal'));
INSERT INTO formula.part_category_formula_type (part_category_2_id, formula_type_id) VALUES((select pc.id from formula.part_category_2 pc where pc.category_name = 'HDD_SSD_BKT'), (select id from formula.formula_type ft where ft.name = 'housing_metal'));