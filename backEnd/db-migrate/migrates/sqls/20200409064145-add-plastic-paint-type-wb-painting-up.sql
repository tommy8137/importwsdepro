insert into formula.plastic_paint_type (type_name) values ('WB_paint水性漆');

insert into formula.plastic_paint_color (color_name ) values ('Normal');

insert into formula.plastic_paint_type_color (paint_color_id, paint_type_id)
select pcolor.id, ptype.id
from formula.plastic_paint_type ptype,
formula.plastic_paint_color pcolor
where ptype.type_name = 'WB_paint水性漆'
and pcolor.color_name = 'Normal';

insert into formula.plastic_paint_type_color_bottom_top (paint_type_color_id , paint_bottom_top_id )
select ptc.id, bt.id
from formula.plastic_paint_bottom_top bt,
formula.plastic_paint_type_color ptc
where bt.bottom_top_name not in ('N/A')
and ptc.paint_type_id  = (select id from formula.plastic_paint_type where type_name = 'WB_paint水性漆');

insert into formula.plastic_paint_vendor_type_color_bottom_top (paint_vendor_id, type_color_bottom_top_id)
select vendor.id, link.id
from formula.plastic_paint_vendor vendor,
formula.plastic_paint_type_color_bottom_top link
where vendor.vendor_name in ('Akzo', 'PPG')
and link.paint_type_color_id  = (
  select id from formula.plastic_paint_type_color where paint_type_id = (
    select id from formula.plastic_paint_type where type_name = 'WB_paint水性漆'
  )
);

insert into formula.plastic_paint_formula (type_id, paint_id)
select type.id, paint.id
from formula.plastic_paint_formula_type type,
formula.plastic_paint_vendor_type_color_bottom_top paint
where paint.type_color_bottom_top_id in (
  select link.id
  from formula.plastic_paint_type_color_bottom_top link
  where link.paint_type_color_id  = (
    select id from formula.plastic_paint_type_color where paint_type_id = (
      select id from formula.plastic_paint_type where type_name = 'WB_paint水性漆'
    )
  )
);

DROP TABLE IF EXISTS  formula.tmp_plastic_paint_price;
CREATE TABLE if not exists formula.tmp_plastic_paint_price (
	paint_type varchar(200),
	bottom_top varchar(200),
	color varchar(200),
	vendor varchar(200),
	main_un varchar (100),
	main_am varchar (100),
	hardener_un varchar (100),
	hardener_am varchar (100),
	solvent_un varchar (100),
	solvent_am varchar (100),
	total_price varchar (100)
);

insert into formula.tmp_plastic_paint_price (paint_type, bottom_top, color, vendor, main_am, main_un, hardener_am, hardener_un, solvent_am, solvent_un, total_price) values
('WB_paint水性漆', '底漆', 'Normal', 'Akzo', '100', '20.4400', '5', '26.9100', '10', '0', '18.9439'),
('WB_paint水性漆', '底漆', 'Normal', 'PPG', '100', '19.7800', '5', '29.4100', '0', '0', '20.2385'),
('WB_paint水性漆', '面漆', 'Normal', 'Akzo', '100', '26.7600', '0', '0', '5', '0', '25.4857'),
('WB_paint水性漆', '面漆', 'Normal', 'PPG', '100', '41.6900', '0', '0', '5', '1.0300', '39.7538');


insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select a.id, a.total_price, 'number', 'plastic_paint_vendor_type_color_bottom_top', b.id
from (select link.id, tp.* 
	from formula.tmp_plastic_paint_price tp
	left join formula.v_plastic_painting_vendor_type_color_bottom_top link
	on tp.paint_type = link.paint_type_name 
	and tp.color = link.paint_color_name 
	and tp.bottom_top = link.paint_bottom_top_name 
	and tp.vendor = link.paint_vendor_name
) a,
(select id from formula.schedule_date sd where sd.formula_type_id = (select id from formula.formula_type where "name" = 'housing_plastic') and sd.product_type_id is null ) b;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select pf.id, (
	case 
		when pt."label" = 'main_unit_price' then a.main_un
		when pt."label" = 'main_amount' then a.main_am
		when pt."label" = 'hardener_unit_price' then a.hardener_un
		when pt."label" = 'hardener_amount' then a.hardener_am
		when pt."label" = 'solvent_unit_price' then a.solvent_un
		when pt."label" = 'solvent_amount' then a.solvent_am
	else '0'
	end
)
, 'number', 'plastic_paint_formula', b.id
from (select id from formula.schedule_date sd where sd.formula_type_id = (select id from formula.formula_type where "name" = 'housing_plastic') and sd.product_type_id is null ) b,
(
	select link.id, tp.* 
	from formula.tmp_plastic_paint_price tp
	left join formula.v_plastic_painting_vendor_type_color_bottom_top link
	on tp.paint_type = link.paint_type_name 
	and tp.color = link.paint_color_name 
	and tp.bottom_top = link.paint_bottom_top_name 
	and tp.vendor = link.paint_vendor_name
) a
left join formula.plastic_paint_formula pf on pf.paint_id = a.id
left join formula.plastic_paint_formula_type pt on pt.id = pf.type_id;

DROP TABLE IF EXISTS  formula.tmp_plastic_paint_price;

update formula.plastic_paint_type_color 
set paint_color_id = (select id from formula.plastic_paint_color where color_name = 'Normal')
where paint_type_id in (select id from formula.plastic_paint_type where type_name in ('PU_painting', 'Rubber_painting'));

insert into formula.plastic_paint_type_color (paint_color_id, paint_type_id, disable_time)
select co.id, tp.id, now()
from formula.plastic_paint_color co,
formula.plastic_paint_type tp
where co.color_name = 'N/A'
and tp.type_name in ('PU_painting', 'Rubber_painting') on conflict do nothing;

CREATE OR REPLACE VIEW formula.v_plastic_painting_color
AS SELECT ppc.id,
    ppc.color_name AS name,
    pptc.disable_time,
    pptc.paint_type_id
   FROM formula.plastic_paint_color ppc,
    formula.plastic_paint_type_color pptc
WHERE pptc.paint_color_id = ppc.id;
-- Permissions
ALTER TABLE formula.v_plastic_painting_color OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_painting_color TO "swpc-user";
GRANT SELECT ON TABLE formula.v_plastic_painting_color TO emdm;