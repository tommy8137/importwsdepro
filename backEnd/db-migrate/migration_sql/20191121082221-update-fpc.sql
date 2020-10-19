 update formula.parameter_value set value=0.045 where  parameter_id = (
select id from formula.common_parameter where part_type='cable_fpc_auxiliary_materials' and label='assembly_cost');