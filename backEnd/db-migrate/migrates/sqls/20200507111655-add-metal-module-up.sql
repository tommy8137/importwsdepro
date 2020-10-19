insert into formula.module_metal (module_name, product_type_id, metal_type_id)
select 'Module 5', pt.id, mt.id
from formula.product_type pt,
formula.metal_type mt
where pt.type_name ='VoIP'
and mt.type_name = 'Metal' on conflict do nothing ;

insert into formula.module_metal (module_name, product_type_id, metal_type_id)
select 'Module 6', pt.id, mt.id
from formula.product_type pt,
formula.metal_type mt
where pt.type_name ='Server'
and mt.type_name = 'Metal' on conflict do nothing ;

insert into formula.module_metal (module_name, product_type_id, metal_type_id)
select 'Module 4', pt.id, mt.id
from formula.product_type pt,
formula.metal_type mt
where pt.type_name ='VoIP'
and mt.type_name = 'Aluminum' on conflict do nothing ;

insert into formula.module_metal (module_name, product_type_id, metal_type_id)
select 'Module 4', pt.id, mt.id
from formula.product_type pt,
formula.metal_type mt
where pt.type_name ='Server'
and mt.type_name = 'Aluminum' on conflict do nothing ;

insert into formula.module_machine_metal (module_metal_id, machine_metal_id)
select md.id, mc.id
from formula.module_metal md,
formula.machine_metal mc
where md.module_name  in ('Module 5', 'Module 6')
and md.product_type_id in (select id from formula.product_type where type_name in ('Server', 'VoIP')) on conflict do nothing ;

-- 所有鋁 共用NB 的 module4 價格
delete from formula.module_machine_metal 
where id in (
  select link.id
  from formula.module_machine_metal link
  left join formula.module_metal mo on mo.id = link.module_metal_id
  left join formula.machine_metal mc on mc.id = link.machine_metal_id
  left join formula.product_type pt on pt.id = mo.product_type_id
  where mo.module_name = 'Module 4'
  and pt.type_name != 'NB'
);


insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp.dt_id, cp.activate_date_id, cp.value, cp.value_type, cp.source_table
from (
  select link.id, mo.module_name, mc.ton, pv.value, pv.value_type , pv.activate_date_id, pv.source_table, cp_dt.id as dt_id
  from formula.module_machine_metal link
  left join formula.module_metal mo on mo.id = link.module_metal_id
  left join formula.machine_metal mc on mc.id = link.machine_metal_id
  right join formula.parameter_value pv on pv.parameter_id = link.id
  left join (
    select link2.id, mo2.module_name, mc2.ton
    from formula.module_machine_metal link2
    left join formula.module_metal mo2 on mo2.id = link2.module_metal_id
    left join formula.machine_metal mc2 on mc2.id = link2.machine_metal_id 
    where mo2.module_name = 'Module 5'
  ) cp_dt on cp_dt.ton = mc.ton
  where mo.module_name = 'Module 2'
) cp  on conflict do nothing ;

insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp.dt_id, cp.activate_date_id, cp.value, cp.value_type, cp.source_table
from (
  select link.id, mo.module_name, mc.ton, pv.value, pv.value_type , pv.activate_date_id, pv.source_table, cp_dt.id as dt_id
  from formula.module_machine_metal link
  left join formula.module_metal mo on mo.id = link.module_metal_id
  left join formula.machine_metal mc on mc.id = link.machine_metal_id
  right join formula.parameter_value pv on pv.parameter_id = link.id
  left join (
    select link2.id, mo2.module_name, mc2.ton
    from formula.module_machine_metal link2
    left join formula.module_metal mo2 on mo2.id = link2.module_metal_id
    left join formula.machine_metal mc2 on mc2.id = link2.machine_metal_id 
    where mo2.module_name = 'Module 6'
  ) cp_dt on cp_dt.ton = mc.ton
  where mo.module_name = 'Module 2'
) cp on conflict do nothing ;

