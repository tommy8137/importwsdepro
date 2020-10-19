insert into formula.schedule_date("name" , formula_type_id, activate_date, product_type_id)	  
select 'thermal_module', (select id from formula.formula_type where "name" = 'thermal_module'), now(), (select id from formula.product_type where type_name = 'NB');

-- baseline
drop table if exists formula.tmp_thermal_fan_baseline_price;
CREATE TABLE if not exists formula.tmp_thermal_fan_baseline_price (
	fan_size varchar(200),
	property_name varchar(200),
	price varchar(200)
);
insert into formula.tmp_thermal_fan_baseline_price(fan_size, price)values
('60x60x3.0',	'7.00'),
('60x60x3.5',	'6.50'),
('60x60x4.0',	'3.70'),
('60x60x4.5',	'3.50'),
('60x60x5.0',	'2.00'),
('60x60x5.5',	'1.80'),
('60x60x6.0',	'1.55'),
('60x60x6.5',	'1.50'),
('60x60x7.0',	'1.45'),
('60x60x7.5',	'1.45'),
('80x80x8.0',	'1.45'),
('80x80x8.5',	'1.45'),
('80x80x9.0',	'1.45'),
('80x80x9.5',	'1.45'),
('80x80x10',	'1.7'),
('80x80x10.5',	'1.7'),
('80x80x11',	'1.7'),
('80x80x11.5',	'1.7'),
('80x80x12',	'1.7')
on conflict do nothing;

insert into formula.parameter_value(parameter_id, value, value_type, activate_date_id, source_table)
select link.baseline, link.price, 'number', sd.id, 'thermal_fan'
from (
	select fa.baseline, tmp.price
	from formula.thermal_fan fa
	join formula.tmp_thermal_fan_baseline_price tmp on fa.fan_size = tmp.fan_size
) link,
(
	select MAX(id) as id
	from formula.schedule_date
	where formula_type_id = (select id from formula.formula_type where "name" = 'thermal_module')
) sd
on conflict do nothing;

drop table if exists formula.tmp_thermal_fan_baseline_price;

-- bearing
drop table if exists formula.tmp_thermal_fan_bearing_price;
CREATE TABLE if not exists formula.tmp_thermal_fan_bearing_price (
	fan_size varchar(200),
	property_name varchar(200),
	price varchar(200)
);
insert into formula.tmp_thermal_fan_bearing_price(fan_size, price)values
('60x60x3.0',  '0'),
('60x60x3.5',  '0'),
('60x60x4.0',  '0'),
('60x60x4.5',  '0'),
('60x60x5.0',  '0.25'),
('60x60x5.5',  '0.25'),
('60x60x6.0',  '0.2'),
('60x60x6.5',  '0.2'),
('60x60x7.0',  '0.2'),
('60x60x7.5',  '0.2'),
('80x80x8.0',  '0.2'),
('80x80x8.5',  '0.2'),
('80x80x9.0',  '0.2'),
('80x80x9.5',  '0.2'),
('80x80x10',   '0.2'),
('80x80x10.5', '0.2'),
('80x80x11',   '0.2'),
('80x80x11.5', '0.2'),
('80x80x12',   '0.2')
on conflict do nothing;

insert into formula.parameter_value(parameter_id, value, value_type, activate_date_id, source_table)
select link.id, link.price, 'number', sd.id, 'thermal_fan_fan_bearing'
from (
	select be.id, tmp.price
	from formula.thermal_fan fa
	join formula.tmp_thermal_fan_bearing_price tmp on fa.fan_size = tmp.fan_size
	join formula.thermal_fan_fan_bearing be on be.bearing_id = (select id from formula.thermal_fan_bearing where bearing_name = 'FDB+金屬') and be.fan_id = fa.id
) link,
(
	select MAX(id) as id
	from formula.schedule_date
	where formula_type_id = (select id from formula.formula_type where "name" = 'thermal_module')
) sd
on conflict do nothing;

drop table if exists formula.tmp_thermal_fan_bearing_price;

-- material
drop table if exists formula.tmp_thermal_fan_fan_material_price;
CREATE TABLE if not exists formula.tmp_thermal_fan_fan_material_price (
	fan_size varchar(200),
	material_name varchar(200),
	price varchar(200)
);
insert into formula.tmp_thermal_fan_fan_material_price(fan_size, material_name, price)values
('60x60x3.0', 'LCP(0.2~0.3)', '0'),
('60x60x3.5', 'LCP(0.2~0.3)', '0'),
('60x60x4.0', 'LCP(0.2~0.3)', '0'),
('60x60x4.5', 'LCP(0.2~0.3)', '0'),
('60x60x5.0', 'LCP(0.2~0.3)', '0.075'),
('60x60x5.5', 'LCP(0.2~0.3)', '0.075'),
('60x60x6.0', 'LCP(0.2~0.3)', '0.075'),
('60x60x6.5', 'LCP(0.2~0.3)', '0.075'),
('60x60x7.0', 'LCP(0.2~0.3)', '0.075'),
('60x60x7.5', 'LCP(0.2~0.3)', '0.075'),
('80x80x8.0', 'LCP(0.2~0.3)', '0.075'),
('80x80x8.5', 'LCP(0.2~0.3)', '0.075'),
('80x80x9.0', 'LCP(0.2~0.3)', '0.075'),
('80x80x9.5', 'LCP(0.2~0.3)', '0.075'),
('80x80x10',  'LCP(0.2~0.3)', '0.075'),
('80x80x10.5', 'LCP(0.2~0.3)', '0.075'),
('80x80x11',   'LCP(0.2~0.3)', '0.075'),
('80x80x11.5', 'LCP(0.2~0.3)', '0.075'),
('80x80x12',   'LCP(0.2~0.3)', '0.075')
on conflict do nothing;

insert into formula.parameter_value(parameter_id, value, value_type, activate_date_id, source_table)
select link.id, tmp.price, 'number', sd.id, 'thermal_fan_fan_material'
from (
	select  fm.id, fan.fan_size, ma.material_name
	from formula.thermal_fan_fan_material fm
	join formula.thermal_fan fan on fan.id = fm.fan_id 
	join formula.thermal_fan_material ma on ma.id = fm.material_id
) link,
formula.tmp_thermal_fan_fan_material_price tmp,
(
	select MAX(id) as id
	from formula.schedule_date
	where formula_type_id = (select id from formula.formula_type where "name" = 'thermal_module')
) sd
where link.fan_size = tmp.fan_size
and link.material_name = tmp.material_name
on conflict do nothing;

drop table if exists formula.tmp_thermal_fan_fan_material_price;

-- magnet

drop table if exists formula.tmp_thermal_fan_magnet_price;
CREATE TABLE if not exists formula.tmp_thermal_fan_magnet_price (
	fan_size varchar(200),
	property_name varchar(200),
	price varchar(200)
);
insert into formula.tmp_thermal_fan_magnet_price(fan_size, price)values
('60x60x3.0',  '0'),
('60x60x3.5',  '0'),
('60x60x4.0',  '0'),
('60x60x4.5',  '0'),
('60x60x5.0',  '0.075'),
('60x60x5.5',  '0.075'),
('60x60x6.0',  '0.075'),
('60x60x6.5',  '0.075'),
('60x60x7.0',  '0.075'),
('60x60x7.5',  '0.075'),
('80x80x8.0',  '0.075'),
('80x80x8.5',  '0.075'),
('80x80x9.0',  '0.075'),
('80x80x9.5',  '0.075'),
('80x80x10',   '0.075'),
('80x80x10.5', '0.075'),
('80x80x11',   '0.075'),
('80x80x11.5', '0.075'),
('80x80x12',   '0.075')
on conflict do nothing;

insert into formula.parameter_value(parameter_id, value, value_type, activate_date_id, source_table)
select link.id, link.price, 'number', sd.id, 'thermal_fan_fan_magnet'
from (
	select be.id, tmp.price
	from formula.thermal_fan fa
	join formula.tmp_thermal_fan_magnet_price tmp on fa.fan_size = tmp.fan_size
	join formula.thermal_fan_fan_magnet be on be.magnet_id = (select id from formula.thermal_fan_magnet where magnet_name = 'MQ') and be.fan_id = fa.id
) link,
(
	select MAX(id) as id
	from formula.schedule_date
	where formula_type_id = (select id from formula.formula_type where "name" = 'thermal_module')
) sd
on conflict do nothing;

drop table if exists formula.tmp_thermal_fan_magnet_price;

-- motor
drop table if exists formula.tmp_thermal_fan_motor_price;
CREATE TABLE if not exists formula.tmp_thermal_fan_motor_price (
	fan_size varchar(200),
	property_name varchar(200),
	price varchar(200)
);
insert into formula.tmp_thermal_fan_motor_price(fan_size, price)values
('60x60x3.0',  '0'),
('60x60x3.5',  '0'),
('60x60x4.0',  '0'),
('60x60x4.5',  '0'),
('60x60x5.0',  '0.2'),
('60x60x5.5',  '0.2'),
('60x60x6.0',  '0.2'),
('60x60x6.5',  '0.2'),
('60x60x7.0',  '0.2'),
('60x60x7.5',  '0.2'),
('80x80x8.0',  '0.2'),
('80x80x8.5',  '0.2'),
('80x80x9.0',  '0.2'),
('80x80x9.5',  '0.2'),
('80x80x10',   '0.2'),
('80x80x10.5', '0.2'),
('80x80x11',   '0.2'),
('80x80x11.5', '0.2'),
('80x80x12',   '0.2')
on conflict do nothing;

insert into formula.parameter_value(parameter_id, value, value_type, activate_date_id, source_table)
select link.id, link.price, 'number', sd.id, 'thermal_fan_fan_motor'
from (
	select be.id, tmp.price
	from formula.thermal_fan fa
	join formula.tmp_thermal_fan_motor_price tmp on fa.fan_size = tmp.fan_size
	join formula.thermal_fan_fan_motor be on be.motor_id = (select id from formula.thermal_fan_motor where motor_name = '三相') and be.fan_id = fa.id
) link,
(
	select MAX(id) as id
	from formula.schedule_date
	where formula_type_id = (select id from formula.formula_type where "name" = 'thermal_module')
) sd
on conflict do nothing;

drop table if exists formula.tmp_thermal_fan_motor_price;

-- insert other values
insert into formula.parameter_value(id, parameter_id, value, value_type, source_table, create_time, activate_date_id)
select nextval('formula.parameter_value_id_seq'), pv.parameter_id, pv.value, pv.value_type, pv.source_table, now() as create_time, next_id.id as activate_date_id
FROM formula.parameter_value pv,
(
	select MAX(id) as id
	from formula.schedule_date
	where formula_type_id = (select id from formula.formula_type where "name" = 'thermal_module')
) next_id
WHERE pv.activate_date_id = (
	select MIN(last_two_id.id) from (
		select id
		from formula.schedule_date
		where formula_type_id = (select id from formula.formula_type where "name" = 'thermal_module')
		order by id desc
		limit 2
	) last_two_id
)
on conflict do nothing;

