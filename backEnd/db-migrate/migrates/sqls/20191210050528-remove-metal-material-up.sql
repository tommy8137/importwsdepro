/* Replace with your SQL commands */
UPDATE formula.material_metal set disable_time = now() where "name" = '皮銅';
update formula.thermal_category set disable_time = now() where metal_material_id = (select id from formula.material_metal mm where name='皮銅');

create or replace view formula.v_thermal_category as
select tc.id, tc.category_type, tc.metal_material_id, tc.disable_time from formula.thermal_category tc;

update wiprocurement.eebom_spa_rules set type2 = 'Shunt' where type1 = 'Power IC' and type2 = 'Shut';
