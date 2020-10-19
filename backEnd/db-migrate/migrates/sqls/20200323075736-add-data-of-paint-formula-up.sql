--delete from formula.parameter_value pv where pv.parameter_id in (select id from formula.plastic_paint_formula);

DROP TABLE IF EXISTS  formula.plastic_paint_formula;
DROP TABLE IF EXISTS  formula.plastic_paint_formula_type;

CREATE TABLE if not exists formula.plastic_paint_formula_type (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	label varchar(200) NOT NULL,
	label_name varchar(200) NULL,
	field_type varchar(200) NULL,
	data_type varchar(200) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_paint_formula_type_pk PRIMARY KEY (id),
	CONSTRAINT plastic_paint_formula_type_un UNIQUE (label)
);

CREATE TABLE if not exists formula.plastic_paint_formula (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	type_id uuid NOT NULL,
	paint_id uuid NOT NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT plastic_paint_formula_pk PRIMARY KEY (id),
	CONSTRAINT plastic_paint_formula_un UNIQUE (type_id, paint_id),
	CONSTRAINT plastic_paint_formula_fk_paint FOREIGN KEY (paint_id) REFERENCES formula.plastic_paint_vendor_type_color_bottom_top(id),
	CONSTRAINT plastic_paint_formula_fk_type FOREIGN KEY (type_id) REFERENCES formula.plastic_paint_formula_type(id)
);

insert into formula.plastic_paint_formula_type (label, label_name, field_type, data_type) values
( 'main_unit_price',     '主劑單價(USD/Kg)',         'input', 'float'),
( 'main_amount',         '主劑比例',                 'input', 'float'),
( 'hardener_unit_price', '硬化劑/固化劑單價(USD/Kg)',  'input', 'float'),
( 'hardener_amount',     '硬化劑/固化劑比例',          'input', 'float'),
( 'solvent_unit_price',  '溶劑/稀釋劑單價(USD/Kg)',    'input', 'float'),
( 'solvent_amount',      '溶劑/稀釋劑比例',            'input', 'float') on conflict do nothing;

insert into formula.plastic_paint_formula (type_id, paint_id)
select type.id, paint.id
from formula.plastic_paint_formula_type type,
formula.plastic_paint_vendor_type_color_bottom_top paint;

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
-- 底漆 面漆
-- N/A 一般或霧面(黑/灰/銀) 彩色或高光(金/紅/藍)  Soft Touch  粉烤砂紋漆 粉烤平光漆 粉烤消光漆
-- Akzo 歐歷 東端 協承昌 新政豐 台贏 皇冠 PPG Others
insert into formula.tmp_plastic_paint_price (paint_type, bottom_top, color, vendor, main_am, main_un, hardener_am, hardener_un, solvent_am, solvent_un, total_price) values
--                                                                                   ('PU_painting', '底漆', 'N/A', '', '', '', '', '', '', '', ''),
('PU_painting', '底漆', 'N/A', 'Akzo', '100', '14.3077', '5', '20.00', '100', '4.6154', '9.7186'),
('PU_painting', '底漆', 'N/A', '歐歷', '5', '16.7692', '1', '18.4615', '3', '5.3846', '13.1624'),
('PU_painting', '底漆', 'N/A', '東端', '7', '10.7692', '1', '18.4616', '7', '3.8462', '8.0513'),
('PU_painting', '底漆', 'N/A', '協承昌', '5', '10.0000', '1', '13.8462', '6', '4.0000', '7.3205'),
('PU_painting', '底漆', 'N/A', '新政豐', '4', '10.9231', '1', '16.9231', '4', '3.3846', '8.2393'),
('PU_painting', '底漆', 'N/A', '台贏', '8', '11.8462', '1', '16.4369', '7', '3.8462', '8.6331'),
--('PU_painting', '底漆', 'N/A', '皇冠', '', '', '', '', '', '', ''),
--('PU_painting', '底漆', 'N/A', 'PPG', '', '', '', '', '', '', ''),
('PU_painting', '底漆', 'N/A', 'Others', '100', '25.0000', '0', '0', '0', '0', '25.0000'),
--                                                                                   ('Rubber_painting', '底漆', 'N/A', '', '', '', '', '', '', '', ''),
('Rubber_painting', '底漆', 'N/A', 'Akzo', '100', '34.4615', '30', '20.0000', '60', '4.6154', '22.7530'),
('Rubber_painting', '底漆', 'N/A', '歐歷', '10', '10.7692', '1', '18.4615', '15', '5.3846', '7.9586'),
('Rubber_painting', '底漆', 'N/A', '東端', '7', '11.5385', '1', '18.4615', '5', '3.8462', '9.1124'),
('Rubber_painting', '底漆', 'N/A', '協承昌', '5', '11.5385', '1', '13.8462', '6', '4.0000', '7.9615'),
('Rubber_painting', '底漆', 'N/A', '新政豐', '1', '9.8462', '0', '0', '1.3', '3.3846', '6.1940'),
('Rubber_painting', '底漆', 'N/A', '台贏', '8', '11.5385', '1', '16.4369', '4', '3.8462', '9.5484'),
('Rubber_painting', '底漆', 'N/A', '皇冠', '10', '9.6923', '1', '14.9231', '11', '4.1538', '7.1608'),
--('Rubber_painting', '底漆', 'N/A', 'PPG', '', '', '', '', '', '', ''),
('Rubber_painting', '底漆', 'N/A', 'Others', '100', '35.0000', '0', '0', '0', '0', '35.0000'),
--                                                                                   ('NCVM', '底漆', 'N/A', '', '', '', '', '', '', '', ''),
('NCVM', '底漆', 'N/A', 'Akzo', '100', '14.3077', '5', '20.0000', '100', '4.6154', '9.7186'),
('NCVM', '底漆', 'N/A', '歐歷', '5', '16.7692', '1', '18.4615', '3', '5.3846', '13.1624'),
--('NCVM', '底漆', 'N/A', '東端', '', '', '', '', '', '', ''),
--('NCVM', '底漆', 'N/A', '協承昌', '', '', '', '', '', '', ''),
--('NCVM', '底漆', 'N/A', '新政豐', '', '', '', '', '', '', ''),
--('NCVM', '底漆', 'N/A', '台贏', '', '', '', '', '', '', ''),
--('NCVM', '底漆', 'N/A', '皇冠', '', '', '', '', '', '', ''),
--('NCVM', '底漆', 'N/A', 'PPG', '', '', '', '', '', '', ''),
('NCVM', '底漆', 'N/A', 'Others', '100', '25.0000', '0', '0', '0', '0', '25.0000'),
--                                                                                   ('PU_painting', '面漆', 'N/A', '', '', '', '', '', '', '', ''),
('PU_painting', '面漆', 'N/A', 'Akzo', '100', '20.7692', '5', '20.00', '50', '4.6154', '15.5335'),
('PU_painting', '面漆', 'N/A', '歐歷', '5', '16.7692', '1', '18.4615', '3', '5.3846', '13.1624'),
('PU_painting', '面漆', 'N/A', '東端', '5', '11.3846', '1', '18.4615', '5', '3.8462', '8.6014'),
('PU_painting', '面漆', 'N/A', '協承昌', '5', '13.8462', '1', '13.8462', '6', '4.0000', '8.9231'),
('PU_painting', '面漆', 'N/A', '新政豐', '4', '10.9231', '1', '16.9231', '4', '3.3846', '8.2393'),
('PU_painting', '面漆', 'N/A', '台贏', '6', '13.0769', '1', '16.4369', '6', '3.8462', '9.0750'),
--('PU_painting', '面漆', 'N/A', '皇冠', '', '', '', '', '', '', ''),
--('PU_painting', '面漆', 'N/A', 'PPG', '', '', '', '', '', '', ''),
('PU_painting', '面漆', 'N/A', 'Others', '100', '30.0000', '0', '0', '0', '0', '30.0000'),
--                                                                                   ('Rubber_painting', '面漆', 'N/A', '', '', '', '', '', '', '', ''),
('Rubber_painting', '面漆', 'N/A', 'Akzo', '100', '34.4615', '30', '20.0000', '60', '4.6154', '22.7530'),
('Rubber_painting', '面漆', 'N/A', '歐歷', '6', '18.4615', '1', '21.5385', '2', '5.3846', '15.8974'),
('Rubber_painting', '面漆', 'N/A', '東端', '5', '18.4615', '1', '18.4615', '3', '3.8462', '13.5897'),
('Rubber_painting', '面漆', 'N/A', '協承昌', '6', '14.7692', '1', '15.3846', '6', '4.0000', '9.8462'),
('Rubber_painting', '面漆', 'N/A', '新政豐', '10', '16.1538', '1.5', '17.6923', '2', '3.3846', '14.4330'),
('Rubber_painting', '面漆', 'N/A', '台贏', '4', '24.4615', '1', '16.4369', '1.5', '3.8462', '18.4696'),
('Rubber_painting', '面漆', 'N/A', '皇冠', '5', '15.8462', '1', '20.6154', '1.5', '4.0000', '14.1128'),
--('Rubber_painting', '面漆', 'N/A', 'PPG', '', '', '', '', '', '', ''),
('Rubber_painting', '面漆', 'N/A', 'Others', '100', '35.0000', '0', '0', '0', '0', '35.0000'),
--                                                                                   ('NCVM', '面漆', 'N/A', '', '', '', '', '', '', '', ''),
('NCVM', '面漆', 'N/A', 'Akzo', '100', '20.7692', '5', '20.0000', '50', '4.6154', '15.5335'),
('NCVM', '面漆', 'N/A', '歐歷', '5', '16.7692', '1', '18.4615', '3', '5.3846', '13.1624'),
--('NCVM', '面漆', 'N/A', '東端', '', '', '', '', '', '', ''),
--('NCVM', '面漆', 'N/A', '協承昌', '', '', '', '', '', '', ''),
--('NCVM', '面漆', 'N/A', '新政豐', '', '', '', '', '', '', ''),
--('NCVM', '面漆', 'N/A', '台贏', '', '', '', '', '', '', ''),
--('NCVM', '面漆', 'N/A', '皇冠', '', '', '', '', '', '', ''),
--('NCVM', '面漆', 'N/A', 'PPG', '', '', '', '', '', '', ''),
('NCVM', '面漆', 'N/A', 'Others', '100', '30.0000', '0', '0', '0', '0', '30.0000'),
--                                                                                   ('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', '', '', '', '', '', '', '', ''),
('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', 'Akzo', '100', '13.0435', '0', '0', '30', '5.0725', '11.2040'),
('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', '歐歷', '100', '16.4014', '0', '0', '66', '4.5400', '11.6855'),
--('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', '東端', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', '協承昌', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', '新政豐', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', '台贏', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', '皇冠', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', 'PPG', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', 'Others', '', '', '', '', '', '', ''),
--                                                                                   ('UV_painting', '面漆', '彩色或高光(金/紅/藍)', '', '', '', '', '', '', '', ''),
('UV_painting', '面漆', '彩色或高光(金/紅/藍)', 'Akzo', '100', '28.9855', '0', '0', '30', '5.0725', '23.4671'),
('UV_painting', '面漆', '彩色或高光(金/紅/藍)', '歐歷', '100', '20.2899', '0', '0', '66', '4.5400', '14.0279'),
--('UV_painting', '面漆', '彩色或高光(金/紅/藍)', '東端', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '彩色或高光(金/紅/藍)', '協承昌', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '彩色或高光(金/紅/藍)', '新政豐', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '彩色或高光(金/紅/藍)', '台贏', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '彩色或高光(金/紅/藍)', '皇冠', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '彩色或高光(金/紅/藍)', 'PPG', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '彩色或高光(金/紅/藍)', 'Others', '', '', '', '', '', '', ''),
--                                                                                   ('UV_painting', '面漆', 'Soft Touch', '', '', '', '', '', '', '', ''),
('UV_painting', '面漆', 'Soft Touch', 'Akzo', '100', '21.7391', '0', '0', '30', '5.0725', '17.8930'),
('UV_painting', '面漆', 'Soft Touch', '歐歷', '100', '26.0870', '0', '0', '66', '4.5400', '17.5201'),
--('UV_painting', '面漆', 'Soft Touch', '東端', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'Soft Touch', '協承昌', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'Soft Touch', '新政豐', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'Soft Touch', '台贏', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'Soft Touch', '皇冠', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'Soft Touch', 'PPG', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'Soft Touch', 'Others', '', '', '', '', '', '', ''),
--                                                                                   ('UV_painting', '面漆', 'N/A', '', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', 'Akzo', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', '歐歷', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', '東端', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', '協承昌', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', '新政豐', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', '台贏', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', '皇冠', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', 'PPG', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', 'Others', '', '', '', '', '', '', ''),
--                                                                                   ('Powder coating', '面漆', '粉烤砂紋漆', '', '', '', '', '', '', '', ''),
('Powder coating', '面漆', '粉烤砂紋漆', 'Akzo', '100', '5.1500', '0', '0', '0', '0', '5.1500'),
--('Powder coating', '面漆', '粉烤砂紋漆', '歐歷', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤砂紋漆', '東端', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤砂紋漆', '協承昌', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤砂紋漆', '新政豐', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤砂紋漆', '台贏', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤砂紋漆', '皇冠', '', '', '', '', '', '', ''),
('Powder coating', '面漆', '粉烤砂紋漆', 'PPG', '100', '5.1500', '0', '0', '0', '0', '5.1500'),
--('Powder coating', '面漆', '粉烤砂紋漆', 'Others', '', '', '', '', '', '', ''),
--                                                                                   ('Powder coating', '面漆', '粉烤平光漆', '', '', '', '', '', '', '', ''),
('Powder coating', '面漆', '粉烤平光漆', 'Akzo', '100', '5.3500', '0', '0', '0', '0', '5.3500'),
--('Powder coating', '面漆', '粉烤平光漆', '歐歷', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤平光漆', '東端', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤平光漆', '協承昌', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤平光漆', '新政豐', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤平光漆', '台贏', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤平光漆', '皇冠', '', '', '', '', '', '', ''),
('Powder coating', '面漆', '粉烤平光漆', 'PPG', '100', '5.3500', '0', '0', '0', '0', '5.3500'),
--('Powder coating', '面漆', '粉烤平光漆', 'Others', '', '', '', '', '', '', ''),
--                                                                                   ('Powder coating', '面漆', '粉烤消光漆', '', '', '', '', '', '', '', ''),
('Powder coating', '面漆', '粉烤消光漆', 'Akzo', '100', '8.3100', '0', '0', '0', '0', '8.3100'),
--('Powder coating', '面漆', '粉烤消光漆', '歐歷', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤消光漆', '東端', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤消光漆', '協承昌', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤消光漆', '新政豐', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤消光漆', '台贏', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤消光漆', '皇冠', '', '', '', '', '', '', ''),
('Powder coating', '面漆', '粉烤消光漆', 'PPG', '100', '8.3100', '0', '0', '0', '0', '8.3100');
--('Powder coating', '面漆', '粉烤消光漆', 'Others', '', '', '', '', '', '', ''),
--                                                                                   ('Powder coating', '面漆', 'N/A', '', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', 'Akzo', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', '歐歷', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', '東端', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', '協承昌', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', '新政豐', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', '台贏', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', '皇冠', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', 'PPG', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', 'Others', '', '', '', '', '', '', ''),

delete from formula.parameter_value pv where pv.id in (
select id from (
select pv.id from formula.parameter_value pv
where pv.parameter_id in (select id from formula.v_plastic_painting_vendor_type_color_bottom_top)
) a
where a.id is not null);

insert into formula.plastic_paint_vendor_type_color_bottom_top (type_color_bottom_top_id, paint_vendor_id)
select a.id, b.id
from formula.plastic_paint_type_color_bottom_top a,
formula.plastic_paint_vendor b on conflict do nothing;

update formula.plastic_paint_vendor_type_color_bottom_top 
set disable_time = now()
where disable_time is null;

update formula.plastic_paint_vendor_type_color_bottom_top
set disable_time = null,
create_time = now()
where id in (
	select link.id
	from formula.tmp_plastic_paint_price tp
	left join formula.v_plastic_painting_vendor_type_color_bottom_top link
	on tp.paint_type = link.paint_type_name 
	and tp.color = link.paint_color_name 
	and tp.bottom_top = link.paint_bottom_top_name 
	and tp.vendor = link.paint_vendor_name
);

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
