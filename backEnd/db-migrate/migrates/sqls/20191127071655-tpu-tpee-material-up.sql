/* Replace with your SQL commands */
update formula.rubber_material_spec rms set disable_time = now() where spec_name = 'TPU';
update formula.rubber_material rm set disable_time = now() where spec_id = (select rms.id from formula.rubber_material_spec rms where spec_name = 'TPU');


insert into formula.part_category_material(part_category_2_id, material_id)
select (select id from formula.part_category_2 pc where pc.category_name = 'Rubber'), m.id from formula.material m where m.material_spec_id in (
select id from formula.material_spec ms where ms.material_spec_name in ('TPU', 'TPEE')
) 
;