-- loss rate
ALTER TABLE formula.thermal_fan ADD column if not exists loss_rate uuid NOT null default uuid_generate_v1();

CREATE TABLE formula.tmp_thermal_fan (
   fan_size VARCHAR (200),
   loss_rate VARCHAR (200)
);


insert into formula.tmp_thermal_fan (fan_size, loss_rate) values
('60x60x3.0', '0.03'),
('60x60x3.5', '0.03'),
('60x60x4.0', '0.03'),
('60x60x4.5', '0.015'),
('60x60x5.0', '0.015'),
('60x60x5.5', '0.015'),
('60x60x6.0', '0.015'),
('60x60x6.5', '0.015'),
('60x60x7.0', '0.015'),
('60x60x7.5', '0.015'),
('80x80x8.0', '0.015'),
('80x80x8.5', '0.015'),
('80x80x9.0', '0.015'),
('80x80x9.5', '0.015'),
('80x80x10',  '0.015'),
('80x80x10.5','0.015'),
('80x80x11',  '0.015'),
('80x80x11.5','0.015'),
('80x80x12',  '0.015');

insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select tf.loss_rate, tmptf.loss_rate, 'number', 'thermal_fan', sd.id
from formula.tmp_thermal_fan tmptf
left join formula.thermal_fan tf on tf.fan_size = tmptf.fan_size,
formula.schedule_date sd where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'thermal_module') on conflict do nothing; 

DROP TABLE IF EXISTS formula.tmp_thermal_fan;

-- vendor_location
CREATE TABLE IF NOT EXISTS formula.thermal_fan_vendor_locate (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	locate varchar(200) NOT NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT thermal_fan_vendor_locate_pk PRIMARY KEY (id),
	CONSTRAINT thermal_fan_vendor_locate_un UNIQUE (locate)
);

insert into formula.thermal_fan_vendor_locate (locate) values
('台廠'),
('陸廠');

drop view if exists formula.v_thermal_fan_vendor_locate;
CREATE OR REPLACE VIEW formula.v_thermal_fan_vendor_locate as
select tfvl.id, tfvl.locate, tfvl.disable_time from formula.thermal_fan_vendor_locate tfvl;

--partlist config modify thermal fan
insert into wiprocurement.bom_partlist_format (format_key, format_value, hasui) values
('thermal-fan', 'thermal-fan', true) on conflict do nothing;

update wiprocurement.bom_partlist_config pc
set format = pf.id
from wiprocurement.bom_partlist_format pf
where pf.format_key = 'thermal-fan'
and pc.parts_ctgy_1 = (select id from formula.part_category_1 p1 where p1.category_name = 'Thermal')
and pc.parts_ctgy_2 = (select id from formula.part_category_2 p2 where p2.category_name = 'Fan');

--add thermal process fee
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'thermal_module')), 'thermal_module_processing', '', 'mask_spray_unit_price', 'USD', '遮噴單價', '加工_遮噴單價', (select id from formula.product_type where type_name = 'NB')),
((SELECT id FROM formula.formula_type WHERE (name= 'thermal_module')), 'thermal_module_processing', '', 'laser_marking_cost', 'USD', '鐳雕費', '加工_鐳雕費', (select id from formula.product_type where type_name = 'NB')),
((SELECT id FROM formula.formula_type WHERE (name= 'thermal_module')), 'thermal_module_processing', '', 'laser_marking_unit_price', 'USD', '鐳雕單價', '加工_鐳雕單價', (select id from formula.product_type where type_name = 'NB')),
((SELECT id FROM formula.formula_type WHERE (name= 'thermal_module')), 'thermal_module_processing', '', 'laser_marking_area', 'mm2', '鐳雕單位面積', '加工_鐳雕單位面積', (select id from formula.product_type where type_name = 'NB'));

-- 遮噴單價
insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select cp.id, '0.035', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'thermal_module')
and cp.part_type = 'thermal_module_processing'
and cp.label = 'mask_spray_unit_price' on conflict do nothing ;

-- 鐳雕費
insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select cp.id, '0.01', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'thermal_module')
and cp.part_type = 'thermal_module_processing'
and cp.label = 'laser_marking_cost' on conflict do nothing ;

-- 鐳雕單價
insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select cp.id, '0.005', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'thermal_module')
and cp.part_type = 'thermal_module_processing'
and cp.label = 'laser_marking_unit_price' on conflict do nothing ;

-- 鐳雕單位面積
insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select cp.id, '200', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'thermal_module')
and cp.part_type = 'thermal_module_processing'
and cp.label = 'laser_marking_area' on conflict do nothing ;

-- 噴漆單價(改名)
update formula.common_parameter 
set label_name = '噴漆單價',
system_remark  = '加工_噴漆單價_原塗黑',
unit = 'USD'
where part_type = 'thermal_module_processing'
and "label" = 'paint_with_black_cost';

