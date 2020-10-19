--vender
insert into formula.plastic_paint_vendor (vendor_name) values ('PPG');
-- color
insert into formula.plastic_paint_color (color_name) values ('粉烤砂紋漆'), ('粉烤平光漆'), ('粉烤消光漆');
-- type
insert into formula.plastic_paint_type (type_name) values ('Powder coating');
-- type + color
insert into formula.plastic_paint_type_color (paint_color_id, paint_type_id)
select pc.id, (select id from formula.plastic_paint_type where type_name = 'Powder coating')
from formula.plastic_paint_color pc where color_name in ('粉烤砂紋漆', '粉烤平光漆', '粉烤消光漆', 'N/A') on conflict do nothing;
-- type + color + bottom_top
insert into formula.plastic_paint_type_color_bottom_top (paint_type_color_id, paint_bottom_top_id)
select ptc.id, (select id from formula.plastic_paint_bottom_top ppbt where ppbt.bottom_top_name = '面漆')
from formula.plastic_paint_type_color ptc
left join formula.plastic_paint_type pt on ptc.paint_type_id = pt.id
where pt.type_name = 'Powder coating' on conflict do nothing;
-- type_color_bottom_top + vendor
insert into formula.plastic_paint_vendor_type_color_bottom_top (type_color_bottom_top_id, paint_vendor_id)
select ptcb.id, pv.id
from formula.plastic_paint_type_color_bottom_top ptcb
left join formula.plastic_paint_type_color ptc on ptc.id = ptcb.paint_type_color_id
left join formula.plastic_paint_type pt on ptc.paint_type_id = pt.id,
formula.plastic_paint_vendor pv
where pv.vendor_name in ('Akzo', 'PPG')
and pt.type_name = 'Powder coating' on conflict do nothing;

-- values
insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select a.id, b.id, '5.35', 'number', 'plastic_paint_vendor_type_color_bottom_top'
from (select pvtcb.id from formula.plastic_paint_vendor_type_color_bottom_top pvtcb
	left join formula.plastic_paint_type_color_bottom_top ptcb on pvtcb.type_color_bottom_top_id = ptcb.id
	left join formula.plastic_paint_type_color ptc on ptc.id = ptcb.paint_type_color_id
	left join formula.plastic_paint_color pc on ptc.paint_color_id = pc.id
	left join formula.plastic_paint_vendor pven on pvtcb.paint_vendor_id = pven.id
	where pc.color_name in ('粉烤砂紋漆')
	and pven.vendor_name in ('Akzo')
) a,
(select id from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and sd.product_type_id is null ) b;

insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select a.id, b.id, '5.15', 'number', 'plastic_paint_vendor_type_color_bottom_top'
from (select pvtcb.id from formula.plastic_paint_vendor_type_color_bottom_top pvtcb
	left join formula.plastic_paint_type_color_bottom_top ptcb on pvtcb.type_color_bottom_top_id = ptcb.id
	left join formula.plastic_paint_type_color ptc on ptc.id = ptcb.paint_type_color_id
	left join formula.plastic_paint_color pc on ptc.paint_color_id = pc.id
	left join formula.plastic_paint_vendor pven on pvtcb.paint_vendor_id = pven.id
	where pc.color_name in ('粉烤砂紋漆')
	and pven.vendor_name in ('PPG')
) a,
(select id from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and sd.product_type_id is null ) b;

insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select a.id, b.id, '8.31', 'number', 'plastic_paint_vendor_type_color_bottom_top'
from (select pvtcb.id from formula.plastic_paint_vendor_type_color_bottom_top pvtcb
	left join formula.plastic_paint_type_color_bottom_top ptcb on pvtcb.type_color_bottom_top_id = ptcb.id
	left join formula.plastic_paint_type_color ptc on ptc.id = ptcb.paint_type_color_id
	left join formula.plastic_paint_color pc on ptc.paint_color_id = pc.id
	left join formula.plastic_paint_vendor pven on pvtcb.paint_vendor_id = pven.id
	where pc.color_name in ('粉烤消光漆')
	and pven.vendor_name in ('Akzo', 'PPG')
) a,
(select id from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_plastic') and sd.product_type_id is null ) b;