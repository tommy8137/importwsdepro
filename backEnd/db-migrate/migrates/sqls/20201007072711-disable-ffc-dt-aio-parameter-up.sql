update formula.common_parameter
set disable_time = now()
where formula_type_id = (select id from formula.formula_type ft where ft."name" = 'cable_ffc')
and product_type_id != (select id from formula.product_type pt where pt.type_name = 'NB');

update formula.common_parameter_expose
set disable_time = now()
from formula.common_parameter cp
where cp.id = parameter_id
and cp.disable_time is not null;