/* Replace with your SQL commands */
create or replace view v_thermal_sponge_material as
select * from formula.v_me_material_info vmmi where vmmi.part_category2_name = 'Sponge_of_Mylar_Sponge_Poron';

create or replace view v_thermal_mylar_material as
select * from formula.v_me_material_info vmmi where vmmi.part_category2_name = 'Mylar_of_Mylar_Sponge_Poron';

create or replace view v_thermal_adhesive_material as
select * from formula.v_me_material_info vmmi where vmmi.part_category2_name = 'Adhesive_of_Mylar_Sponge_Poron';

create or replace view v_thermal_fin_material as
select mm.id, mm."name", mm.disable_time from formula.material_metal mm, formula.thermal_category tc where tc.metal_material_id = mm.id
and tc.category_type = 'thermal_fin';

create or replace view v_thermal_plate_material as
select mm.id, mm."name", mm.disable_time from formula.material_metal mm, formula.thermal_category tc where tc.metal_material_id = mm.id
and tc.category_type = 'thermal_plate';

create or replace view v_thermal_block_material as
select mm.id, mm."name", mm.disable_time from formula.material_metal mm, formula.thermal_category tc where tc.metal_material_id = mm.id
and tc.category_type = 'thermal_block';