select formula.fn_common_paramter_add('housing_metal', 
'housing_metal_management_and_profit', 'al_management_and_profit', 'AL管銷&利潤百分比', '%',  
'管銷利潤_AL管銷&利潤百分比', 'NB','0.15', false);
select formula.fn_common_paramter_add('housing_metal', 
'housing_metal_management_and_profit', 'metal_management_and_profit', 'Metal管銷利潤&百分比', '%',  
'管銷利潤_Metal管銷利潤&百分比', 'NB','0.1', false);
select formula.fn_common_paramter_add('housing_metal', 
'housing_metal_management_and_profit', 'al_management_and_profit_weighting', 'AL管銷&利潤之二次加工費加權系數', '',  
'管銷利潤_AL管銷&利潤之二次加工費加權系數', 'NB','1', false);
select formula.fn_common_paramter_add('housing_metal', 
'housing_metal_management_and_profit', 'metal_management_and_profit_weighting', 'Metal管銷&利潤之二次加工費加權系數', '',  
'管銷利潤_Metal管銷&利潤之二次加工費加權系數', 'NB','0', false);
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_management_and_profit', 'management_and_profit', 'NB');