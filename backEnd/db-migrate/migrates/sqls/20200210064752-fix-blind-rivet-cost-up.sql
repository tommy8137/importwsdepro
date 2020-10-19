-- 拉鉚釘單價 => 單點鉚釘單價
update formula.common_parameter
set label_name = '單點鉚釘單價'
where (label='single_rivet_cost') 
and product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO'));

-- CNC(公模面) 調整加工速率之比例(變快) => disable
update formula.common_parameter cp 
set disable_time = now()
where cp."label" = 'cnc_core_side_cycle_time'
and cp.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO'));