/* Replace with your SQL commands */
drop view if exists formula.v_thermal_fin_material;
drop view if exists formula.v_thermal_plate_material;
drop view if exists formula.v_thermal_block_material;

create or replace view formula.v_thermal_fin_material as
select mm.id, mm."name", mm.disable_time, mt.id as thickness_id, mt.thickness, mt.disable_time as thickness_disable_time from formula.material_metal mm
join formula.thermal_category tc on tc.metal_material_id = mm.id
left join formula.material_thinkness mt on mm.id = mt.material_metal_id
where tc.category_type = 'thermal_fin';
  
create or replace view formula.v_thermal_plate_material as
select mm.id, mm."name", mm.disable_time, mt.id as thickness_id, mt.thickness, mt.disable_time as thickness_disable_time from formula.material_metal mm
join formula.thermal_category tc on tc.metal_material_id = mm.id
left join formula.material_thinkness mt on mm.id = mt.material_metal_id
where tc.category_type = 'thermal_plate';

create or replace view formula.v_thermal_block_material as
select mm.id, mm."name", mm.disable_time, mt.id as thickness_id, mt.thickness, mt.disable_time as thickness_disable_time from formula.material_metal mm
join formula.thermal_category tc on tc.metal_material_id = mm.id
left join formula.material_thinkness mt on mm.id = mt.material_metal_id
where tc.category_type = 'thermal_block';

create or replace view formula.v_thermal_clip_material as
select mm.id, mm."name", mm.disable_time from formula.material_metal mm, formula.part_category_material_metal pcmm
where mm.id = pcmm.material_metal_id and pcmm.pategory_category_2_id = (select id from formula.part_category_2 pc where pc.category_name = 'Metal');


