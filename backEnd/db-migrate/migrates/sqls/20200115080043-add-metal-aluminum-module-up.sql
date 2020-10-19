INSERT INTO formula.module_metal (module_name, product_type_id, remark, metal_type_id)
select 'Module 4', a.id, '', (select id from formula.metal_type where type_name = 'Aluminum')
from (select id from formula.product_type where type_name in ('DT', 'AIO')) a
ON CONFLICT ON CONSTRAINT module_metal_un DO update set disable_time = null;