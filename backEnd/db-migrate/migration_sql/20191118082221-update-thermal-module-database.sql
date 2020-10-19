
--thermal_pipe
INSERT INTO formula.thermal_pipe (id, pipe_name, create_time) VALUES (uuid_generate_v1(), 'Groove(溝槽管)', now()) ON CONFLICT (pipe_name) DO NOTHING;
INSERT INTO formula.thermal_pipe (id, pipe_name, create_time) VALUES (uuid_generate_v1(), 'VC(均熱管)', now()) ON CONFLICT (pipe_name) DO NOTHING;

INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name= 'thermal_module' )), 'thermal_module_components', 'sponge', 'sponge_loss_rate', '%', 'sponge loss rate', '零件費_sponge_lossrate', now()) ON CONFLICT (formula_type_id, part_type, label) DO NOTHING;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'thermal_module_components') AND (label = 'sponge_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_module' )) ) AND (name = 'thermal_module_init')), 0.015, 'number', 'common_parameter', now()) ON CONFLICT (parameter_id, activate_date_id) DO NOTHING;

 --magnet_material
-- ALTER TABLE formula.magnet_material ADD part_category_2_id uuid;
-- ALTER TABLE formula.magnet_material ADD CONSTRAINT magnet_material_fk FOREIGN KEY (part_category_2_id) REFERENCES formula.part_category_2(id);
-- UPDATE formula.magnet_material set part_category_2_id = (
-- select b.id
-- 	from formula.part_category_1 a inner join formula.part_category_2 b on a.id = b.part_category_1_id
-- 	where a.category_name='EMC' and b.category_name='Magnet'
-- );
-- ALTER TABLE formula.magnet_material ALTER COLUMN part_category_2_id SET NOT NULL;
