delete from formula.parameter_value where parameter_id=(select id from formula.common_parameter where part_type='housing_plastic_paint' and label='paint_side_LH_area_L');
delete from formula.parameter_value where parameter_id=(select id from formula.common_parameter where part_type='housing_plastic_paint' and label='paint_side_LH_area_W');
delete from formula.parameter_value where parameter_id=(select id from formula.common_parameter where part_type='housing_plastic_paint' and label='paint_side_WH_area_L');
delete from formula.parameter_value where parameter_id=(select id from formula.common_parameter where part_type='housing_plastic_paint' and label='paint_side_WH_area_W');

delete from formula.common_parameter where part_type='housing_plastic_paint' and label='paint_side_LH_area_L';
delete from formula.common_parameter where part_type='housing_plastic_paint' and label='paint_side_LH_area_W';
delete from formula.common_parameter where part_type='housing_plastic_paint' and label='paint_side_WH_area_L';
delete from formula.common_parameter where part_type='housing_plastic_paint' and label='paint_side_WH_area_W';