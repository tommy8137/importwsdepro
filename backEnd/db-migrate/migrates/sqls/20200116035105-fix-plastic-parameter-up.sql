update formula.common_parameter
set label_name = '埋釘loss_rate'
where (label='embed_nail_loss_rate') 
and product_type_id in (select id from formula.product_type pt where pt.type_name in ('NB', 'DT', 'AIO'));