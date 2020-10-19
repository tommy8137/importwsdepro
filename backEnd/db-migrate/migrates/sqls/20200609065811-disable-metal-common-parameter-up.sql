CREATE OR REPLACE FUNCTION formula.fn_common_paramter_disable
(pa_formula_type character varying, pa_part_type character varying, pa_label character varying, pa_product_type_name character varying)
 RETURNS integer as $body$
 declare
  update_count integer;
begin 
	update formula.common_parameter set disable_time = now() where formula_type_id = (select id from formula.formula_type where "name"= pa_formula_type) 
	and part_type = pa_part_type and pa_label = "label" and product_type_id in (select id from formula.product_type where type_name = any(string_to_array(pa_product_type_name, ',')));
	get diagnostics update_count = ROW_COUNT;
	return update_count;
end;
$body$ LANGUAGE plpgsql;

-- NB

select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_stamping','riveting die_loss_rate', 'NB');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','cnc_5_axis_core_side_cost', 'NB');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','two_anodization_treatment_qty', 'NB');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','anode_treatment_qty', 'NB');

-- DT AIO Server VoIP

select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','two_anodization_treatment_qty', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','ultrasonic_cleaning_cost', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_stamping','riveting die_loss_rate', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_painting','paint_piece_number_at_a_time', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_painting','paint_piece_number_at_a_time', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_stamping','riveting_die_fcst_allowance', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_stamping','stage_stamping_convex_hull_fcst_allowance', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_material','material_AL_loss_rate', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','anode_point_cutting_cost', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','anode_point_cutting_loss_rate', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','anode_treatment_qty', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','cnc_PL_cost', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','cnc_PL_loss_rate', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','drilling_hole_const', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','drilling_hole_cost', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','drilling_hole_loss_rate', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','grinding_manual_cost', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','grinding_manual_loss_rate', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','grinding_manual_cost', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','drilling_hole_loss_rate', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','grinding_manual_cost', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','grinding_manual_loss_rate', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','laser_engraving_icon_cost', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','laser_engraving_icon_loss_rate', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','multi_rivet_cost', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','multi_rivet_loss_rate', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','multi_spot_welding_cost', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','multi_spot_welding_loss_rate', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','multi_tapping_cost', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','multi_tapping_loss_rate', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','paint_area_const', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','cnc_core_side_cycle_time', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','paint_black_cost', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','paint_black_cycle_ time_area', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','paint_black_cycle_ time_sec', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','paint_black_loss_rate', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','paint_cost_const', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','paint_loss_rate', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','stage_stamping_convex_hull_loss_rate', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','cnc_5_axis_core_side_cost', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','cnc_PL_cycle_time_numerator', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','drill_cuttin_cycle_time_numerator', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','grinding_auto_speed', 'DT,AIO,Server,VoIP');
select formula.fn_common_paramter_disable('housing_metal', 'housing_metal_secondary_processing','grinding_manual_speed', 'DT,AIO,Server,VoIP');
