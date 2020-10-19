update wiprocurement.bom_item bi
set system_cost = 0
where bi.id in (
	select 
		bpv.bom_item_id
	from wiprocurement.bom_partlist_value bpv
	join wiprocurement.bom_item bi on bpv.bom_item_id = bi.id
	where bpv.partlist_value::text not like '%Other_Fill_ME_Remark%'
	and bi.system_cost is null
);