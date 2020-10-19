/* Replace with your SQL commands */
drop view if exists wiprocurement.v_thermal_sponge_material;
drop view if exists wiprocurement.v_thermal_mylar_material;
drop view if exists wiprocurement.v_thermal_adhesive_material;
drop view if exists wiprocurement.v_thermal_fin_material;
drop view if exists wiprocurement.v_thermal_plate_material;
drop view if exists wiprocurement.v_thermal_block_material;

create or replace view formula.v_thermal_sponge_material as
select * from formula.v_me_material_info vmmi where vmmi.part_category2_name = 'Sponge_of_Mylar_Sponge_Poron';

create or replace view formula.v_thermal_mylar_material as
select * from formula.v_me_material_info vmmi where vmmi.part_category2_name = 'Mylar_of_Mylar_Sponge_Poron';

create or replace view formula.v_thermal_adhesive_material as
select * from formula.v_me_material_info vmmi where vmmi.part_category2_name = 'Adhesive_of_Mylar_Sponge_Poron';

create or replace view formula.v_thermal_fin_material as
select mm.id, mm."name", mm.disable_time, mt.thickness, mt.disable_time as thickness_disable_time from formula.material_metal mm
join formula.thermal_category tc on tc.metal_material_id = mm.id
left join formula.material_thinkness mt on mm.id = mt.material_metal_id
where tc.category_type = 'thermal_fin';

create or replace view formula.v_thermal_plate_material as
select mm.id, mm."name", mm.disable_time, mt.thickness, mt.disable_time as thickness_disable_time from formula.material_metal mm
join formula.thermal_category tc on tc.metal_material_id = mm.id
left join formula.material_thinkness mt on mm.id = mt.material_metal_id
where tc.category_type = 'thermal_plate';

create or replace view formula.v_thermal_block_material as
select mm.id, mm."name", mm.disable_time, mt.thickness, mt.disable_time as thickness_disable_time from formula.material_metal mm
join formula.thermal_category tc on tc.metal_material_id = mm.id
left join formula.material_thinkness mt on mm.id = mt.material_metal_id
where tc.category_type = 'thermal_block';
