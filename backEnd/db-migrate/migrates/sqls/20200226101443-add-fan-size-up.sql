CREATE TABLE formula.tmp_thermal_fan (
   fan_size VARCHAR (200),
   base_line_price VARCHAR (200),
   bearing_diff VARCHAR (200),-- sleeve+塑膠 新size 補0
   bearing_diff_price VARCHAR (200),
   material_diff VARCHAR (200),-- PBT 新size 補0
   material_diff_price VARCHAR (200),
   magnet_diff VARCHAR (200),-- 橡膠 新size 補0
   magnet_diff_price VARCHAR (200),
   motor_diff VARCHAR (200),-- 單相 新size 補0
   motor_diff_price VARCHAR (200)
);


insert into formula.tmp_thermal_fan (fan_size, base_line_price, bearing_diff, bearing_diff_price, material_diff, material_diff_price, magnet_diff, magnet_diff_price, motor_diff, motor_diff_price) values
('60x60x3.0', '7.00', 'FDB+金屬', '0',    'LCP', '0'  , 'MQ', '0',   '三相', '0'),
('80x80x8.0', '1.55', 'FDB+金屬', '0.25', 'LCP', '0.1', 'MQ', '0.1', '三相', '0.2'),
('80x80x8.5', '1.55', 'FDB+金屬', '0.25', 'LCP', '0.1', 'MQ', '0.1', '三相', '0.2'),
('80x80x9.0', '1.55', 'FDB+金屬', '0.25', 'LCP', '0.1', 'MQ', '0.1', '三相', '0.2'),
('80x80x9.5', '1.55', 'FDB+金屬', '0.25', 'LCP', '0.1', 'MQ', '0.1', '三相', '0.2'),
('80x80x10',  '1.8',  'FDB+金屬', '0.25', 'LCP', '0.1', 'MQ', '0.1', '三相', '0.2'),
('80x80x10.5','1.8',  'FDB+金屬', '0.25', 'LCP', '0.1', 'MQ', '0.1', '三相', '0.2'),
('80x80x11',  '1.8',  'FDB+金屬', '0.25', 'LCP', '0.1', 'MQ', '0.1', '三相', '0.2'),
('80x80x11.5','1.8',  'FDB+金屬', '0.25', 'LCP', '0.1', 'MQ', '0.1', '三相', '0.2'),
('80x80x12',  '1.8',  'FDB+金屬', '0.25', 'LCP', '0.1', 'MQ', '0.1', '三相', '0.2');

-- add fan size
insert into formula.thermal_fan (fan_size)
select fan_size from formula.tmp_thermal_fan on conflict do nothing;

-- add baseline price
insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select tf.baseline , tmptf.base_line_price, 'number', 'thermal_fan', sd.id
from formula.tmp_thermal_fan tmptf
left join formula.thermal_fan tf on tf.fan_size = tmptf.fan_size,
formula.schedule_date sd where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'thermal_module') on conflict do nothing;

-- add thermal_fan_fan_bearing
insert into formula.thermal_fan_fan_bearing (fan_id, bearing_id)
select tf.id, tfb.id 
from formula.tmp_thermal_fan tmptf
left join formula.thermal_fan tf on tf.fan_size = tmptf.fan_size,
formula.thermal_fan_bearing tfb on conflict do nothing;

-- add thermal_fan_fan_bearing price
insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select tffb.id , tmptf.bearing_diff_price, 'number', 'thermal_fan_fan_bearing', sd.id
from formula.tmp_thermal_fan tmptf
left join formula.thermal_fan tf on tf.fan_size = tmptf.fan_size
left join formula.thermal_fan_bearing tfb on tfb.bearing_name = tmptf.bearing_diff
left join formula.thermal_fan_fan_bearing tffb on tffb.bearing_id = tfb.id and tffb.fan_id = tf.id,
formula.schedule_date sd where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'thermal_module') on conflict do nothing;

-- add thermal_fan_fan_bearing price 0
insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select tffb.id , '0', 'number', 'thermal_fan_fan_bearing', sd.id
from formula.tmp_thermal_fan tmptf
left join formula.thermal_fan tf on tf.fan_size = tmptf.fan_size
left join formula.thermal_fan_bearing tfb on tfb.bearing_name = 'Sleeve+塑膠'
left join formula.thermal_fan_fan_bearing tffb on tffb.bearing_id = tfb.id and tffb.fan_id = tf.id,
formula.schedule_date sd where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'thermal_module') on conflict do nothing;

-- add thermal_fan_fan_material
insert into formula.thermal_fan_fan_material (fan_id, material_id)
select tf.id, tfm.id 
from formula.tmp_thermal_fan tmptf
left join formula.thermal_fan tf on tf.fan_size = tmptf.fan_size,
formula.thermal_fan_material tfm on conflict do nothing;

-- add thermal_fan_fan_material price
insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select tffm.id , tmptf.material_diff_price, 'number', 'thermal_fan_fan_material', sd.id
from formula.tmp_thermal_fan tmptf
left join formula.thermal_fan tf on tf.fan_size = tmptf.fan_size
left join formula.thermal_fan_material tfm on tfm.material_name = tmptf.material_diff
left join formula.thermal_fan_fan_material tffm on tffm.material_id = tfm.id and tffm.fan_id = tf.id,
formula.schedule_date sd where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'thermal_module') on conflict do nothing;

-- add thermal_fan_fan_material price 0
insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select tffm.id , '0', 'number', 'thermal_fan_fan_material', sd.id
from formula.tmp_thermal_fan tmptf
left join formula.thermal_fan tf on tf.fan_size = tmptf.fan_size
left join formula.thermal_fan_material tfm on tfm.material_name = 'PBT'
left join formula.thermal_fan_fan_material tffm on tffm.material_id = tfm.id and tffm.fan_id = tf.id,
formula.schedule_date sd where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'thermal_module') on conflict do nothing;

-- add thermal_fan_fan_magnet
insert into formula.thermal_fan_fan_magnet (fan_id, magnet_id)
select tf.id, tfm.id 
from formula.tmp_thermal_fan tmptf
left join formula.thermal_fan tf on tf.fan_size = tmptf.fan_size,
formula.thermal_fan_magnet tfm on conflict do nothing;

-- add thermal_fan_fan_magnet price
insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select tffm.id , tmptf.magnet_diff_price, 'number', 'thermal_fan_fan_magnet', sd.id
from formula.tmp_thermal_fan tmptf
left join formula.thermal_fan tf on tf.fan_size = tmptf.fan_size
left join formula.thermal_fan_magnet tfm on tfm.magnet_name = tmptf.magnet_diff
left join formula.thermal_fan_fan_magnet tffm on tffm.magnet_id = tfm.id and tffm.fan_id = tf.id,
formula.schedule_date sd where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'thermal_module') on conflict do nothing;

-- add thermal_fan_fan_magnet price 0
insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select tffm.id , '0', 'number', 'thermal_fan_fan_magnet', sd.id
from formula.tmp_thermal_fan tmptf
left join formula.thermal_fan tf on tf.fan_size = tmptf.fan_size
left join formula.thermal_fan_magnet tfm on tfm.magnet_name = '橡膠'
left join formula.thermal_fan_fan_magnet tffm on tffm.magnet_id = tfm.id and tffm.fan_id = tf.id,
formula.schedule_date sd where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'thermal_module') on conflict do nothing;

-- add thermal_fan_fan_motor
insert into formula.thermal_fan_fan_motor (fan_id, motor_id)
select tf.id, tfm.id 
from formula.tmp_thermal_fan tmptf
left join formula.thermal_fan tf on tf.fan_size = tmptf.fan_size,
formula.thermal_fan_motor tfm on conflict do nothing;

-- add thermal_fan_fan_motor price
insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select tffm.id , tmptf.motor_diff_price, 'number', 'thermal_fan_fan_motor', sd.id
from formula.tmp_thermal_fan tmptf
left join formula.thermal_fan tf on tf.fan_size = tmptf.fan_size
left join formula.thermal_fan_motor tfm on tfm.motor_name = tmptf.motor_diff
left join formula.thermal_fan_fan_motor tffm on tffm.motor_id = tfm.id and tffm.fan_id = tf.id,
formula.schedule_date sd where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'thermal_module') on conflict do nothing;

-- add thermal_fan_fan_motor price 0
insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select tffm.id , '0', 'number', 'thermal_fan_fan_motor', sd.id
from formula.tmp_thermal_fan tmptf
left join formula.thermal_fan tf on tf.fan_size = tmptf.fan_size
left join formula.thermal_fan_motor tfm on tfm.motor_name = '單相'
left join formula.thermal_fan_fan_motor tffm on tffm.motor_id = tfm.id and tffm.fan_id = tf.id,
formula.schedule_date sd where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'thermal_module') on conflict do nothing;

DROP TABLE IF EXISTS formula.tmp_thermal_fan;