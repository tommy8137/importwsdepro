update formula.parameter_value as pv
set value = '0.3'
from (
select id from formula.plastic_emi_sputtering_link as emi_link
where emi_link.size_id in ( select id from formula.plastic_emi_sputtering_size as ess
where ess.size = 10
)
and emi_link.base_id in ( select id from formula.plastic_emi_sputtering_base as esb
where esb.emi_base = 'PC+GF>25%')
and emi_link.group_id in (select group_id from formula.plastic_emi_sputtering_site_group pesg 
 where pesg.site_id in (select site.id from formula.site  as site where site.site_name = 'WKS' or site.site_name = 'WZS')
and emi_link.product_type_id in (select id from formula.product_type pt where pt.type_name in ('DT', 'AIO')))
) as emi_parameter_id_list
where emi_parameter_id_list.id = pv.parameter_id;