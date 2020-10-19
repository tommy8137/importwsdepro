/* Replace with your SQL commands */
delete from formula.part_category_material where material_id in ( 
    select m.id from formula.material m where m.material_spec_id in (
    select id from formula.material_spec ms where ms.material_spec_name in ('TPU', 'TPEE') )
) and part_category_2_id = (select id from formula.part_category_2 pc where pc.category_name = 'Rubber');

delete from formula.parameter_value pv where source_table = 'rubber_material';

delete from formula.rubber_material rm;
delete from formula.rubber_material_spec rms;

ALTER TABLE formula.rubber_material_spec ADD column if not exists density numeric NOT NULL;

--rubber material spec
INSERT INTO formula.rubber_material_spec (id, spec_name, part_category_2_id, density) VALUES((select ms.id from formula.material_spec ms where ms.material_spec_name = 'TPU'), 'TPU', (select id from formula.part_category_2 where category_name = 'Rubber'), 1.25);
INSERT INTO formula.rubber_material_spec (id, spec_name, part_category_2_id, density) VALUES(uuid_generate_v1(), 'Silicon', (select id from formula.part_category_2 where category_name = 'Rubber'), 1.6);
INSERT INTO formula.rubber_material_spec (id, spec_name, part_category_2_id, density) VALUES((select ms.id from formula.material_spec ms where ms.material_spec_name = 'TPEE'), 'TPEE', (select id from formula.part_category_2 where category_name = 'Rubber'), 1.15);

--rubber material
INSERT INTO formula.rubber_material (id, spec_id, material_name) VALUES((select ms.id from formula.material ms where ms.material_name = 'Covestro_UDS70AU'), (select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Covestro_UDS70AU');
INSERT INTO formula.rubber_material (id, spec_id, material_name) VALUES((select ms.id from formula.material ms where ms.material_name = 'Covestro_IT85AU'), (select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Covestro_IT85AU');
INSERT INTO formula.rubber_material (id, spec_id, material_name) VALUES((select ms.id from formula.material ms where ms.material_name = 'Covestro_8785A'), (select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Covestro_8785A');
INSERT INTO formula.rubber_material (id, spec_id, material_name) VALUES((select ms.id from formula.material ms where ms.material_name = 'Covestro_1070AU'), (select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Covestro_1070AU');
INSERT INTO formula.rubber_material (id, spec_id, material_name) VALUES((select ms.id from formula.material ms where ms.material_name = 'Covestro_5377A'), (select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Covestro_5377A');
INSERT INTO formula.rubber_material (id, spec_id, material_name) VALUES((select ms.id from formula.material ms where ms.material_name = 'Covestro_1065AU'), (select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Covestro_1065AU');
INSERT INTO formula.rubber_material (id, spec_id, material_name) VALUES((select ms.id from formula.material ms where ms.material_name = 'Huntsman_AVALON 85AE'), (select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Huntsman_AVALON 85AE');
INSERT INTO formula.rubber_material (id, spec_id, material_name) VALUES((select ms.id from formula.material ms where ms.material_name = 'Huntsman_AVALON 80AE'), (select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Huntsman_AVALON 80AE');
INSERT INTO formula.rubber_material (id, spec_id, material_name) VALUES((select ms.id from formula.material ms where ms.material_name = 'Huntsman_AVALON 75AE'), (select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Huntsman_AVALON 75AE');
INSERT INTO formula.rubber_material (id, spec_id, material_name) VALUES((select ms.id from formula.material ms where ms.material_name = 'Huntsman_AVALON 65AB'), (select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Huntsman_AVALON 65AB');
INSERT INTO formula.rubber_material (spec_id, material_name) VALUES((select id from formula.rubber_material_spec where spec_name = 'Silicon'), 'Silicon_矽膠');

INSERT INTO formula.rubber_material (id, spec_id, material_name) VALUES((select ms.id from formula.material ms where ms.material_name = 'Dupont_Hytrel_3046'), (select id from formula.rubber_material_spec where spec_name = 'TPEE'), 'Dupont_Hytrel_3046');
INSERT INTO formula.rubber_material (id, spec_id, material_name) VALUES((select ms.id from formula.material ms where ms.material_name = 'Dupont_Hytrel_3078'), (select id from formula.rubber_material_spec where spec_name = 'TPEE'), 'Dupont_Hytrel_3078');
INSERT INTO formula.rubber_material (id, spec_id, material_name) VALUES((select ms.id from formula.material ms where ms.material_name = 'Dupont_Hytrel_4056'), (select id from formula.rubber_material_spec where spec_name = 'TPEE'), 'Dupont_Hytrel_4056');
INSERT INTO formula.rubber_material (id, spec_id, material_name) VALUES((select ms.id from formula.material ms where ms.material_name = 'Dupont_Hytrel_RS30F7'), (select id from formula.rubber_material_spec where spec_name = 'TPEE'), 'Dupont_Hytrel_RS30F7');
INSERT INTO formula.rubber_material (id, spec_id, material_name) VALUES((select ms.id from formula.material ms where ms.material_name = 'Dupont_Hytrel_RS40F2'), (select id from formula.rubber_material_spec where spec_name = 'TPEE'), 'Dupont_Hytrel_RS40F2');


INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 6.8657, 'number', 'rubber_material' from formula.rubber_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where spec_id = (select id from formula.rubber_material_spec where spec_name = 'Silicon') and material_name = 'Silicon_矽膠' order by tm.id;
