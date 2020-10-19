/* Replace with your SQL commands */
update formula.rubber_material_spec rms set disable_time = null where spec_name = 'TPU';
update formula.rubber_material rm set disable_time = null where spec_id = (select rms.id from formula.rubber_material_spec rms where spec_name = 'TPU');

delete from formula.part_category_material where material_id in ( 
    select m.id from formula.material m where m.material_spec_id in (
    select id from formula.material_spec ms where ms.material_spec_name in ('TPU', 'TPEE') )
);
