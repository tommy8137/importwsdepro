drop view if exists formula.v_rubber_adhesive_setting_of_diecut_material;
CREATE VIEW formula.v_rubber_adhesive_setting_of_diecut_material AS
  select dms.id as thickness_id, dms.material_spec_name as thickness_name, dm.id as material_id, dm.material_name from formula.part_category_2 pc2
right join formula.part_category_diecut_material_spec pcdms on pcdms.part_category_2_id = pc2.id and pcdms.disable_time is null
right join formula.diecut_material_spec dms on dms.id = pcdms.material_spec_id and dms.disable_time is null
right join formula.diecut_material dm on dm.diecut_material_spec_id = dms.id and dm.disable_time is null and dm.material_name != 'Other_Fill_ME_Remark'
where pc2.category_name = 'Adhesive_of_Mylar_Sponge_Poron' and pc2.disable_time is null;
drop table if exists formula.rubber_adhesive_setting_of_diecut_material;