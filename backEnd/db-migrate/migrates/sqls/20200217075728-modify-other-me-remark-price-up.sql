update formula.parameter_value 
set value=null
where parameter_id in
(
-- plastic
	select id 
	from formula.material
	where material_name = 'Other_Fill_ME_Remark'
union all
-- metal
	select mt.id
	from formula.material_thinkness mt
	left join formula.material_metal mm on mm.id = mt.material_metal_id
	where mm."name" = 'Other_Fill_ME_Remark'
union all 
-- diecut
	select id 
	from formula.diecut_material
	where material_name = 'Other_Fill_ME_Remark'
union all 
-- rubber
	select id 
	from formula.rubber_material
	where material_name = 'Other_Fill_ME_Remark'
union all 
-- turning
	select id 
	from formula.turning_material
	where material_name = 'Other_Fill_ME_Remark'
union all 
-- cable fpc
	select id 
	from formula.cablefpc_material
	where material_name = 'Other_Fill_ME_Remark'
union all 
-- magnet
	select id 
	from formula.magnet_material
	where material_name = 'Other_Fill_ME_Remark'
)