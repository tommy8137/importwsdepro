select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_management_and_profit', 'management_and_profit', 'NB');

select formula.fn_common_paramter_add('housing_metal', 
'housing_metal_secondary_processing', 'workpiece_spacing_in_assembly_line_direction', '流水線方向工件間距', 'mm',  
'二次加工費_流水線方向工件間距', 'NB','100', false);
select formula.fn_common_paramter_add('housing_metal', 
'housing_metal_secondary_processing', 'number_of_runs', '趟數', '',  
'二次加工費_趟數', 'NB','2', false);
select formula.fn_common_paramter_add('housing_metal', 
'housing_metal_secondary_processing', 'sandblasting_line_speed', '噴砂流水線速度', 'mm/s',  
'二次加工費_噴砂流水線速度', 'NB','2', false);

select formula.fn_common_paramter_add('housing_metal', 
'housing_metal_secondary_processing', 'pick_and_place_and_tool_change_time', '取放與換刀時間', 'sec',  
'二次加工費_取放與換刀時間', 'NB','30', false);

update formula.common_parameter set unit = 'USD/sec' where part_type = 'housing_metal_secondary_processing' and "label" = 'sand_blast_cost' and product_type_id = (select id from formula.product_type where type_name = 'NB');