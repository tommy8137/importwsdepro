create or replace function formula.fn_common_paramter_add_with_sub_type(pa_formula_type varchar(200), pa_part_type varchar(200), pa_sub_type varchar(200), pa_label varchar(200), pa_label_name varchar(200), pa_unit varchar(200), pa_system_remark varchar(200), pa_product_type_name varchar(200), pa_value varchar(200), pa_expose bool)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin 
	insert into formula.common_parameter (formula_type_id, part_type, sub_type, "label", label_name, unit, system_remark, product_type_id) values (
		(select id from formula.formula_type where "name"= pa_formula_type),
		pa_part_type,
		pa_sub_type,
	    pa_label,
	    pa_label_name,
	    pa_unit,
	    pa_system_remark,
        (select id from formula.product_type where type_name = pa_product_type_name)
	) on conflict do nothing;

	insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
	select cp.id, sd.id, pa_value, 'number', 'common_parameter'
	from formula.common_parameter cp
	right join formula.schedule_date sd on sd.product_type_id = cp.product_type_id and sd.formula_type_id = (select id from formula.formula_type where "name" = pa_formula_type)
	where cp."label" = pa_label
	and cp.part_type = pa_part_type
	and cp.product_type_id = (select id from formula.product_type where type_name = pa_product_type_name)
	on conflict do nothing;

    if pa_expose = true then
		PERFORM formula.fn_common_paramter_expose_add(pa_formula_type, pa_part_type, pa_label, (select id from formula.product_type where type_name = pa_product_type_name));
    end if;
end;
$function$
;

insert into formula.schedule_date (name, formula_type_id, activate_date, product_type_id) values
('cable_ffc_dt_init', (select id from formula.formula_type where name = 'cable_ffc'), '1970-01-01', (select id from formula.product_type where type_name = 'DT')),
('cable_ffc_aio_init', (select id from formula.formula_type where name = 'cable_ffc'), '1970-01-01', (select id from formula.product_type where type_name = 'AIO'))
 on conflict do nothing;

-- DT --
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_material', 'material_copper_wire_l_side_constant', '銅線長度邊料尺寸', 'mm', '材料費 銅線邊料尺寸 L', 'DT', '2', true);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_material', 'material_copper_wire_loss_rate', '銅線材料費Loss rate', '%', '材料費 銅線材料費Loss rate', 'DT', '0.03', false);

select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_material', 'material_coating_loss_rate', '皮膜材料費Loss rate', '%', '材料費 皮膜材料費Loss rate', 'DT', '0.03', false);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_material', 'material_coating_l_side_constant', '皮膜長度邊料尺寸', 'mm', '材料費 皮膜邊料尺寸 L', 'DT', '2', true);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_material', 'material_coating_w_side_constant_with_punch', '有沖型時，皮膜所增加之寬度邊料尺寸', 'mm', '材料費_Cable_ffc_material 有沖型時，皮膜所增加之寬度邊料尺寸', 'DT', '2', true);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_material', 'material_coating_w_side_constant_with_connector', '有Connector時，皮膜所增加之寬度邊料尺寸', 'mm', '材料費_Cable_ffc_material 有Connector時，皮膜所增加之寬度邊料尺寸', 'DT', '3', true);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_material', 'material_coating_common_w', '常用皮膜材料寬度', 'mm', '材料費 常用皮膜材料寬度', 'DT', '120', true);

select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'fitting_and_slitting_assembly_rate', '貼合分條及導通裁切組裝費率', 'USD/min', '二次加工費 組裝費率', 'DT', '0.0600', false);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'drawing_and_rolling_seconds', '拉絲及壓延秒數', 'sec', '二次加工費 拉絲及壓延秒數', 'DT', '4', false);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'fitting_and_slitting_length_per_second', '貼合及分條每秒長度', 'mm', '二次加工費 貼合及分條每秒長度', 'DT', '25', false);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'conductive_and_other_test_seconds', '導通及其他測試秒數', 'sec', '二次加工費 導通及其他測試秒數', 'DT', '10', false);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'cutting_and_measuring_seconds', '裁切及量測秒數', 'sec', '二次加工費 裁切及量測秒數', 'DT', '10', false);

select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'line_drawing_rate', '畫線費率', 'USD/min', '二次加工費 畫線費率', 'DT', '0.0600', false);
-- 畫線費率
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'pritting_rate', '印刷費率', 'USD/面', '二次加工費 印刷費率', 'DT', '0.0060', false);
-- 印刷費率
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'pitch_specification_1', 'Pitch規格', null, '二次加工費 Pitch規格1', 'DT', '0.5', false);
-- Pitch規格
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'pitch_specification_2', 'Pitch規格', null, '二次加工費 Pitch規格2', 'DT', '1.0', false);
-- Pitch規格
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_secondary_processing', 'pitch_specification_1', 'pitch_1_machine_price', '{{cable_ffc,cable_ffc_secondary_processing,pitch_specification_1}} Pitch基本上機費', 'USD', '二次加工費 Pitch基本上機費1', 'DT', '0.0044', false);
-- 0.5 Pitch基本上機費
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_secondary_processing', 'pitch_specification_2', 'pitch_2_machine_price', '{{cable_ffc,cable_ffc_secondary_processing,pitch_specification_2}} Pitch基本上機費', 'USD', '二次加工費 Pitch基本上機費2', 'DT', '0.0115', false);
-- 1.0 Pitch基本上機費
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_secondary_processing', 'pitch_specification_1', 'pitch_1_3um_gilt_rate', '3um，{{cable_ffc,cable_ffc_secondary_processing,pitch_specification_1}} Pitch，每Pin基本鍍金費率', 'USD', '二次加工費 每Pin基本鍍金費率1', 'DT', '0.0005', false);
-- 3um，0.5 Pitch，每Pin基本鍍金費率
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_secondary_processing', 'pitch_specification_2', 'pitch_2_3um_gilt_rate', '3um，{{cable_ffc,cable_ffc_secondary_processing,pitch_specification_2}} Pitch，每Pin基本鍍金費率', 'USD', '二次加工費 每Pin基本鍍金費率2', 'DT', '0.0010', false);
-- 3um，1.0 Pitch，每Pin基本鍍金費率
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_secondary_processing', 'pitch_specification_1', 'pitch_1_oversize_gilt_rate', '增加1um，{{cable_ffc,cable_ffc_secondary_processing,pitch_specification_1}} Pitch，每Pin費率', 'USD', '二次加工費 每Pin增加費率1', 'DT', '0.0002', false);
-- 增加1um，0.5 Pitch，每Pin費率
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_secondary_processing', 'pitch_specification_2', 'pitch_2_oversize_gilt_rate', '增加1um，{{cable_ffc,cable_ffc_secondary_processing,pitch_specification_2}} Pitch，每Pin費率', 'USD', '二次加工費 每Pin增加費率2', 'DT', '0.0003', false);
-- 增加1um，1.0 Pitch，每Pin費率
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'gilt_length', '鍍金長度係數', 'mm', '二次加工費 鍍金長度係數', 'DT', '100', false);
-- 鍍金長度係數
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'gilt_length_over_price', '鍍金長度>{{cable_ffc,cable_ffc_secondary_processing,gilt_length}}時，長度超過{{cable_ffc,cable_ffc_secondary_processing,gilt_length}}的部分，每{{cable_ffc,cable_ffc_secondary_processing,gilt_length}}的區間所增加的額外費用', 'USD', '二次加工費 鍍金區間所增加的額外費用', 'DT', '0.0044', false);
-- 長度>100時，長度超過100的部分，每100的區間所增加的額外費用
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'punch_rate', '沖型費率', 'USD', '二次加工費 沖型費率', 'DT', '0.0060', false);
-- 沖型費率
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'fold_rate', '折彎費率', 'USD', '二次加工費 折彎費率', 'DT', '0.0050', false);
-- 折彎費率
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'part_number_painting_rate', '料號噴碼費率', 'USD', '二次加工費 料號噴碼費率', 'DT', '0.0060', false);
-- 料號噴碼費率
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'assembly_rate', '組裝費率', 'USD/min', '二次加工費 組裝費率', 'DT', '0.0600', false);
-- 組裝費率
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'fitting_and_slitting_loss_rate', '貼合分條及導通裁切Loss rate', '%', '二次加工費 貼合分條及導通裁切Loss rate', 'DT', '0', false);
-- 貼合分條及導通裁切Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'line_drawing_loss_rate', '停止線Loss rate', '%', '二次加工費 停止線Loss rate', 'DT', '0', false);
-- 停止線Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'pritting_loss_rate', '印刷Loss rate', '%', '二次加工費 印刷Loss rate', 'DT', '0', false);
-- 印刷Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'gilt_loss_rate', '金手指掛鍍Loss rate', '%', '二次加工費 金手指掛鍍Loss rate', 'DT', '0', false);
-- 金手指掛鍍Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'punch_loss_rate', '沖型Loss rate', '%', '二次加工費 沖型Loss rate', 'DT', '0', false);
-- 沖型Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'fold_loss_rate', '折彎Loss rate', '%', '二次加工費 折彎Loss rate', 'DT', '0', false);
-- 折彎Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'assembly_loss_rate', '組裝Loss rate', '%', '二次加工費 組裝Loss rate', 'DT', '0', false);
-- 組裝Loss rate

select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'connector_loss_rate', 'Connector Loss rate', '%', '零件費 Connector Loss rate', 'DT', '3', false);
-- Connector Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'reinforcement_board_loss_rate', '補強板Loss rate', '%', '零件費 補強板Loss rate', 'DT', '3', false);
-- 補強板Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'accessories_loss_rate', '輔料Loss rate', '%', '零件費 輔料Loss rate', 'DT', '3', false);
-- 輔料Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'welding_assembly_seconds', '焊接式，每pin的組裝秒數', 'sec', '零件費 焊接式，每pin的組裝秒數', 'DT', '4', false);
-- 焊接式，每pin的組裝秒數
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'puncture_assembly_seconds', '刺破式，每pin的組裝秒數', 'sec', '零件費 刺破式，每pin的組裝秒數', 'DT', '15', false);
-- 刺破式，每個connector的組裝秒數
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'reinforcement_board_w_const', '補強板寬度寬放', 'mm', '零件費 補強板寬度寬放', 'DT', '6', false);
-- 補強板寬度寬放
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_1', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '50', false);
-- 平貼長度係數 - 50
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_2', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '100', false);
-- 平貼長度係數 - 100
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_3', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '150', false);
-- 平貼長度係數 - 150
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_4', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '200', false);
-- 平貼長度係數 - 200
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_5', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '250', false);
-- 平貼長度係數 - 250
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_6', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '300', false);
-- 平貼長度係數 - 300
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_7', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '350', false);
-- 平貼長度係數 - 350
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_8', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '400', false);
-- 平貼長度係數 - 400
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_9', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '450', false);
-- 平貼長度係數 - 450
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_10', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'DT', '500', false);
-- 平貼長度係數 - 500
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_1', '平貼 0 < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_1}} 組裝秒數', 'sec', '零件費 平貼組裝秒數1', 'DT', '6', false);
-- 平貼 0 < 長度 <= 50 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_2', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_1}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_2}} 組裝秒數', 'sec', '零件費 平貼組裝秒數2', 'DT', '6', false);
-- 平貼 50 < 長度 <= 100 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_3', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_2}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_3}} 組裝秒數', 'sec', '零件費 平貼組裝秒數3', 'DT', '6', false);
-- 平貼 100 < 長度 <= 150 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_4', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_3}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_4}} 組裝秒數', 'sec', '零件費 平貼組裝秒數4', 'DT', '6', false);
-- 平貼 150 < 長度 <= 200 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_5', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_4}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_5}} 組裝秒數', 'sec', '零件費 平貼組裝秒數5', 'DT', '6', false);
-- 平貼 200 < 長度 <= 250 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_6', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_5}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_6}} 組裝秒數', 'sec', '零件費 平貼組裝秒數6', 'DT', '6', false);
-- 平貼 250 < 長度 <= 300 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_7', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_6}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_7}} 組裝秒數', 'sec', '零件費 平貼組裝秒數7', 'DT', '6', false);
-- 平貼 300 < 長度 <= 350 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_8', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_7}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_8}} 組裝秒數', 'sec', '零件費 平貼組裝秒數8', 'DT', '9', false);
-- 平貼 350 < 長度 <= 400 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_9', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_8}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_9}} 組裝秒數', 'sec', '零件費 平貼組裝秒數9', 'DT', '9', false);
-- 平貼 400 < 長度 <= 450 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_10', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_9}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_10}} 組裝秒數', 'sec', '零件費 平貼組裝秒數10', 'DT', '9', false);
-- 平貼 450 < 長度 <= 500 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_11', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_10}} < 長度 組裝秒數', 'sec', '零件費 平貼組裝秒數11', 'DT', '12', false);
-- 平貼 500 < 長度 12s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_w_const', 'round_cover_w_const_1', '環包寬度係數', 'mm', '零件費 環包寬度係數1', 'DT', '15', false);
-- 環包寬度係數 - 15
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_1', '環包長度係數', 'mm', '零件費 環包長度係數1', 'DT', '50', false);
-- 環包長度係數 - 50
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_2', '環包長度係數', 'mm', '零件費 環包長度係數2', 'DT', '100', false);
-- 環包長度係數 - 100
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_3', '環包長度係數', 'mm', '零件費 環包長度係數3', 'DT', '150', false);
-- 環包長度係數 - 150
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_4', '環包長度係數', 'mm', '零件費 環包長度係數4', 'DT', '200', false);
-- 環包長度係數 - 200
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_5', '環包長度係數', 'mm', '零件費 環包長度係數5', 'DT', '250', false);
-- 環包長度係數 - 250
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_6', '環包長度係數', 'mm', '零件費 環包長度係數6', 'DT', '300', false);
-- 環包長度係數 - 300
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_7', '環包長度係數', 'mm', '零件費 環包長度係數7', 'DT', '350', false);
-- 環包長度係數 - 350
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_8', '環包長度係數', 'mm', '零件費 環包長度係數8', 'DT', '400', false);
-- 環包長度係數 - 400
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_9', '環包長度係數', 'mm', '零件費 環包長度係數9', 'DT', '450', false);
-- 環包長度係數 - 450
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_10', '環包長度係數', 'mm', '零件費 環包長度係數10', 'DT', '500', false);
-- 環包長度係數 - 500
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_w', 'round_cover_assembly_seconds_w_1', '環包 寬度 <= {{cable_ffc,cable_ffc_components,round_cover_w_const_1}} 組裝秒數', 'sec', '零件費 環包寬組裝秒數1', 'DT', '6', false);
-- 環包 寬度 <= 15 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_1', '環包 0 < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_1}} 組裝秒數', 'sec', '零件費 環包長組裝秒數1', 'DT', '6', false);
-- 環包 0 < 長度 <= 50 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_2', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_1}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_2}} 組裝秒數', 'sec', '零件費 環包長組裝秒數1', 'DT', '6', false);
-- 環包 50 < 長度 <= 100 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_3', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_2}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_3}} 組裝秒數', 'sec', '零件費 環包長組裝秒數2', 'DT', '9', false);
-- 環包 100 < 長度 <= 150 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_4', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_3}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_4}} 組裝秒數', 'sec', '零件費 環包長組裝秒數3', 'DT', '9', false);
-- 環包 150 < 長度 <= 200 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_5', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_4}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_5}} 組裝秒數', 'sec', '零件費 環包長組裝秒數4', 'DT', '9', false);
-- 環包 200 < 長度 <= 250 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_6', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_5}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_6}} 組裝秒數', 'sec', '零件費 環包長組裝秒數5', 'DT', '9', false);
-- 環包 250 < 長度 <= 300 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_7', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_6}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_7}} 組裝秒數', 'sec', '零件費 環包長組裝秒數6', 'DT', '9', false);
-- 環包 300 < 長度 <= 350 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_8', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_7}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_8}} 組裝秒數', 'sec', '零件費 環包長組裝秒數7', 'DT', '12', false);
-- 環包 350 < 長度 <= 400 12sec
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_9', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_8}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_9}} 組裝秒數', 'sec', '零件費 環包長組裝秒數8', 'DT', '12', false);
-- 環包 400 < 長度 <= 450 12sec
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_10', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_9}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_10}} 組裝秒數', 'sec', '零件費 環包長組裝秒數9', 'DT', '12', false);
-- 環包 450 < 長度 <= 500 12sec
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_11', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_10}} < 長度  組裝秒數', 'sec', '零件費 環包長組裝秒數10', 'DT', '18', false);
-- 環包 500 < 長度 18sec
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'twine_l_const', 'twine_l_const_1', '纏繞長度係數', 'mm', '零件費 纏繞長度係數1', 'DT', '100', false);
-- 纏繞長度係數 - 100
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'twine_gap_l_const', 'twine_gap_l_const_1', '纏繞長度區間係數', 'mm', '零件費 纏繞長度區間係數1', 'DT', '100', false);
-- 纏繞長度區間係數 - 100
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'twine_assembly_seconds_l', 'twine_assembly_seconds_l_1', '纏繞 0 < 長度 <= {{cable_ffc,cable_ffc_components,twine_l_const_1}} 組裝秒數', 'sec', '零件費 纏繞長組裝秒數1', 'DT', '14', false);
-- 纏繞 0 < 長度 <= 100 14sec
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'twine_assembly_seconds_l', 'twine_assembly_seconds_l_add', '纏繞 長度 > {{cable_ffc,cable_ffc_components,twine_l_const_1}} 時，從 {{cable_ffc,cable_ffc_components,twine_l_const_1}} + 1 開始，每{{cable_ffc,cable_ffc_components,twine_gap_l_const_1}}的區間增加的組裝秒數', 'sec', '零件費 纏繞長增加組裝秒數', 'DT', '7', false);
-- 纏繞 長度>100時，從101開始，每50的區間增加的秒數 7sec
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'feeding_increase_size_l', '長度下料增加尺寸', 'mm', '零件費 長度下料增加尺寸', 'DT', '6', false);
-- 長度下料增加尺寸 6mm
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'feeding_increase_size_w', '寬度下料增加尺寸', 'mm', '零件費 寬度下料增加尺寸', 'DT', '6', false);
-- 寬度下料增加尺寸 6mm
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm1_machine_price', 'M1沖工費,材料面積<=25', 'USD', '零件費 M1機台沖工費(沖)', 'DT', '0.0120', false);
-- M1沖工費,材料面積<=25 0.0120 usd
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm2_machine_price', 'M2沖工費,材料面積<=2500', 'USD', '零件費 M2機台沖工費(沖)', 'DT', '0.0120', false);
-- M2沖工費,材料面積<=2500 0.0120 usd
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm3_machine_price', 'M3沖工費,材料面積<=5000', 'USD', '零件費 M3機台沖工費(沖)', 'DT', '0.0130', false);
-- M3沖工費,材料面積<=5000 0.0130 usd
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm1_effective_area_L', 'M1,沖模有效長度', 'mm', '零件費 M1,沖模有效長度', 'DT', '300', false);
-- M1,沖模有效長度 - 300
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm1_effective_area_W', 'M1,沖模有效寬度', 'mm', '零件費 M1,沖模有效寬度', 'DT', '200', false);
-- M1,沖模有效寬度 - 200
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm2_effective_area_L', 'M2,沖模有效長度', 'mm', '零件費 M2,沖模有效長度', 'DT', '600', false);
-- M2,沖模有效長度 - 600
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm2_effective_area_W', 'M2,沖模有效寬度', 'mm', '零件費 M2,沖模有效寬度', 'DT', '400', false);
-- M2,沖模有效寬度 - 400
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm3_effective_area_L', 'M3,沖模有效長度', 'mm', '零件費 M3,沖模有效長度', 'DT', '900', false);
-- M3,沖模有效長度 - 900
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm3_effective_area_W', 'M3,沖模有效寬度', 'mm', '零件費 M3,沖模有效寬度', 'DT', '500', false);
-- M3,沖模有效寬度 - 500
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'die_cut_profit', '沖切利潤', '%', '零件費 沖切利潤', 'DT', '0.1', false);
-- 沖切利潤 - 10%
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'manual_fit_profit', '人工貼合利潤', '%', '零件費 人工貼合利潤', 'DT', '0.1', false);
-- 人工貼合利潤 - 10%
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'manual_fit_assy_time', '人工貼合秒數 Assy Time', 'sec', '零件費 人工貼合秒數 Assy Time', 'DT', '8', false);
-- Assy Time - 8 sec
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'manual_fit_assembly_rate', '人工貼合組裝費率', 'sec', '零件費 人工貼合組裝費率', 'DT', '0.0600', false);
-- 組裝費率 - 0.0600 USD/min

select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_management_and_profit', 'management_and_profit', '管銷利潤', '%', '零件費 管銷利潤', 'DT', '0.1', false);
-- 管銷利潤 - 10 %

-- AIO --
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_material', 'material_copper_wire_l_side_constant', '銅線長度邊料尺寸', 'mm', '材料費 銅線邊料尺寸 L', 'AIO', '2', true);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_material', 'material_copper_wire_loss_rate', '銅線材料費Loss rate', '%', '材料費 銅線材料費Loss rate', 'AIO', '0.03', false);

select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_material', 'material_coating_loss_rate', '皮膜材料費Loss rate', '%', '材料費 皮膜材料費Loss rate', 'AIO', '0.03', false);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_material', 'material_coating_l_side_constant', '皮膜長度邊料尺寸', 'mm', '材料費 皮膜邊料尺寸 L', 'AIO', '2', true);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_material', 'material_coating_w_side_constant_with_punch', '有沖型時，皮膜所增加之寬度邊料尺寸', 'mm', '材料費_Cable_ffc_material 有沖型時，皮膜所增加之寬度邊料尺寸', 'AIO', '2', true);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_material', 'material_coating_w_side_constant_with_connector', '有Connector時，皮膜所增加之寬度邊料尺寸', 'mm', '材料費_Cable_ffc_material 有Connector時，皮膜所增加之寬度邊料尺寸', 'AIO', '3', true);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_material', 'material_coating_common_w', '常用皮膜材料寬度', 'mm', '材料費 常用皮膜材料寬度', 'AIO', '120', true);

select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'fitting_and_slitting_assembly_rate', '貼合分條及導通裁切組裝費率', 'USD/min', '二次加工費 組裝費率', 'AIO', '0.0600', false);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'drawing_and_rolling_seconds', '拉絲及壓延秒數', 'sec', '二次加工費 拉絲及壓延秒數', 'AIO', '4', false);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'fitting_and_slitting_length_per_second', '貼合及分條每秒長度', 'mm', '二次加工費 貼合及分條每秒長度', 'AIO', '25', false);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'conductive_and_other_test_seconds', '導通及其他測試秒數', 'sec', '二次加工費 導通及其他測試秒數', 'AIO', '10', false);
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'cutting_and_measuring_seconds', '裁切及量測秒數', 'sec', '二次加工費 裁切及量測秒數', 'AIO', '10', false);

select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'line_drawing_rate', '畫線費率', 'USD/min', '二次加工費 畫線費率', 'AIO', '0.0600', false);
-- 畫線費率
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'pritting_rate', '印刷費率', 'USD/面', '二次加工費 印刷費率', 'AIO', '0.0060', false);
-- 印刷費率
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'pitch_specification_1', 'Pitch規格', null, '二次加工費 Pitch規格1', 'AIO', '0.5', false);
-- Pitch規格
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'pitch_specification_2', 'Pitch規格', null, '二次加工費 Pitch規格2', 'AIO', '1.0', false);
-- Pitch規格
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_secondary_processing', 'pitch_specification_1', 'pitch_1_machine_price', '{{cable_ffc,cable_ffc_secondary_processing,pitch_specification_1}} Pitch基本上機費', 'USD', '二次加工費 Pitch基本上機費1', 'AIO', '0.0044', false);
-- 0.5 Pitch基本上機費
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_secondary_processing', 'pitch_specification_2', 'pitch_2_machine_price', '{{cable_ffc,cable_ffc_secondary_processing,pitch_specification_2}} Pitch基本上機費', 'USD', '二次加工費 Pitch基本上機費2', 'AIO', '0.0115', false);
-- 1.0 Pitch基本上機費
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_secondary_processing', 'pitch_specification_1', 'pitch_1_3um_gilt_rate', '3um，{{cable_ffc,cable_ffc_secondary_processing,pitch_specification_1}} Pitch，每Pin基本鍍金費率', 'USD', '二次加工費 每Pin基本鍍金費率1', 'AIO', '0.0005', false);
-- 3um，0.5 Pitch，每Pin基本鍍金費率
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_secondary_processing', 'pitch_specification_2', 'pitch_2_3um_gilt_rate', '3um，{{cable_ffc,cable_ffc_secondary_processing,pitch_specification_2}} Pitch，每Pin基本鍍金費率', 'USD', '二次加工費 每Pin基本鍍金費率2', 'AIO', '0.0010', false);
-- 3um，1.0 Pitch，每Pin基本鍍金費率
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_secondary_processing', 'pitch_specification_1', 'pitch_1_oversize_gilt_rate', '增加1um，{{cable_ffc,cable_ffc_secondary_processing,pitch_specification_1}} Pitch，每Pin費率', 'USD', '二次加工費 每Pin增加費率1', 'AIO', '0.0002', false);
-- 增加1um，0.5 Pitch，每Pin費率
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_secondary_processing', 'pitch_specification_2', 'pitch_2_oversize_gilt_rate', '增加1um，{{cable_ffc,cable_ffc_secondary_processing,pitch_specification_2}} Pitch，每Pin費率', 'USD', '二次加工費 每Pin增加費率2', 'AIO', '0.0003', false);
-- 增加1um，1.0 Pitch，每Pin費率
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'gilt_length', '鍍金長度係數', 'mm', '二次加工費 鍍金長度係數', 'AIO', '100', false);
-- 鍍金長度係數
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'gilt_length_over_price', '鍍金長度>{{cable_ffc,cable_ffc_secondary_processing,gilt_length}}時，長度超過{{cable_ffc,cable_ffc_secondary_processing,gilt_length}}的部分，每{{cable_ffc,cable_ffc_secondary_processing,gilt_length}}的區間所增加的額外費用', 'USD', '二次加工費 鍍金區間所增加的額外費用', 'AIO', '0.0044', false);
-- 長度>100時，長度超過100的部分，每100的區間所增加的額外費用
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'punch_rate', '沖型費率', 'USD', '二次加工費 沖型費率', 'AIO', '0.0060', false);
-- 沖型費率
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'fold_rate', '折彎費率', 'USD', '二次加工費 折彎費率', 'AIO', '0.0050', false);
-- 折彎費率
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'part_number_painting_rate', '料號噴碼費率', 'USD', '二次加工費 料號噴碼費率', 'AIO', '0.0060', false);
-- 料號噴碼費率
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'assembly_rate', '組裝費率', 'USD/min', '二次加工費 組裝費率', 'AIO', '0.0600', false);
-- 組裝費率
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'fitting_and_slitting_loss_rate', '貼合分條及導通裁切Loss rate', '%', '二次加工費 貼合分條及導通裁切Loss rate', 'AIO', '0', false);
-- 貼合分條及導通裁切Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'line_drawing_loss_rate', '停止線Loss rate', '%', '二次加工費 停止線Loss rate', 'AIO', '0', false);
-- 停止線Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'pritting_loss_rate', '印刷Loss rate', '%', '二次加工費 印刷Loss rate', 'AIO', '0', false);
-- 印刷Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'gilt_loss_rate', '金手指掛鍍Loss rate', '%', '二次加工費 金手指掛鍍Loss rate', 'AIO', '0', false);
-- 金手指掛鍍Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'punch_loss_rate', '沖型Loss rate', '%', '二次加工費 沖型Loss rate', 'AIO', '0', false);
-- 沖型Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'fold_loss_rate', '折彎Loss rate', '%', '二次加工費 折彎Loss rate', 'AIO', '0', false);
-- 折彎Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_secondary_processing', 'assembly_loss_rate', '組裝Loss rate', '%', '二次加工費 組裝Loss rate', 'AIO', '0', false);
-- 組裝Loss rate

select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'connector_loss_rate', 'Connector Loss rate', '%', '零件費 Connector Loss rate', 'AIO', '3', false);
-- Connector Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'reinforcement_board_loss_rate', '補強板Loss rate', '%', '零件費 補強板Loss rate', 'AIO', '3', false);
-- 補強板Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'accessories_loss_rate', '輔料Loss rate', '%', '零件費 輔料Loss rate', 'AIO', '3', false);
-- 輔料Loss rate
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'welding_assembly_seconds', '焊接式，每pin的組裝秒數', 'sec', '零件費 焊接式，每pin的組裝秒數', 'AIO', '4', false);
-- 焊接式，每pin的組裝秒數
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'puncture_assembly_seconds', '刺破式，每pin的組裝秒數', 'sec', '零件費 刺破式，每pin的組裝秒數', 'AIO', '15', false);
-- 刺破式，每個connector的組裝秒數
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'reinforcement_board_w_const', '補強板寬度寬放', 'mm', '零件費 補強板寬度寬放', 'AIO', '6', false);
-- 補強板寬度寬放
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_1', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '50', false);
-- 平貼長度係數 - 50
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_2', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '100', false);
-- 平貼長度係數 - 100
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_3', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '150', false);
-- 平貼長度係數 - 150
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_4', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '200', false);
-- 平貼長度係數 - 200
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_5', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '250', false);
-- 平貼長度係數 - 250
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_6', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '300', false);
-- 平貼長度係數 - 300
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_7', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '350', false);
-- 平貼長度係數 - 350
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_8', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '400', false);
-- 平貼長度係數 - 400
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_9', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '450', false);
-- 平貼長度係數 - 450
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_l_const', 'flat_paste_l_const_10', '平貼長度係數', 'mm', '零件費 平貼長度係數1', 'AIO', '500', false);
-- 平貼長度係數 - 500
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_1', '平貼 0 < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_1}} 組裝秒數', 'sec', '零件費 平貼組裝秒數1', 'AIO', '6', false);
-- 平貼 0 < 長度 <= 50 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_2', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_1}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_2}} 組裝秒數', 'sec', '零件費 平貼組裝秒數2', 'AIO', '6', false);
-- 平貼 50 < 長度 <= 100 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_3', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_2}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_3}} 組裝秒數', 'sec', '零件費 平貼組裝秒數3', 'AIO', '6', false);
-- 平貼 100 < 長度 <= 150 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_4', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_3}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_4}} 組裝秒數', 'sec', '零件費 平貼組裝秒數4', 'AIO', '6', false);
-- 平貼 150 < 長度 <= 200 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_5', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_4}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_5}} 組裝秒數', 'sec', '零件費 平貼組裝秒數5', 'AIO', '6', false);
-- 平貼 200 < 長度 <= 250 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_6', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_5}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_6}} 組裝秒數', 'sec', '零件費 平貼組裝秒數6', 'AIO', '6', false);
-- 平貼 250 < 長度 <= 300 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_7', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_6}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_7}} 組裝秒數', 'sec', '零件費 平貼組裝秒數7', 'AIO', '6', false);
-- 平貼 300 < 長度 <= 350 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_8', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_7}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_8}} 組裝秒數', 'sec', '零件費 平貼組裝秒數8', 'AIO', '9', false);
-- 平貼 350 < 長度 <= 400 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_9', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_8}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_9}} 組裝秒數', 'sec', '零件費 平貼組裝秒數9', 'AIO', '9', false);
-- 平貼 400 < 長度 <= 450 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_10', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_9}} < 長度 <= {{cable_ffc,cable_ffc_components,flat_paste_l_const_10}} 組裝秒數', 'sec', '零件費 平貼組裝秒數10', 'AIO', '9', false);
-- 平貼 450 < 長度 <= 500 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'flat_paste_assembly_seconds', 'flat_paste_assembly_seconds_11', '平貼 {{cable_ffc,cable_ffc_components,flat_paste_l_const_10}} < 長度 組裝秒數', 'sec', '零件費 平貼組裝秒數11', 'AIO', '12', false);
-- 平貼 500 < 長度 12s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_w_const', 'round_cover_w_const_1', '環包寬度係數', 'mm', '零件費 環包寬度係數1', 'AIO', '15', false);
-- 環包寬度係數 - 15
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_1', '環包長度係數', 'mm', '零件費 環包長度係數1', 'AIO', '50', false);
-- 環包長度係數 - 50
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_2', '環包長度係數', 'mm', '零件費 環包長度係數2', 'AIO', '100', false);
-- 環包長度係數 - 100
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_3', '環包長度係數', 'mm', '零件費 環包長度係數3', 'AIO', '150', false);
-- 環包長度係數 - 150
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_4', '環包長度係數', 'mm', '零件費 環包長度係數4', 'AIO', '200', false);
-- 環包長度係數 - 200
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_5', '環包長度係數', 'mm', '零件費 環包長度係數5', 'AIO', '250', false);
-- 環包長度係數 - 250
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_6', '環包長度係數', 'mm', '零件費 環包長度係數6', 'AIO', '300', false);
-- 環包長度係數 - 300
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_7', '環包長度係數', 'mm', '零件費 環包長度係數7', 'AIO', '350', false);
-- 環包長度係數 - 350
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_8', '環包長度係數', 'mm', '零件費 環包長度係數8', 'AIO', '400', false);
-- 環包長度係數 - 400
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_9', '環包長度係數', 'mm', '零件費 環包長度係數9', 'AIO', '450', false);
-- 環包長度係數 - 450
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_l_const', 'round_cover_l_const_10', '環包長度係數', 'mm', '零件費 環包長度係數10', 'AIO', '500', false);
-- 環包長度係數 - 500
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_w', 'round_cover_assembly_seconds_w_1', '環包 寬度 <= {{cable_ffc,cable_ffc_components,round_cover_w_const_1}} 組裝秒數', 'sec', '零件費 環包寬組裝秒數1', 'AIO', '6', false);
-- 環包 寬度 <= 15 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_1', '環包 0 < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_1}} 組裝秒數', 'sec', '零件費 環包長組裝秒數1', 'AIO', '6', false);
-- 環包 0 < 長度 <= 50 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_2', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_1}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_2}} 組裝秒數', 'sec', '零件費 環包長組裝秒數1', 'AIO', '6', false);
-- 環包 50 < 長度 <= 100 6s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_3', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_2}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_3}} 組裝秒數', 'sec', '零件費 環包長組裝秒數2', 'AIO', '9', false);
-- 環包 100 < 長度 <= 150 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_4', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_3}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_4}} 組裝秒數', 'sec', '零件費 環包長組裝秒數3', 'AIO', '9', false);
-- 環包 150 < 長度 <= 200 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_5', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_4}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_5}} 組裝秒數', 'sec', '零件費 環包長組裝秒數4', 'AIO', '9', false);
-- 環包 200 < 長度 <= 250 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_6', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_5}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_6}} 組裝秒數', 'sec', '零件費 環包長組裝秒數5', 'AIO', '9', false);
-- 環包 250 < 長度 <= 300 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_7', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_6}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_7}} 組裝秒數', 'sec', '零件費 環包長組裝秒數6', 'AIO', '9', false);
-- 環包 300 < 長度 <= 350 9s
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_8', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_7}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_8}} 組裝秒數', 'sec', '零件費 環包長組裝秒數7', 'AIO', '12', false);
-- 環包 350 < 長度 <= 400 12sec
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_9', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_8}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_9}} 組裝秒數', 'sec', '零件費 環包長組裝秒數8', 'AIO', '12', false);
-- 環包 400 < 長度 <= 450 12sec
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_10', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_9}} < 長度 <= {{cable_ffc,cable_ffc_components,round_cover_l_const_10}} 組裝秒數', 'sec', '零件費 環包長組裝秒數9', 'AIO', '12', false);
-- 環包 450 < 長度 <= 500 12sec
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'round_cover_assembly_seconds_l', 'round_cover_assembly_seconds_l_11', '環包 {{cable_ffc,cable_ffc_components,round_cover_l_const_10}} < 長度  組裝秒數', 'sec', '零件費 環包長組裝秒數10', 'AIO', '18', false);
-- 環包 500 < 長度 18sec
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'twine_l_const', 'twine_l_const_1', '纏繞長度係數', 'mm', '零件費 纏繞長度係數1', 'AIO', '100', false);
-- 纏繞長度係數 - 100
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'twine_gap_l_const', 'twine_gap_l_const_1', '纏繞長度區間係數', 'mm', '零件費 纏繞長度區間係數1', 'AIO', '100', false);
-- 纏繞長度區間係數 - 100
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'twine_assembly_seconds_l', 'twine_assembly_seconds_l_1', '纏繞 0 < 長度 <= {{cable_ffc,cable_ffc_components,twine_l_const_1}} 組裝秒數', 'sec', '零件費 纏繞長組裝秒數1', 'AIO', '14', false);
-- 纏繞 0 < 長度 <= 100 14sec
select formula.fn_common_paramter_add_with_sub_type('cable_ffc', 'cable_ffc_components', 'twine_assembly_seconds_l', 'twine_assembly_seconds_l_add', '纏繞 長度 > {{cable_ffc,cable_ffc_components,twine_l_const_1}} 時，從 {{cable_ffc,cable_ffc_components,twine_l_const_1}} + 1 開始，每{{cable_ffc,cable_ffc_components,twine_gap_l_const_1}}的區間增加的組裝秒數', 'sec', '零件費 纏繞長增加組裝秒數', 'AIO', '7', false);
-- 纏繞 長度>100時，從101開始，每50的區間增加的秒數 7sec
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'feeding_increase_size_l', '長度下料增加尺寸', 'mm', '零件費 長度下料增加尺寸', 'AIO', '6', false);
-- 長度下料增加尺寸 6mm
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'feeding_increase_size_w', '寬度下料增加尺寸', 'mm', '零件費 寬度下料增加尺寸', 'AIO', '6', false);
-- 寬度下料增加尺寸 6mm
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm1_machine_price', 'M1沖工費,材料面積<=25', 'USD', '零件費 M1機台沖工費(沖)', 'AIO', '0.0120', false);
-- M1沖工費,材料面積<=25 0.0120 usd
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm2_machine_price', 'M2沖工費,材料面積<=2500', 'USD', '零件費 M2機台沖工費(沖)', 'AIO', '0.0120', false);
-- M2沖工費,材料面積<=2500 0.0120 usd
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm3_machine_price', 'M3沖工費,材料面積<=5000', 'USD', '零件費 M3機台沖工費(沖)', 'AIO', '0.0130', false);
-- M3沖工費,材料面積<=5000 0.0130 usd
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm1_effective_area_L', 'M1,沖模有效長度', 'mm', '零件費 M1,沖模有效長度', 'AIO', '300', false);
-- M1,沖模有效長度 - 300
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm1_effective_area_W', 'M1,沖模有效寬度', 'mm', '零件費 M1,沖模有效寬度', 'AIO', '200', false);
-- M1,沖模有效寬度 - 200
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm2_effective_area_L', 'M2,沖模有效長度', 'mm', '零件費 M2,沖模有效長度', 'AIO', '600', false);
-- M2,沖模有效長度 - 600
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm2_effective_area_W', 'M2,沖模有效寬度', 'mm', '零件費 M2,沖模有效寬度', 'AIO', '400', false);
-- M2,沖模有效寬度 - 400
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm3_effective_area_L', 'M3,沖模有效長度', 'mm', '零件費 M3,沖模有效長度', 'AIO', '900', false);
-- M3,沖模有效長度 - 900
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'm3_effective_area_W', 'M3,沖模有效寬度', 'mm', '零件費 M3,沖模有效寬度', 'AIO', '500', false);
-- M3,沖模有效寬度 - 500
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'die_cut_profit', '沖切利潤', '%', '零件費 沖切利潤', 'AIO', '0.1', false);
-- 沖切利潤 - 10%
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'manual_fit_profit', '人工貼合利潤', '%', '零件費 人工貼合利潤', 'AIO', '0.1', false);
-- 人工貼合利潤 - 10%
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'manual_fit_assy_time', '人工貼合秒數 Assy Time', 'sec', '零件費 人工貼合秒數 Assy Time', 'AIO', '8', false);
-- Assy Time - 8 sec
select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_components', 'manual_fit_assembly_rate', '人工貼合組裝費率', 'sec', '零件費 人工貼合組裝費率', 'AIO', '0.0600', false);
-- 組裝費率 - 0.0600 USD/min

select formula.fn_common_paramter_add('cable_ffc', 'cable_ffc_management_and_profit', 'management_and_profit', '管銷利潤', '%', '零件費 管銷利潤', 'AIO', '0.1', false);
-- 管銷利潤 - 10 %