update formula.part_category_diecut_material_spec set part_category_2_id = (select (select pc2.id from formula.part_category_2 pc2, formula.part_category_1 pc1
where pc1.category_name = 'Thermal' and pc2.part_category_1_id = pc1.id and pc2.category_name = 'Cu_Foil'))
where part_category_2_id=(select (select pc2.id from formula.part_category_2 pc2, formula.part_category_1 pc1
where pc1.category_name = 'Thermal' and pc2.part_category_1_id = pc1.id and pc2.category_name = 'Module'));

update formula.parameter_value set value='8.8' where parameter_id = (
select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name='C18400'));