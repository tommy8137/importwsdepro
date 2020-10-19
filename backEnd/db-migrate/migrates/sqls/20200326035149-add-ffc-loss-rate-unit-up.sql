update formula.common_parameter cp
set unit = '%'
where cp.part_type = 'cable_ffc_components'
and cp."label" in ('double_sided_tape_loss_rate', 'kapton_loss_rate');