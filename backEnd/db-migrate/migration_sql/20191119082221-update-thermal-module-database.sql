update formula.parameter_value set value=0.03 where parameter_id=(select id from formula.common_parameter where part_type='thermal_module_components' and label='fin_material_loss_rate');
update formula.parameter_value set value=0.03 where parameter_id=(select id from formula.common_parameter where part_type='thermal_module_components' and label='fin_ultrasonic_cleaning_lost_rate');
update formula.parameter_value set value=0.03 where parameter_id=(select id from formula.common_parameter where part_type='thermal_module_components' and label='fin_nickelplated_loss_rate');

update formula.common_parameter set sub_type='sponge' where part_type='thermal_module_components' and label='sponge_components_total_loss_rate';

