DELETE FROM wiprocurement.bom_partlist_config bpc
where bpc.id = (
	select id from  wiprocurement.bom_partlist_config bpc
	where bpc.parts_ctgy_2 = (
	select p2.id from formula.part_category_2 p2
	left join formula.part_category_1 p1 on (p1.id = p2.part_category_1_id  and p1.category_name = 'ME_others')
	where p2.category_name = 'Lens')
);
