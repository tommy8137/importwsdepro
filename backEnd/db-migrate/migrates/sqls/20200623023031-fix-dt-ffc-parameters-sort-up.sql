delete from formula.parameter_value
--select count(id) from formula.parameter_value
where parameter_id in (select id from formula.common_parameter where formula_type_id = (select id from formula.formula_type where "name"= 'cable_ffc') and product_type_id != 1
AND sub_type in ('flat_paste_l_const', 'flat_paste_assembly_seconds', 'round_cover_w_const', 'round_cover_l_const', 'round_cover_assembly_seconds_w', 'round_cover_assembly_seconds_l'));

delete from formula.common_parameter
--select count(id) from formula.common_parameter
where formula_type_id = (select id from formula.formula_type where "name"= 'cable_ffc') and product_type_id != 1
AND sub_type in ('flat_paste_l_const', 'flat_paste_assembly_seconds', 'round_cover_w_const', 'round_cover_l_const', 'round_cover_assembly_seconds_w', 'round_cover_assembly_seconds_l');


select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_01', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '50', false);
-- 平貼長度係數 - 50
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_02', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '100', false);
-- 平貼長度係數 - 100
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_03', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '150', false);
-- 平貼長度係數 - 150
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_04', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '200', false);
-- 平貼長度係數 - 200
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_05', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '250', false);
-- 平貼長度係數 - 250
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_06', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '300', false);
-- 平貼長度係數 - 300
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_07', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '350', false);
-- 平貼長度係數 - 350
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_08', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '400', false);
-- 平貼長度係數 - 400
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_09', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '450', false);
-- 平貼長度係數 - 450
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_10', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '500', false);
-- 平貼長度係數 - 500
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_01', '平貼 0 < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_01}} 組裝秒數', 'sec', '零件費 平貼組裝秒數1', 'DT', '6', false);
-- 平貼 0 < 長度 <= 50 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_02', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_01}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_02}} 組裝秒數', 'sec', '零件費 平貼組裝秒數2', 'DT', '6', false);
-- 平貼 50 < 長度 <= 100 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_03', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_02}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_03}} 組裝秒數', 'sec', '零件費 平貼組裝秒數3', 'DT', '6', false);
-- 平貼 100 < 長度 <= 150 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_04', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_03}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_04}} 組裝秒數', 'sec', '零件費 平貼組裝秒數4', 'DT', '6', false);
-- 平貼 150 < 長度 <= 200 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_05', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_04}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_05}} 組裝秒數', 'sec', '零件費 平貼組裝秒數5', 'DT', '6', false);
-- 平貼 200 < 長度 <= 250 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_06', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_05}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_06}} 組裝秒數', 'sec', '零件費 平貼組裝秒數6', 'DT', '6', false);
-- 平貼 250 < 長度 <= 300 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_07', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_06}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_07}} 組裝秒數', 'sec', '零件費 平貼組裝秒數7', 'DT', '6', false);
-- 平貼 300 < 長度 <= 350 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_08', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_07}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_08}} 組裝秒數', 'sec', '零件費 平貼組裝秒數8', 'DT', '9', false);
-- 平貼 350 < 長度 <= 400 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_09', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_08}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_09}} 組裝秒數', 'sec', '零件費 平貼組裝秒數9', 'DT', '9', false);
-- 平貼 400 < 長度 <= 450 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_10', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_09}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_10}} 組裝秒數', 'sec', '零件費 平貼組裝秒數10', 'DT', '9', false);
-- 平貼 450 < 長度 <= 500 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_11', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_10}} < 長度 組裝秒數', 'sec', '零件費 平貼組裝秒數11', 'DT', '12', false);
-- 平貼 500 < 長度 12s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_w_const', 'round_cover_w_const_01', '環包寬度係數', 'mm', '零件費 環包寬度係數1', 'DT', '15', false);
-- 環包寬度係數 - 15
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_01', '環包長度係數', 'mm', '零件費 環包長度係數1', 'DT', '50', false);
-- 環包長度係數 - 50
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_02', '環包長度係數', 'mm', '零件費 環包長度係數2', 'DT', '100', false);
-- 環包長度係數 - 100
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_03', '環包長度係數', 'mm', '零件費 環包長度係數3', 'DT', '150', false);
-- 環包長度係數 - 150
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_04', '環包長度係數', 'mm', '零件費 環包長度係數4', 'DT', '200', false);
-- 環包長度係數 - 200
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_05', '環包長度係數', 'mm', '零件費 環包長度係數5', 'DT', '250', false);
-- 環包長度係數 - 250
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_06', '環包長度係數', 'mm', '零件費 環包長度係數6', 'DT', '300', false);
-- 環包長度係數 - 300
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_07', '環包長度係數', 'mm', '零件費 環包長度係數7', 'DT', '350', false);
-- 環包長度係數 - 350
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_08', '環包長度係數', 'mm', '零件費 環包長度係數8', 'DT', '400', false);
-- 環包長度係數 - 400
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_09', '環包長度係數', 'mm', '零件費 環包長度係數9', 'DT', '450', false);
-- 環包長度係數 - 450
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_10', '環包長度係數', 'mm', '零件費 環包長度係數10', 'DT', '500', false);
-- 環包長度係數 - 500
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_w', 'round_cover_assembly_seconds_w_01', '環包 寬度 <= {{cable_ffc,cable_ffc_components,round_cover_w_const_01}} 組裝秒數', 'sec', '零件費 環包寬組裝秒數1', 'DT', '6', false);
-- 環包 寬度 <= 15 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_01', '環包 0 < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_01}} 組裝秒數', 'sec', '零件費 環包長組裝秒數1', 'DT', '6', false);
-- 環包 0 < 長度 <= 50 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_02', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_01}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_02}} 組裝秒數', 'sec', '零件費 環包長組裝秒數1', 'DT', '6', false);
-- 環包 50 < 長度 <= 100 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_03', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_02}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_03}} 組裝秒數', 'sec', '零件費 環包長組裝秒數2', 'DT', '9', false);
-- 環包 100 < 長度 <= 150 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_04', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_03}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_04}} 組裝秒數', 'sec', '零件費 環包長組裝秒數3', 'DT', '9', false);
-- 環包 150 < 長度 <= 200 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_05', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_04}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_05}} 組裝秒數', 'sec', '零件費 環包長組裝秒數4', 'DT', '9', false);
-- 環包 200 < 長度 <= 250 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_06', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_05}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_06}} 組裝秒數', 'sec', '零件費 環包長組裝秒數5', 'DT', '9', false);
-- 環包 250 < 長度 <= 300 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_07', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_06}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_07}} 組裝秒數', 'sec', '零件費 環包長組裝秒數6', 'DT', '9', false);
-- 環包 300 < 長度 <= 350 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_08', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_07}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_08}} 組裝秒數', 'sec', '零件費 環包長組裝秒數7', 'DT', '12', false);
-- 環包 350 < 長度 <= 400 12sec
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_09', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_08}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_09}} 組裝秒數', 'sec', '零件費 環包長組裝秒數8', 'DT', '12', false);
-- 環包 400 < 長度 <= 450 12sec
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_10', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_09}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_10}} 組裝秒數', 'sec', '零件費 環包長組裝秒數9', 'DT', '12', false);
-- 環包 450 < 長度 <= 500 12sec
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_11', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_10}} < 長度  組裝秒數', 'sec', '零件費 環包長組裝秒數10', 'DT', '18', false);
-- 環包 500 < 長度 18sec

-- AIO

select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_01', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '50', false);
-- 平貼長度係數 - 50
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_02', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '100', false);
-- 平貼長度係數 - 100
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_03', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '150', false);
-- 平貼長度係數 - 150
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_04', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '200', false);
-- 平貼長度係數 - 200
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_05', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '250', false);
-- 平貼長度係數 - 250
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_06', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '300', false);
-- 平貼長度係數 - 300
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_07', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '350', false);
-- 平貼長度係數 - 350
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_08', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '400', false);
-- 平貼長度係數 - 400
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_09', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '450', false);
-- 平貼長度係數 - 450
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_10', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '500', false);
-- 平貼長度係數 - 500
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_01', '平貼 0 < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_01}} 組裝秒數', 'sec', '零件費 平貼組裝秒數1', 'AIO', '6', false);
-- 平貼 0 < 長度 <= 50 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_02', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_01}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_02}} 組裝秒數', 'sec', '零件費 平貼組裝秒數2', 'AIO', '6', false);
-- 平貼 50 < 長度 <= 100 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_03', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_02}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_03}} 組裝秒數', 'sec', '零件費 平貼組裝秒數3', 'AIO', '6', false);
-- 平貼 100 < 長度 <= 150 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_04', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_03}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_04}} 組裝秒數', 'sec', '零件費 平貼組裝秒數4', 'AIO', '6', false);
-- 平貼 150 < 長度 <= 200 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_05', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_04}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_05}} 組裝秒數', 'sec', '零件費 平貼組裝秒數5', 'AIO', '6', false);
-- 平貼 200 < 長度 <= 250 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_06', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_05}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_06}} 組裝秒數', 'sec', '零件費 平貼組裝秒數6', 'AIO', '6', false);
-- 平貼 250 < 長度 <= 300 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_07', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_06}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_07}} 組裝秒數', 'sec', '零件費 平貼組裝秒數7', 'AIO', '6', false);
-- 平貼 300 < 長度 <= 350 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_08', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_07}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_08}} 組裝秒數', 'sec', '零件費 平貼組裝秒數8', 'AIO', '9', false);
-- 平貼 350 < 長度 <= 400 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_09', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_08}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_09}} 組裝秒數', 'sec', '零件費 平貼組裝秒數9', 'AIO', '9', false);
-- 平貼 400 < 長度 <= 450 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_10', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_09}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_10}} 組裝秒數', 'sec', '零件費 平貼組裝秒數10', 'AIO', '9', false);
-- 平貼 450 < 長度 <= 500 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_11', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_10}} < 長度 組裝秒數', 'sec', '零件費 平貼組裝秒數11', 'AIO', '12', false);
-- 平貼 500 < 長度 12s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_w_const', 'round_cover_w_const_01', '環包寬度係數', 'mm', '零件費 環包寬度係數1', 'AIO', '15', false);
-- 環包寬度係數 - 15
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_01', '環包長度係數', 'mm', '零件費 環包長度係數1', 'AIO', '50', false);
-- 環包長度係數 - 50
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_02', '環包長度係數', 'mm', '零件費 環包長度係數2', 'AIO', '100', false);
-- 環包長度係數 - 100
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_03', '環包長度係數', 'mm', '零件費 環包長度係數3', 'AIO', '150', false);
-- 環包長度係數 - 150
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_04', '環包長度係數', 'mm', '零件費 環包長度係數4', 'AIO', '200', false);
-- 環包長度係數 - 200
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_05', '環包長度係數', 'mm', '零件費 環包長度係數5', 'AIO', '250', false);
-- 環包長度係數 - 250
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_06', '環包長度係數', 'mm', '零件費 環包長度係數6', 'AIO', '300', false);
-- 環包長度係數 - 300
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_07', '環包長度係數', 'mm', '零件費 環包長度係數7', 'AIO', '350', false);
-- 環包長度係數 - 350
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_08', '環包長度係數', 'mm', '零件費 環包長度係數8', 'AIO', '400', false);
-- 環包長度係數 - 400
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_09', '環包長度係數', 'mm', '零件費 環包長度係數9', 'AIO', '450', false);
-- 環包長度係數 - 450
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_10', '環包長度係數', 'mm', '零件費 環包長度係數10', 'AIO', '500', false);
-- 環包長度係數 - 500
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_w', 'round_cover_assembly_seconds_w_01', '環包 寬度 <= {{cable_ffc,cable_ffc_components,round_cover_w_const_01}} 組裝秒數', 'sec', '零件費 環包寬組裝秒數1', 'AIO', '6', false);
-- 環包 寬度 <= 15 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_01', '環包 0 < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_01}} 組裝秒數', 'sec', '零件費 環包長組裝秒數1', 'AIO', '6', false);
-- 環包 0 < 長度 <= 50 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_02', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_01}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_02}} 組裝秒數', 'sec', '零件費 環包長組裝秒數1', 'AIO', '6', false);
-- 環包 50 < 長度 <= 100 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_03', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_02}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_03}} 組裝秒數', 'sec', '零件費 環包長組裝秒數2', 'AIO', '9', false);
-- 環包 100 < 長度 <= 150 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_04', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_03}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_04}} 組裝秒數', 'sec', '零件費 環包長組裝秒數3', 'AIO', '9', false);
-- 環包 150 < 長度 <= 200 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_05', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_04}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_05}} 組裝秒數', 'sec', '零件費 環包長組裝秒數4', 'AIO', '9', false);
-- 環包 200 < 長度 <= 250 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_06', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_05}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_06}} 組裝秒數', 'sec', '零件費 環包長組裝秒數5', 'AIO', '9', false);
-- 環包 250 < 長度 <= 300 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_07', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_06}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_07}} 組裝秒數', 'sec', '零件費 環包長組裝秒數6', 'AIO', '9', false);
-- 環包 300 < 長度 <= 350 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_08', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_07}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_08}} 組裝秒數', 'sec', '零件費 環包長組裝秒數7', 'AIO', '12', false);
-- 環包 350 < 長度 <= 400 12sec
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_09', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_08}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_09}} 組裝秒數', 'sec', '零件費 環包長組裝秒數8', 'AIO', '12', false);
-- 環包 400 < 長度 <= 450 12sec
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_10', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_09}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_10}} 組裝秒數', 'sec', '零件費 環包長組裝秒數9', 'AIO', '12', false);
-- 環包 450 < 長度 <= 500 12sec
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_11', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_10}} < 長度  組裝秒數', 'sec', '零件費 環包長組裝秒數10', 'AIO', '18', false);
-- 環包 500 < 長度 18sec