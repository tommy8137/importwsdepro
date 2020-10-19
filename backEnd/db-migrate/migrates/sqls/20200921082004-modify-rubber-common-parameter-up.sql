-- temp_rubber_common_parameter
update formula.common_parameter set label_name = '成型費 Loss Rate' where part_type = 'me_others_rubber_forming' and "label" = 'forming_loss_rate';
update formula.parameter_value set value = '0' where parameter_id in 
(select id from formula.common_parameter cp 
where cp.part_type = 'me_others_rubber_second_process' 
and cp."label" in ('adhesive_loss_rate', 'stamping_loss_rate', 'printing_loss_rate', 'glue_loss_rate', 'burring_loss_rate'));

update formula.parameter_value set value = '0' where parameter_id in 
(select id from formula.common_parameter cp 
where cp.part_type = 'me_others_rubber_forming' 
and cp."label" = 'forming_loss_rate');